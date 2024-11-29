interface DefaultTrueFalseProps {
  title: string;
  name: string;
  inputValue: boolean;
  onRadioChange: (name: string, option: boolean) => void;
}

const DefaultTrueFalse = ({
  title,
  name,
  inputValue,
  onRadioChange,
}: DefaultTrueFalseProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium">{title}</div>

      <div className="grid grid-cols-2 border border-dark-40 rounded-lg">
        <div
          className={`h-10 leading-10 border-dark-40 text-center cursor-pointer border-r ${
            inputValue && "bg-heart text-white rounded-l-lg"
          }`}
        >
          <label htmlFor="true" className="cursor-pointer">
            是
          </label>
          <input
            id="true"
            name={name}
            type="radio"
            className="hidden"
            onChange={() => onRadioChange(name, true)}
            checked={inputValue}
          />
        </div>
        <div
          className={`h-10 leading-10 border-dark-40 text-center cursor-pointer ${
            !inputValue && "bg-heart text-white rounded-r-lg"
          }`}
        >
          <label htmlFor="false" className="cursor-pointer">
            否
          </label>
          <input
            id="false"
            name={name}
            type="radio"
            className="hidden"
            onChange={() => onRadioChange(name, false)}
            checked={!inputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultTrueFalse;
