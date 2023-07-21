"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import { COOKIE_KEY } from "@/utils/constants";
import Loader from "@/components/common/Loader";
import TransactionsList from "@/components/transactions/TransactionsList";
import { TransacationsNonSSRProps, TransactionClient } from "@/types";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import TransactionCreationModal from "@/components/transactions/TransactionCreationModal";
import TransactionEditModal from "@/components/transactions/TransactionEditModal";

export default function TransactionsNonSSR({
  expenseGroupId,
}: TransacationsNonSSRProps) {

  const fetcher = () =>
    fetch(`/api/transactions/getByExpenseGroup/${expenseGroupId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie(COOKIE_KEY)}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          return data.transactions;
        } else {
          throw new Error("Error while fetching transactions");
        }
      });

  const {
    data: transactions,
    isLoading: isFetchingTransaction,
    mutate,
  } = useSWR(`/api/transactions/getByExpenseGroup/${expenseGroupId}`, fetcher, {
    revalidateOnFocus: false,
  });

  const [deleteTransactionId, setDeleteTransactionId] = useState<string>("");

  const [editTransactionId, setEditTransactionId] = useState("");

  const transactionToEdit = useMemo(() => {
    if (editTransactionId && transactions?.length) {
      return transactions.find(
        (transaction: TransactionClient) =>
          transaction._id === editTransactionId
      );
    } else {
      return undefined;
    }
  }, [editTransactionId, transactions]);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleAddTransactionClick = () => {
    // open transaction creation modal popup
    setOpenCreateModal(true);
  };

  const handleEditTransactionClick = (transactionId: string) => {
    setEditTransactionId(transactionId);
  };

  const handleDeleteTransactionBtnClick = (transactionId: string) => {
    setDeleteTransactionId(transactionId);
  };

  const handleTransactionDelete = async (transactionId: string) => {
    const deleteResp = await deleteTransaction(transactionId);

    if (deleteResp.success) {
      setDeleteTransactionId("");

      let updatedTransactions = transactions.filter(
        (transaction: TransactionClient) => transaction._id !== transactionId
      );

      mutate(updatedTransactions);
    }
  };

  const deleteTransaction = async (transactionId: string) => {
    setIsLoading(true);

    try {
      const resp = await fetch(`/api/transactions/${transactionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getCookie(COOKIE_KEY)}`,
        },
      });

      const respData = await resp.json();
      return respData;
    } catch (error) {
      console.log("Error while deleting transaction ", error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const renderTransactionsList = () => {
    if (isFetchingTransaction) {
      return "Loading expense transactions...";
    } else {
      if (transactions.length) {
        return (
          <TransactionsList
            transactions={transactions}
            onEdit={handleEditTransactionClick}
            onDelete={handleDeleteTransactionBtnClick}
          />
        );
      } else {
        return <div className="text-center">No transactions are added yet</div>;
      }
    }
  };

  const handleTransactionCreation = (newTransaction: TransactionClient) => {
    const updatedTransactions = [...transactions, newTransaction];
    mutate(updatedTransactions);
    setOpenCreateModal(false);
  };

  const handleTransactionEdit = (updatedTransaction: TransactionClient) => {

    const updatedTransactionIndex = transactions.findIndex(
      (transaction: TransactionClient) =>
        transaction._id === updatedTransaction._id
    );

    const updatedTransactionsList = [ ...transactions ];

    updatedTransactionsList[updatedTransactionIndex] = { ...updatedTransaction };

    mutate(updatedTransactionsList);

    setEditTransactionId("");
  };

  return (
    <>
      {(isFetchingTransaction || isLoading) && <Loader text="Loading..." />}
      <div className="ml-10">
        <div className="flex flex-row gap-10 p-5 items-center">
          <button
            className="rounded-full bg-[#99d5ec] p-1 w-60 hover:bg-[#67c8ee]"
            onClick={handleAddTransactionClick}
          >
            + Add Transaction
          </button>
        </div>

        {renderTransactionsList()}
      </div>
      <DeleteConfirmationModal
        open={!!deleteTransactionId}
        onClose={() => setDeleteTransactionId("")}
        onDeleteClick={() => handleTransactionDelete(deleteTransactionId)}
      />
      <TransactionCreationModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onCreate={handleTransactionCreation}
        expenseGroupId={expenseGroupId}
      />
      <TransactionEditModal
        open={!!transactionToEdit}
        onClose={() => setEditTransactionId("")}
        onEdit={handleTransactionEdit}
        transaction={transactionToEdit}
      />
    </>
  );
}
