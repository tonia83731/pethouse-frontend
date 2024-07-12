export type DefaultTextareaProps = {
  id: string;
  name: string;
  label: string;
  inputRef: any;
  placeholder: string;
  extraClass?: string;
};
const DefaultTextarea = ({
  id,
  name,
  label,
  inputRef,
  placeholder,
  extraClass = "",
}: DefaultTextareaProps) => {
  return (
    <div className={`flex flex-col gap-2 ${extraClass}`}>
      <label htmlFor={id} className="font-bold text-lg md:text-xl">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className="resize-none w-full rounded-md p-4 bg-skin placeholder:text-milk-tea placeholder:text-sm focus:border focus:border-wine hover:border hover:border-wine"
        ref={inputRef}
        placeholder={placeholder}
        rows={4}
      ></textarea>
    </div>
  );
};
export default DefaultTextarea;
