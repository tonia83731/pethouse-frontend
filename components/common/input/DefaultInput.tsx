/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

export interface DefaultInputProps {
  label?: string;
  type?: string;
  id: string;
  name: string;
  placeholder?: string;
  inputValue: any;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DefaultInput = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  inputValue,
  onInputChange,
}: DefaultInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
        value={inputValue}
        onChange={onInputChange}
      />
    </div>
  );
};

export default DefaultInput;
