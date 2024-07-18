"use client";
import Select from "react-select";
import { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { twcitydata } from "@/data/twcityoptions";
import { typedata } from "@/data/animaltypeOptions";
import { filterSelectStyles } from "@/styles/filterSelectStyles";
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
          styles={filterSelectStyles}
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
          styles={filterSelectStyles}
        />
      </div>
      <div className="col-start-3 w-full h-[38px] relative">
        <input
          type="text"
          className="rounded-full w-full h-full px-4 bg-skin placeholder:text-milk-tea placeholder:text-sm focus:border focus:border-wine hover:border hover:border-wine"
          placeholder="請輸入動物的流水編號或收容編號"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-wine hover:drop-shadow-md">
          <FaMagnifyingGlass />
        </button>
      </div>
    </div>
  );
};
export default AnimalFilter;
