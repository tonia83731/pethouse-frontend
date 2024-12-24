import { DefaultHookProps } from "./DefaultInput";

const DefaultHookTextarea = ({
  id,
  name,
  label,
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
      <textarea
        id={id}
        placeholder={placeholder}
        rows={2}
        cols={50}
        {...register(name, rules)}
        className="w-full h-20 leading-10 p-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-xs placeholder:text-dark-40"
      />
      {error && <span className="text-xs text-heart">{error.message}</span>}
    </div>
  );
};

export default DefaultHookTextarea;
