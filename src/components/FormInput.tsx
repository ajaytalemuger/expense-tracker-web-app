import { FormatInputProps } from "@/types";

export default function FormInput({
  id,
  placeholder,
  type,
  value,
  onChange,
  error = false,
  className,
}: FormatInputProps) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`w-[350px] rounded-md border-2 hover:border-[#6ca0f5] block mt-5 p-1 ${
        error ? "border-red-500" : ""
      } ${className ? className : ""}`}
    />
  );
}
