export const filterSelectStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    border: "none",
    borderRadius: "45px",
    backgroundColor: "#0B0014",
    padding: "0px",
    ":hover": {
      border: "none",
    },
    ":focus": {
      border: "none",
    },
    outline: "none",
  }),
  singleValue: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: "#FFFFFF",
  }),
  indicatorSeparator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    display: "none",
  }),
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: "#FFFFFF",
  }),
  menu: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: "rgb(255, 255, 255, .75)",
  }),
  option: (styles: any) => ({
    ...styles,
    ":hover": {
      backgroundColor: "#D9D9D9",
      color: "#0B0014",
    },
  }),
};

export const filterSelectMultiStlye = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    border: "none",
    borderRadius: "45px",
    backgroundColor: "#0B0014",
    padding: "0px",
    ":hover": {
      border: "none",
    },
    ":focus": {
      border: "none",
    },
    outline: "none",
  }),
  multiValue: (styles: any) => ({
    ...styles,
    backgroundColor: "#FFFFFF",
    color: "#773344",
    padding: "1px",
    borderRadius: "40px",
    ":hover": {
      backgroundColor: "#D44D5C",
      color: "white",
    },
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    ":hover": {
      backgroundColor: "transparent",
      color: "white",
    },
  }),
  indicatorSeparator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    display: "none",
  }),
  dropdownIndicator: (baseStyles: any, state: any) => ({
    ...baseStyles,
    color: "#FFFFFF",
  }),
  menu: (baseStyles: any, state: any) => ({
    ...baseStyles,
    backgroundColor: "rgb(255, 255, 255, .75)",
  }),
  option: (styles: any) => ({
    ...styles,
    ":hover": {
      backgroundColor: "#D9D9D9",
      color: "#0B0014",
    },
  }),
};
