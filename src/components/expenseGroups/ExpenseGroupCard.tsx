"use client";

import { useMemo } from "react";
import { ExpenseGroupCardProps } from "@/types";
import { truncateText } from "@/utils/clientUtils";

export default function ExpenseGroupCard({
  expenseGroup,
  onSelect,
  onEdit,
  onDelete,
  disableEdit,
  disableDelete,
}: ExpenseGroupCardProps) {

  const totalAmountTextStyle = useMemo(() => {
    let totalAmountTextStyle = "";
    if (expenseGroup.totalTransactionAmount !== undefined) {
      totalAmountTextStyle =
        expenseGroup.totalTransactionAmount < 0
          ? "text-red-500"
          : "text-green-500";
    }
    return totalAmountTextStyle;
  }, [expenseGroup]);

  return (
    <div className="w-72">
      <div
        className="max-w-sm rounded-t overflow-hidden drop-shadow-md bg-[#e8f1fd] p-5 cursor-pointer"
        onClick={onSelect}
      >
        <div className="h-[56px] leading-[56px] overflow-hidden">
          <span className="font-bold text-xl align-middle inline-block leading-normal">{truncateText(expenseGroup.name)}</span>
        </div>
        <div className="mt-4">
          Total Expense:
          <span className={`ml-4 ${totalAmountTextStyle}`}>
            {expenseGroup.totalTransactionAmount}
          </span>
        </div>
      </div>
      <div className="flex flex-row">
        <button
          className="basis-1/2 rounded-bl-lg enabled:bg-[#d4e5f9] enabled:hover:bg-[#cfe1f7] h-[35px] font-medium enabled:hover:font-bold disabled:bg-[#e5eef8] disabled:text-gray-400"
          onClick={onEdit}
          disabled={disableEdit}
        >
          Edit
        </button>
        <button
          className="basis-1/2 rounded-br-lg enabled:bg-[#d4d0f9] enabled:hover:bg-[#c8c3f1] h-[35px] font-medium enabled:hover:font-bold disabled:bg-[#eae8fa] disabled:text-gray-400"
          onClick={onDelete}
          disabled={disableDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
