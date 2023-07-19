import { LabelledDropdownProps } from "@/types";

export default function LabelledDropdown({
  id,
  label,
  options,
  value,
  onChange,
  error = false,
  className,
  inputClassName,
}: LabelledDropdownProps) {
  return (
    <div className={`flex mt-5 p-1 items-center ${className ? className : ""}`}>

      <p>{label}:</p>

      <select
        onChange={(event) => onChange(event.target.value)}
        value={value}
        className={`rounded-md border-2 p-1 bg-white ml-2 
            ${inputClassName ? inputClassName : ""}
            ${error ? "border-red-500" : ""}`}
      >
        {[ { value: "", text: "" }, ...options].map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      
    </div>
  );
}
