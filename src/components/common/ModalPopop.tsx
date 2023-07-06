import { ModalPopupInputProps } from "@/types";

export default function ModalPopup({
  open,
  onClose,
  headerText,
  content,
}: ModalPopupInputProps) {
  return (
    <>
      { open && <div className="absolute w-full h-[100vh] top-0 bg-[#414040] z-2 opacity-30"></div> }
      <dialog
        open={open}
        className="absolute rounded-md bg-[#ebf2fb] w-[500px] h-[240px] shadow-md top-[350px] z-10"
      >
        <div className="flex flex-row justify-between">
          <h1 className="font-bold">{headerText}</h1>
          <button onClick={onClose} className="font-bold">
            X
          </button>
        </div>
        <div>{content}</div>
      </dialog>
    </>
  );
}
