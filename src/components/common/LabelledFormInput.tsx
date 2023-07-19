import { FormatInputProps, LabelledFormatInputProps } from "@/types";

export default function LabelledFormInput({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  error = false,
  className,
  inputClassName,
  labelClassName,
  min = 0,
}: LabelledFormatInputProps) {
  return (
    <div className={`flex mt-5 p-1 items-center ${className ? className : ""}`}>
      <p className={`${labelClassName ? labelClassName : ""}`}>{label}:</p>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`rounded-md border-2 hover:border-[#6ca0f5] block ml-2 w-[350px] p-1
        ${error ? "border-red-500" : ""} 
        ${inputClassName ? inputClassName : ""}`}
        min={min}
      />
    </div>
  );
}
