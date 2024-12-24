/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
export type OptionType = {
  label: string;
  value: any;
};
interface DefaultSelectProps {
  title?: string;
  name: string;
  placeholder?: string;
  inputValue?: OptionType;
  options: OptionType[];
  onSelectChange?: (name: string, value: any) => void;
}

const DefaultSelect = ({
  title,
  name,
  options,
  inputValue,
  placeholder,
  onSelectChange,
}: DefaultSelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <div className="font-medium">{title}</div>}
      <Select
        className="react-select"
        placeholder={placeholder}
        options={options}
        defaultValue={inputValue && inputValue?.value ? inputValue : null}
        styles={{
          indicatorSeparator: (styles) => ({
            ...styles,
            display: "none",
          }),
          placeholder: (styles) => ({
            ...styles,
            color: "rgb(11, 0, 20, .4)",
            fontSize: "0.75rem",
          }),
          clearIndicator: (styles) => ({
            ...styles,
            display: "none",
          }),
          dropdownIndicator: (styles) => ({
            ...styles,
            color: "#773344",
          }),
          menu: (styles) => ({
            ...styles,
            borderRadius: "0.25rem",
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "rgb(227, 181, 164, .6)",
            color: "#773344",
            height: "2.5rem",
            width: "100%",
            border: "none",
            borderRadius: "0.5rem",
            caretColor: "transparent",
            paddingLeft: "0.25rem",
            paddingRight: "0.25rem",
            boxShadow: "none",
          }),
          option: (styles, state) => ({
            ...styles,
            backgroundColor: state.isSelected ? "#773344" : "white",
            color: state.isSelected ? "white" : "#0b0014",
            "&:hover": {
              backgroundColor: "rgb(227, 181, 164, .6)",
            },
          }),
          singleValue: (styles) => ({
            ...styles,
            color: "#0b0014",
          }),
        }}
        onChange={(newValue, actionMeta) => {
          onSelectChange && onSelectChange(name, newValue);
        }}
      />
    </div>
  );
};

export default DefaultSelect;
