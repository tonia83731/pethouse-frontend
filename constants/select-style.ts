import { StylesConfig } from "react-select";
export type SelectOptionType = {
  value: string;
  label: string;
};
export const SELECTSTYLES: StylesConfig<SelectOptionType, false> = {
  indicatorSeparator: (styles) => ({
    ...styles,
    display: "none",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "white",
    fontSize: "0.875rem",
  }),
  clearIndicator: (styles) => ({
    ...styles,
    display: "none",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    //   display: "none",
    color: "white",
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: "0.25rem",
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#0b0014",
    color: "white",
    height: "2.5rem",
    width: "100%",
    border: "1px solid #424530",
    borderRadius: "2.5rem",
    caretColor: "transparent",
    paddingLeft: "0.5rem",
    paddingRight: "1rem",
    boxShadow: "none",
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? "rgb(227, 181, 164)" : "white",
    color: "rgb(11, 0, 20, .6)",
    "&:hover": {
      backgroundColor: "rgb(227, 181, 164, .4)",
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
  }),
};
