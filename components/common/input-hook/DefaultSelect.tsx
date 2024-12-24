import Select from "react-select";
import { SelectOptionType } from "@/slices/supplySlice";
import { Controller } from "react-hook-form";

interface DefaultHookSelectProps {
  title?: string;
  name: string;
  placeholder?: string;
  inputValue?: SelectOptionType;
  options: SelectOptionType[];
  error?: any;
  control: any;
  onSelectChange?: (value: any) => void;
}

const DefaultHookSelect = ({
  title,
  name,
  options,
  inputValue,
  placeholder,
  error,
  control,
  onSelectChange,
}: DefaultHookSelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <div className="font-medium">{title}</div>}
      <Controller
        name={name}
        control={control}
        defaultValue={inputValue}
        render={({ field }) => (
          <Select
            {...field}
            className="react-select"
            options={options}
            placeholder={placeholder}
            value={inputValue}
            // value={options.find((option) => option.value === field.value)}
            onChange={(newValue) => {
              field.onChange(newValue);
              if (onSelectChange) onSelectChange(newValue);
            }}
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
          />
        )}
      />
      {error && <span className="text-xs text-heart">{error.message}</span>}
    </div>
  );
};

export default DefaultHookSelect;
