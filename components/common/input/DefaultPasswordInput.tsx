import { DefaultTextareaProps } from "./DefaultTextarea";
import { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
export type DefaultPasswordInputProps = DefaultTextareaProps & {
  type?: string;
};

const DefaultPasswordInput = ({
  id,
  name,
  label,
  inputRef,
  placeholder,
  extraClass = "",
}: DefaultPasswordInputProps) => {
  const [isShowed, setIsShowed] = useState(false);
  return (
    <div className={`flex flex-col gap-2 ${extraClass}`}>
      <label htmlFor={id} className="font-bold text-lg md:text-xl">
        {label}
      </label>
      <div className="h-[45px] md:h-[60px] w-full relative">
        <input
          id={id}
          name={name}
          type={isShowed ? "text" : "password"}
          className="w-full h-full rounded-md px-4 bg-skin placeholder:text-milk-tea placeholder:text-sm focus:border focus:border-wine hover:border hover:border-wine"
          ref={inputRef}
          placeholder={placeholder}
          //   onClick={() => setIsShowed(!isShowed)}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-xl md:text-2xl text-milk-tea"
          onClick={() => setIsShowed(!isShowed)}
        >
          {isShowed ? <VscEye /> : <VscEyeClosed />}
        </button>
      </div>
    </div>
  );
};

export default DefaultPasswordInput;
