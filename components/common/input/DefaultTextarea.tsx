/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

interface DefaultTextareaProps {
  label?: string;
  id: string;
  name: string;
  placeholder?: string;
  inputValue: any;
  onInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const DefaultTextarea = ({
  label,
  id,
  name,
  placeholder,
  inputValue,
  onInputChange,
}: DefaultTextareaProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={id}
        placeholder={placeholder}
        className="w-full h-20 leading-10 p-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-xs placeholder:text-dark-40"
        onChange={onInputChange}
        rows={2}
        cols={50}
      >
        {inputValue}
      </textarea>
    </div>
  );
};

export default DefaultTextarea;
