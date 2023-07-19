import { DateTimePickerProps } from "@/types";
import ReactDateTimePicker from 'react-datetime-picker';
import { Value as DateTimePickerValue } from "react-datetime-picker/dist/cjs/shared/types";

export default function DateTimePicker({
  value,
  label,
  onChange,
  className,
  labelClassName,
}: DateTimePickerProps) {


    const handleDateTimeChange = (value: DateTimePickerValue) => {
        if (value) {
            onChange(value.toISOString());
        }
    };

  return (
    <div className={`flex mt-5 p-1 items-center ${className ? className : ""}`}>
        <p className={`${labelClassName ? labelClassName : ""}`}>{label}:</p>
        <ReactDateTimePicker 
            className="ml-[10px] bg-white" 
            value={value}
            onChange={handleDateTimeChange}
            disableClock={true}
        />
    </div>
  );
}
