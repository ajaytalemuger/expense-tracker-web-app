"use client";

import { useEffect, useMemo, useState } from "react";
import ExpenseGroupCard from "@/components/expenseGroups/ExpenseGroupCard";
import { getCookie } from "cookies-next";
import { COOKIE_KEY } from "@/utils/constants";
import { ExpenseGroupClient } from "@/types";
import useSWR from "swr";
import useUserData from "@/hooks/useUserData";
import ExpenseGroupCreationModal from "@/components/expenseGroups/ExpenseGroupCreationModal";
import Loader from "@/components/common/Loader";
import ExpenseGroupEditModal from "@/components/expenseGroups/ExpenseGroupEditModal";

export default function DashboardPage() {

  const fetcher = () =>
    fetch("/api/expenseGroups", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie(COOKIE_KEY)}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          return data.expenseGroups;
        } else {
          throw new Error("Error while fetching expense groups");
        }
      });

  const { data: expenseGroups, isLoading, mutate } = useSWR(
    "/api/expenseGroups",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // used in searchbar
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // expense groups to display, will be updated based on searchKeywords
  const [displayExpenseGroups, setDisplayExpenseGroups] = useState<ExpenseGroupClient[]>([]);

  const { userData } = useUserData();

  const [openCreationModal, setOpenCreationModal] = useState<boolean>(false);

  const [expenseGroupToEdit, setExpenseGroupToEdit] = useState<string>();

  // update display expense groups based on search keyword
  useEffect(() => {
    let displayExpenseGroups = expenseGroups || [];
    if (searchKeyword.trim() && expenseGroups.length) {
      displayExpenseGroups = expenseGroups.filter((expenseGroup: any) =>
        expenseGroup.name.includes(searchKeyword.trim())
      );
    }
    setDisplayExpenseGroups(displayExpenseGroups);
  }, [searchKeyword, expenseGroups]);

  const handleExpenseGroupClick = (id: string) => {
    // redirect to expense group page
  };

  const handleExpenseGroupDelete = (id: String) => {
    // open delete confirmation modal
  };

  const handleAddExpenseGroupClick = () => {
    setOpenCreationModal(true);
  };

  const handleEditExpenseGroupClick = (expenseGroupId: string) => {
    setExpenseGroupToEdit(expenseGroupId);
  };

  const handleExpenseGroupCreation = (createdExpenseGroup: ExpenseGroupClient) => {
    let updatedExpenseGroupList = [...expenseGroups, createdExpenseGroup];
    mutate(updatedExpenseGroupList);
    setOpenCreationModal(false);
  };

  const handleExpenseGroupEdit = (updatedExpenseGroup: ExpenseGroupClient) => {
    let expenseGroupIndex = expenseGroups.findIndex((expenseGroup: ExpenseGroupClient) => expenseGroup._id === updatedExpenseGroup._id);

    if (expenseGroupIndex !== -1) {
      expenseGroups[expenseGroupIndex] = { ...updatedExpenseGroup }
      mutate(expenseGroups);
      setExpenseGroupToEdit("");
    }
  };

  const expenseGroupUnderEdit = useMemo(() => {
    if (expenseGroups?.length && expenseGroupToEdit)
    {
      return expenseGroups.find((expenseGroup: ExpenseGroupClient) => expenseGroup._id === expenseGroupToEdit);
    }
  }, [expenseGroupToEdit, expenseGroups]);

  return (
    <>
      {isLoading && <Loader text="Loading..."/>}
      <div className="ml-10">
        <div className="flex flex-row gap-10 p-5 items-center">
          <button
            className="rounded-full bg-[#99d5ec] p-1 w-24 hover:bg-[#67c8ee]"
            onClick={handleAddExpenseGroupClick}
          >
            + Add
          </button>

          <input
            className="rounded-md border-2 h-8 p-4"
            placeholder="Search..."
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>

        {isLoading ? (
          "Loading expense groups..."
        ) : (
          <div className="flex flex-wrap flex-row gap-5 p-5">
            {displayExpenseGroups.map((expenseGroup) => (
              <ExpenseGroupCard
                key={expenseGroup._id}
                expenseGroupName={expenseGroup.name}
                onSelect={() => handleExpenseGroupClick(expenseGroup._id)}
                onEdit={() => handleEditExpenseGroupClick(expenseGroup._id)}
                onDelete={() => handleExpenseGroupDelete(expenseGroup._id)}
                disableEdit={expenseGroup.admin !== userData.userId}
                disableDelete={expenseGroup.admin !== userData.userId}
              />
            ))}
          </div>
        )}
      </div>
      <ExpenseGroupCreationModal
        open={openCreationModal}
        onClose={() => setOpenCreationModal(false)}
        onCreate={handleExpenseGroupCreation}
      />
      <ExpenseGroupEditModal
        open={!!expenseGroupUnderEdit}
        onClose={() => setExpenseGroupToEdit("")}
        onEdit={handleExpenseGroupEdit}
        expenseGroup={expenseGroupUnderEdit}
      />
    </>
  );
}
