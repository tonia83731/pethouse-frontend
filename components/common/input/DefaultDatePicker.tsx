import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DefaultInputProps } from "./DefaultInput";
import { useState } from "react";
type DefaultDatePickerProps = {
  id: string;
  label: string;
  extraClass?: string;
};
const DefaultDatePicker = ({
  id,
  label,
  extraClass = "",
}: DefaultDatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <div className={`flex flex-col gap-2 ${extraClass}`}>
      <label htmlFor={id} className="font-bold text-lg md:text-xl">
        {label}
      </label>
      <DatePicker
        closeOnScroll={true}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="w-full h-[45px] md:h-[60px] rounded-md px-4 bg-skin placeholder:text-milk-tea placeholder:text-sm focus:border focus:border-wine hover:border hover:border-wine"
      />
    </div>
  );
};

export default DefaultDatePicker;
