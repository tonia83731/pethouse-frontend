interface DefaultTextareaProps {
  label?: string;
  id: string;
  name: string;
  placeholder?: string;
  inputValue: any;
  onInputChange: (name: string, value: any) => void;
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
        className="w-full leading-10 px-4 py-1 rounded-lg border-0 bg-skin-60 text-wine placeholder:py-1 placeholder:text-xs placeholder:text-dark-40"
        onChange={(e) => {
          const { name, value } = e.target;
          onInputChange(name, value);
        }}
        rows={2}
        cols={50}
      >
        {inputValue}
      </textarea>
    </div>
  );
};

export default DefaultTextarea;
