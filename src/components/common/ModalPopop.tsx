import { ModalPopupInputProps } from "@/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ModalPopup({
  open,
  onClose,
  headerText,
  content,
  className,
}: ModalPopupInputProps) {
  return (
    <>
      {open && (
        <div className="absolute w-full h-[100vh] top-0 bg-[#414040] z-10 opacity-30"></div>
      )}
      <dialog
        open={open}
        // className={`absolute rounded-md bg-[#ebf2fb] w-[500px] h-[240px] shadow-md top-[50%] z-20 ${className ? className : ""}`}
        className={twMerge("absolute rounded-md bg-[#ebf2fb] w-[500px] h-[240px] shadow-md top-[50%] z-20", className ? className : "")}
      >
        <div className="flex flex-row justify-between">
          <h1 className="font-bold">{headerText}</h1>
          <button onClick={onClose} className="font-bold">
            <Image src="/pngs/crossIcon.png" alt="" width={20} height={20} />
          </button>
        </div>
        <div>{content}</div>
      </dialog>
    </>
  );
}
