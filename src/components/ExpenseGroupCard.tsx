"use client";

import { ExpenseGroupCardProps } from "@/types";

export default function ExpenseGroupCard({
  expenseGroupName,
  onSelect,
  onEdit,
  onDelete,
  disableEdit,
  disableDelete,
}: ExpenseGroupCardProps) {
  return (
    <div className="w-72">
      <div
        className="max-w-sm rounded-t overflow-hidden drop-shadow-md bg-[#e8f1fd] p-5 cursor-pointer"
        onClick={onSelect}
      >
        <div className="font-bold text-xl">{expenseGroupName}</div>
        <div className="mt-4">Total Expense:</div>
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
