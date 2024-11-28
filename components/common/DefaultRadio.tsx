interface DefaultRadioProps {
  title: string;
  options: {
    label: string;
    value: string | null;
  }[];
  name: string;
  inputValue: string | null;
  onRadioChange: (option: string | null) => void;
}

const DefaultRadio = ({
  title,
  options,
  name,
  inputValue,
  onRadioChange,
}: DefaultRadioProps) => {
  const options_length = options.length;

  // Dynamically create grid column class name
  //   const gridColsClass = `grid-cols-${
  //     options_length <= 12 ? options_length : 12
  //   }`;

  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium">{title}</div>

      <div
        className={`grid ${
          options_length === 2
            ? "grid-cols-2"
            : options_length === 3
            ? "grid-cols-3"
            : options_length === 4
            ? "grid-cols-4"
            : "grid-cols-1"
        } border border-dark-40`}
      >
        {options.map(({ label, value }, index: number) => {
          return (
            <div
              className={`border-dark-40 text-center cursor-pointer ${
                index < options_length - 1 && "border-r"
              } ${inputValue === value && "bg-heart text-white"}`}
              key={value}
            >
              <label htmlFor={label} className="cursor-pointer">
                {label}
              </label>
              <input
                type="radio"
                id={label}
                name={name}
                className="hidden"
                checked={inputValue === value}
                onChange={() => onRadioChange(value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DefaultRadio;
