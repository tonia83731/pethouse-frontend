// import { ChangeEvent, RefObject } from "react";
import { SupplyInputType } from "@/slices/supplySlice";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface DefaultHookProps {
  id: string;
  name: keyof SupplyInputType;
  label?: string;
  type?: string;
  placeholder?: string;
  error: FieldError | undefined;
  register: UseFormRegister<SupplyInputType>;
  rules: any;
}

const DefaultHookInput = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  error,
  register,
  rules,
}: DefaultHookProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        // {...field}
        {...register(name, rules)}
        className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
      />
      {error && <span className="text-xs text-heart">{error.message}</span>}
    </div>
  );
};

export default DefaultHookInput;
