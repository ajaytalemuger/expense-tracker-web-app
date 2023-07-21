import { useEffect, useMemo, useState } from "react";
import { ExpenseGroupState, ExpenseGroupEditModalProps } from "@/types";
import FormInput from "../common/FormInput";
import Button from "../common/Button";
import { getCookie } from "cookies-next";
import { COOKIE_KEY } from "@/utils/constants";
import ModalPopup from "../common/ModalPopop";

export default function ExpenseGroupEditModal({
  open = false,
  onClose,
  onEdit,
  expenseGroup
}: ExpenseGroupEditModalProps) {

  const [state, setState] = useState<ExpenseGroupState>({
    name: "",
    description: "",
    otherUsers: [],
  });

  const expenseGroupId = expenseGroup?._id;

  useEffect(() => {

    let initalState: ExpenseGroupState = {
      name: "",
      description: "",
      otherUsers: []
    };

    if (expenseGroup)
    {
      initalState.name = expenseGroup.name;
      initalState.description = expenseGroup.description;
      initalState.otherUsers = [ ...expenseGroup.otherUsers ];
    }
    
    setState({
      ...initalState
    });
  }, [expenseGroup]);

  const onInputChange = (field: any, value: String) => {
    setState((state) => {
      return {
        ...state,
        [field]: value,
      };
    });
  };

  const handleEditClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let modifiedExpenseGroup = {
      ...state,
    };

    const editResp = await editExpenseGroup(expenseGroupId, modifiedExpenseGroup);

    if (editResp.success && editResp.updatedExpenseGroup) {
        onEdit(editResp.updatedExpenseGroup);
    }
  };

  const editExpenseGroup = async (expenseGroupId: string, expenseGroup: any) => {
    try {
      const resp = await fetch(`/api/expenseGroups/${expenseGroupId}`, {
        method: "PUT",
        body: JSON.stringify(expenseGroup),
        headers: {
          Authorization: `Bearer ${getCookie(COOKIE_KEY)}`,
        },
      });

      const respData = await resp.json();
      return respData;
    } catch (err) {
      console.log("Error while creating expenseGroup ", err);
      return { success: false };
    }
  };

  const disableBtn = useMemo(() => !(state.name && state.description), [state]);

  return (
    <ModalPopup
      open={open}
      onClose={onClose}
      headerText="Edit Expense Group"
      className="mt-[-200px] ml-[-278px]"
      content={
        <div className="mt-7">
          <form>
            <FormInput
              type="text"
              id="name"
              placeholder="Name"
              value={state.name}
              onChange={(value: String) => onInputChange("name", value)}
              className="w-[450px]"
            />

            <FormInput
              type="text"
              id="description"
              placeholder="Description"
              value={state.description}
              onChange={(value: String) => onInputChange("description", value)}
              className="w-[450px]"
            />

            <Button
              className="mb-5 mt-5 mr-5 float-right"
              onClick={handleEditClick}
              disabled={disableBtn}
            >
              Edit
            </Button>
          </form>
        </div>
      }
    />
  );
}
