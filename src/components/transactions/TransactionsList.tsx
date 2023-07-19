"use client";

import { TransactionClient, TransactionListProps } from "@/types";
import { TRANSACTION_TYPES } from "@/utils/constants";
import Image from "next/image";

export default function TransactionsList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  return (
    <div>
      <table className="table-fixed w-[95vw]">
        <thead>
          <tr>
            <th className="border-collapse border border-slate-400 w-[20%] h-10">Name</th>
            <th className="border-collapse border border-slate-400 w-[40%]">Description</th>
            <th className="border-collapse border border-slate-400 w-[10%]">Amount</th>
            <th className="border-collapse border border-slate-400 w-[10%]">Date</th>
            <th className="border-collapse border border-slate-400 w-[10%]">Payment mode</th>
            <th className="w-[10%]"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: TransactionClient) => (
            <tr key={transaction._id}>
              <td className="border-collapse border border-slate-400 h-10 text-center">{transaction.name}</td>
              <td className="border-collapse border border-slate-400 text-center">{transaction.description}</td>
              <td className="border-collapse border border-slate-400 text-center">
                  <span className={`${transaction.type === TRANSACTION_TYPES.CREDITED ? "text-green-500" : "text-red-500"}`}>
                    {`${transaction.type === TRANSACTION_TYPES.CREDITED ? "+" : "-"}  ${transaction.amount}`}
                  </span>
                </td>
              <td className="border-collapse border border-slate-400 text-center">{(new Date(transaction.date)).toDateString()}</td>
              <td className="border-collapse border border-slate-400 text-center">{transaction.paymentMode}</td>
              <td>
                <div>
                    <button onClick={() => onEdit(transaction._id)}>
                        <Image 
                            src="/pngs/editIcon.png"
                            alt="Edit" 
                            width={23}
                            height={23}
                            className="ml-5"
                        />
                    </button>
                    <button onClick={() => onDelete(transaction._id)}>
                    <Image 
                            src="/pngs/deleteIcon.png"
                            alt="Delete" 
                            width={23}
                            height={23}
                            className="ml-5"
                        />
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
