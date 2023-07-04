"use client";

import { useEffect, useState } from "react";
import ExpenseGroupCard from "@/components/ExpenseGroupCard";
import { getCookie } from "cookies-next";
import { COOKIE_KEY } from "@/utils/constants";
import { ExpenseGroupClient } from "@/types";
import useSWR from "swr";
import useUserData from "@/hooks/useUserData";
import ExportModalCreationModal from "@/components/ExpenseGroupCreationModal";

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
  const [displayExpenseGroups, setDisplayExpenseGroups] = useState<
    ExpenseGroupClient[]
  >([]);

  const { userData } = useUserData();

  const [openCreationModal, setOpenCreationModal] = useState<boolean>(false);

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
    setOpenCreationModal(true);
  };

  const handleExpenseGroupCreation = (createdExpenseGroup: any) => {
    let updatedExpenseGroupList = [...expenseGroups, createdExpenseGroup];
    mutate(updatedExpenseGroupList);
    setOpenCreationModal(false);
  };

  return (
    <>
      <div className="ml-10">
        <div className="flex flex-row gap-10 p-5 items-center">
          <button
            className="rounded-full bg-[#99d5ec] p-1 w-24 hover:bg-[#67c8ee]"
            onClick={handleAddExpenseGroup}
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
                onEdit={() => handleExpenseGroupEdit(expenseGroup._id)}
                onDelete={() => handleExpenseGroupDelete(expenseGroup._id)}
                disableEdit={expenseGroup.admin !== userData.userId}
                disableDelete={expenseGroup.admin !== userData.userId}
              />
            ))}
          </div>
        )}
      </div>
      <ExportModalCreationModal
        open={openCreationModal}
        onClose={() => setOpenCreationModal(false)}
        onCreate={handleExpenseGroupCreation}
      />
    </>
  );
}
