import { useState } from "react";
import { MultipleInputSelectorProps } from "@/types";
import Image from "next/image";

export default function MultipleInputSelector({
  values,
  onChange,
  label,
  addNewValuePopupText,
  className,
  labelClassName,
}: MultipleInputSelectorProps) {
  const [newValue, setNewValue] = useState("");

  const handleAddInput = () => {
    let trimmedNewValue = newValue.trim();

    if (!values.includes(trimmedNewValue)) {
      const updatedValues = [...values, trimmedNewValue];
      onChange(updatedValues);
    }

    setNewValue("");
  };

  const handleRemoveItem = (removedValue: string) => {
    const updatedValues = values.filter((value) => value !== removedValue);
    onChange(updatedValues);
  };

  return (
    <div>
      <div
        className={`flex mt-5 p-1 items-center ${className ? className : ""}`}
      >
        <p className={`${labelClassName ? labelClassName : ""}`}>{label}:</p>
        <input
          type="text"
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
          className="rounded-md border-2 hover:border-[#6ca0f5] block ml-2 w-[200px] p-1"
        />
        <button
          disabled={!newValue}
          onClick={(event) => {
            event.preventDefault();
            handleAddInput();
          }}
          className="ml-3"
          title={addNewValuePopupText}
        >
          <Image src="/pngs/plusIcon.png" alt="" width={30} height={30} />
        </button>
      </div>
      <div className="flex bg-white w-full h-[90px] mt-3 rounded-md p-2 flex-wrap overflow-auto">
        {values.map((value) => (
          <Items key={value} itemValue={value} onRemove={handleRemoveItem} />
        ))}
      </div>
    </div>
  );
}

const Items = ({
  itemValue,
  onRemove,
}: {
  itemValue: string;
  onRemove: Function;
}) => {
  return (
    <div className="flex h-[25px] items-center bg-gray-100 p-1 rounded-sm justify-start ml-2 mt-2 hover:bg-gray-300">
      <div className="max-w-[100px] whitespace-nowrap text-ellipsis overflow-hidden">
        {itemValue}
      </div>
      <div className="h-[12px] w-[12px] ml-1">
        <Image
          src="/pngs/crossIcon.png"
          alt=""
          width={100}
          height={100}
          onClick={() => onRemove(itemValue)}
          title="Remove this item"
        />
      </div>
    </div>
  );
};
