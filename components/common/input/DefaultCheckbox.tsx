interface DefaultCheckboxProps {
  label: string;
  id: string;
  name: string;
  inputValue: boolean;
  // onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (name: string, value: boolean) => void;
}

const DefaultCheckbox = ({
  label,
  id,
  name,
  inputValue,
  onCheckboxChange,
}: DefaultCheckboxProps) => {
  return (
    <div className="flex gap-4 items-center">
      <input
        id={id}
        name={name}
        type="checkbox"
        className="accent-heart w-4 h-4"
        checked={inputValue}
        onChange={(e) => {
          const { name, checked } = e.target;
          onCheckboxChange(name, checked);
        }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default DefaultCheckbox;
