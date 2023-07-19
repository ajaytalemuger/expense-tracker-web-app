import { useEffect, useMemo, useState } from "react";
import ModalPopup from "../common/ModalPopop";
import {
  TransactionClient,
  TransactionEditModalProps,
} from "@/types";
import {
  COOKIE_KEY,
  CURRENCY_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/utils/constants";
import Button from "../common/Button";
import LabelledFormInput from "../common/LabelledFormInput";
import LabelledDropdown from "../common/LabelledDropdown";
import MultipleInputSelector from "../common/MultipleInputSelector";
import { getCookie } from "cookies-next";
import Loader from "../common/Loader";
import DateTimePicker from "../common/DateTimePicker";

export default function TransactionEditModal({
  open,
  onClose,
  onEdit,
  transaction,
}: TransactionEditModalProps) {

  const [state, setState] = useState<TransactionClient>(transaction);

  useEffect(() => {
    if (transaction) {
        setState(transaction);
    }
  }, [transaction]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onInputChange = (field: any, value: any) => {
    setState((state) => {
      return {
        ...state,
        [field]: value,
      };
    });
  };

  const handleEditClick = async () => {
    const editedTransaction: TransactionClient = {
      ...state,
    };
    const editResp = await editTransaction(editedTransaction);
    if (editResp.success && editResp.updatedTransaction) {
        onEdit(editResp.updatedTransaction);
    }
  };

  const editTransaction = async (transaction: TransactionClient) => {
    try {
      setIsLoading(true);
      const resp = await fetch(`/api/transactions/${transaction._id}`, {
        method: "PUT",
        body: JSON.stringify(transaction),
        headers: {
          Authorization: `Bearer ${getCookie(COOKIE_KEY)}`,
        },
      });

      const respData = await resp.json();
      return respData;
    } catch (error) {
      console.log("Error while creating new transaction", error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const disableBtn = useMemo(() => {
    return !(
      state?.name &&
      state?.description &&
      state?.amount &&
      state?.amount > 0 &&
      state?.type &&
      state?.currency &&
      state?.paymentMode
    );
  }, [state]);

  return (
    <>
      {isLoading && <Loader text="" />}
      <ModalPopup
        open={open}
        onClose={() => onClose()}
        headerText="Create Expense Group"
        className="h-[595px] top-[50%] w-[525px]"
        content={
          <div className="mt-7">
            <form>
              <LabelledFormInput
                type="text"
                label="Name"
                id="name"
                placeholder="Type name"
                value={state?.name}
                onChange={(value: String) => onInputChange("name", value)}
                inputClassName="w-[450px]"
              />

              <LabelledFormInput
                type="text"
                label="Description"
                id="description"
                placeholder="Type description"
                value={state?.description}
                onChange={(value: String) =>
                  onInputChange("description", value)
                }
                inputClassName="w-[450px]"
              />

              <div className="flex">
                <LabelledFormInput
                  type="number"
                  label="Amount"
                  id="amount"
                  placeholder="Amount"
                  value={state?.amount}
                  onChange={(value: number) => onInputChange("amount", value)}
                  inputClassName="w-[80px]"
                />
                <LabelledDropdown
                  label="Currency"
                  id="currency"
                  options={CURRENCY_OPTIONS}
                  value={state?.currency}
                  onChange={(value: String) => onInputChange("currency", value)}
                  inputClassName="w-[65px]"
                  className="ml-1"
                />
                <LabelledDropdown
                  label="Type"
                  id="type"
                  options={TRANSACTION_TYPE_OPTIONS}
                  value={state?.type}
                  onChange={(value: String) => onInputChange("type", value)}
                  inputClassName="w-[98px]"
                  className="ml-1"
                />
              </div>

              <DateTimePicker
                value={state?.date}
                label="Date"
                onChange={(value: string) => onInputChange("date", value)}
              />

              <LabelledFormInput
                type="text"
                label="Payment Mode"
                id="paymentMode"
                placeholder=""
                value={state?.paymentMode}
                onChange={(value: String) =>
                  onInputChange("paymentMode", value)
                }
                inputClassName="w-[150px]"
              />

              <MultipleInputSelector
                values={state?.categories || []}
                label="Categories"
                addNewValuePopupText="Add new Category"
                value={state?.categories || []}
                onChange={(value: String) => onInputChange("categories", value)}
                inputClassName="w-[300px]"
              />

              <Button
                className="mb-5 mt-4 float-right"
                onClick={(event: any) => {
                  event.preventDefault();
                  handleEditClick();
                }}
                disabled={disableBtn}
              >
                Edit
              </Button>
            </form>
          </div>
        }
      />
    </>
  );
}
