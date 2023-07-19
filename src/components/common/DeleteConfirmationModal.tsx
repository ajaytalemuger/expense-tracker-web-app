import { DeleteConfirmationModalProps } from "@/types";
import ModalPopup from "./ModalPopop";
import Button from "./Button";

export default function DeleteConfirmationModal({
  open,
  onClose,
  onDeleteClick,
}: DeleteConfirmationModalProps) {
  return (
    <ModalPopup
      open={open}
      onClose={onClose}
      headerText="Confirm Delete"
      className="h-[150px] w-[430px]"
      content={
        <div className="mt-7">
          Are you sure you want to delete ?
          <Button
            className="mb-5 mt-8 float-right"
            onClick={onDeleteClick}
          >
            Delete
          </Button>
        </div>
      }
    />
  );
}
