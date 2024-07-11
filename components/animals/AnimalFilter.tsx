"use client";
import Select from "react-select";
import { twcity } from "@/data/twcity";
import { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
const twcitydata = twcity.map(({ name_en }) => {
  return {
    value: name_en,
    label: name_en,
  };
});

twcitydata.unshift({
  label: "All",
  value: "All",
});

const typedata = [
  {
    label: "All",
    value: "All",
  },
  {
    value: "Dogs",
    label: "Dogs",
  },
  {
    value: "Cats",
    label: "Cats",
  },
  {
    value: "Others",
    label: "Others",
  },
];
const AnimalFilter = () => {
  const cityRef = useRef(null);
  const typeRef = useRef(null);
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-0 justify-between items-center">
      <div className="w-full grid grid-cols-2 items-center gap-4">
        <Select
          id="city"
          ref={cityRef}
          options={twcitydata}
          defaultValue={twcitydata[0]}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          classNamePrefix=""
          styles={{
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
          }}
        />
        <Select
          id="type"
          ref={typeRef}
          options={typedata}
          defaultValue={typedata[0]}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          classNamePrefix=""
          styles={{
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
          }}
        />
      </div>
      <div className="col-start-3 w-full h-[38px] relative">
        <input
          type="text"
          className="rounded-full w-full h-full px-4 bg-skin placeholder:text-milk-tea placeholder:text-sm focus:border focus:border-wine hover:border hover:border-wine"
          placeholder="Enter animal code here"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-wine hover:drop-shadow-md">
          <FaMagnifyingGlass />
        </button>
      </div>
    </div>
  );
};
export default AnimalFilter;
