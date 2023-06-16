"use client";

import { useEffect, useState } from "react";
import ExpenseGroupCard from "@/components/ExpenseGroupCard";
import { getCookie } from "cookies-next";
import { COOKIE_KEY } from "@/utils/constants";
import { ExpenseGroupClient } from "@/types";
import useSWR from "swr";
import useUserData from "@/hooks/useUserData";

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

  const { data: expenseGroups, isLoading } = useSWR(
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

  const handleExpenseGroupEdit = (id: string) => {
    // open edit modal
  };

  const handleExpenseGroupDelete = (id: String) => {
    // open delete confirmation modal
  };

  const handleAddExpenseGroup = () => {
    // open expense group creation modal
  };

  return (
    <div className="ml-10">
      <div className="flex flex-row gap-10 p-5 items-center">

        <button className="rounded-full bg-[#87d4f3] p-1 w-24" 
          onClick={handleAddExpenseGroup}>
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
              onEdit={() => handleExpenseGroupEdit(expenseGroup._id)}
              onDelete={() => handleExpenseGroupDelete(expenseGroup._id)}
              disableEdit={expenseGroup.admin !== userData.userId}
              disableDelete={expenseGroup.admin !== userData.userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
