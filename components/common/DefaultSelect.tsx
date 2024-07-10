import Select from "react-select";
type DefaultSelectProps = {
  id: string;
  selectRef: any;
  options: {
    label: string;
    value: string;
  }[];
  label: string;
};
const DefaultSelect = ({
  id,
  selectRef,
  options,
  label,
}: DefaultSelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-bold text-lg md:text-xl">
        {label}
      </label>
      <Select
        id={id}
        ref={selectRef}
        options={options}
        defaultValue={options[0]}
        closeMenuOnSelect={true}
        isClearable={false}
        isSearchable={false}
        classNamePrefix="react-select"
        styles={{
          control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            border: "none",
            backgroundColor: "#F5E9E2",
            padding: "0px",
            ":hover": {
              border: "1px solid #773344",
            },
            ":focus": {
              border: "1px solid #773344",
            },
            outline: "none",
          }),
          singleValue: (baseStyles: any, state: any) => ({
            ...baseStyles,
            color: "#0B0014",
          }),
          indicatorSeparator: (baseStyles: any, state: any) => ({
            ...baseStyles,
            display: "none",
          }),
          dropdownIndicator: (baseStyles: any, state: any) => ({
            ...baseStyles,
            color: "#773344",
          }),
          menu: (baseStyles: any, state: any) => ({
            ...baseStyles,
            backgroundColor: "#F5E9E2",
          }),
          menuList: (baseStyles: any, state: any) => ({
            ...baseStyles,
            "::-webkit-scrollbar": {
              width: "4px",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#A68E74",
              borderRadius: "4px",
            },
            "::-webkit-scrollbar-track": {
              backgroundColor: "rgb(224, 145, 50, .6)",
            },
            // For Firefox
            scrollbarWidth: "thin",
            scrollbarColor: "#A68E74 rgb(224, 145, 50, .6)",
          }),
          option: (styles: any) => ({
            ...styles,
            ":hover": {
              backgroundColor: "#E3B5A4",
            },
          }),
        }}
      />
    </div>
  );
};

export default DefaultSelect;
