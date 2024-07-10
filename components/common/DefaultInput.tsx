type DefaultInputProps = {
  id: string;
  name: string;
  type?: string;
  label: string;
  inputRef: any;
  placeholder: string;
  extraClass?: string;
};

const DefaultInput = ({
  id,
  type = "text",
  name,
  label,
  inputRef,
  placeholder,
  extraClass = "",
}: DefaultInputProps) => {
  return (
    <div className={`flex flex-col gap-2 ${extraClass}`}>
      <label htmlFor={id} className="font-bold text-lg md:text-xl">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="h-[45px] md:h-[60px] rounded-md px-4 bg-skin placeholder:text-milk-tea placeholder:text-sm focus:border focus:border-wine hover:border hover:border-wine"
        ref={inputRef}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DefaultInput;
