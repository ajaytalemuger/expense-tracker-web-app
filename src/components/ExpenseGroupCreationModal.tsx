import { useEffect, useMemo, useState } from "react";
import { ExpenseGroupState, ExportModalCreationModalProps } from "@/types";
import FormInput from "./FormInput";
import Button from "./Button";
import useUserData from "@/hooks/useUserData";
import { getCookie } from "cookies-next";
import { COOKIE_KEY } from "@/utils/constants";
import ModalPopup from "./ModalPopop";

export default function ExportModalCreationModal({
  open = false,
  onClose,
  onCreate,
}: ExportModalCreationModalProps) {
  const [state, setState] = useState<ExpenseGroupState>({
    name: "",
    description: "",
    otherUsers: [],
  });

  const { userData } = useUserData();

  useEffect(() => {
    setState({
      name: "",
      description: "",
      otherUsers: [],
    });
  }, [open]);

  const onInputChange = (field: any, value: String) => {
    setState((state) => {
      return {
        ...state,
        [field]: value,
      };
    });
  };

  const handleCreateClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let newExpenseGroup = {
      ...state,
      admin: userData.userId,
    };

    const creationResp = await createExpenseGroup(newExpenseGroup);

    console.log("creationResp", creationResp);

    if (creationResp.success && creationResp.createdExpenseGroup) {
      onCreate(creationResp.createdExpenseGroup);
    }
  };

  const createExpenseGroup = async (expenseGroup: any) => {
    try {
      const resp = await fetch("/api/expenseGroups", {
        method: "POST",
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
      headerText="Create Expense Group"
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
              onClick={handleCreateClick}
              disabled={disableBtn}
            >
              Create
            </Button>
          </form>
        </div>
      }
    />
  );
}
