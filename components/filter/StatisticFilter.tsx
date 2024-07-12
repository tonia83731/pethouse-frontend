"use client";
import { useRef } from "react";
import { twcitydata } from "@/data/twcityoptions";
import { months } from "@/data/months";
import { years } from "@/data/years";
import { filterSelectStyles } from "@/styles/filterSelectStyles";
import Select from "react-select";
import dayjs from "dayjs";

const StatisticFilter = () => {
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const cityRef = useRef(null);
  const currYear = dayjs().format("YYYY");
  const currYearData = years.filter((item) => item.label === currYear);
  const currMonth = dayjs().format("MM");
  const currMonthData = months.filter((item) => item.value === currMonth);

  return (
    <div className="lg:grid lg:grid-cols-2 lg:justify-between lg:items-center">
      <div className="grid grid-cols-4 items-center text-center gap-4 w-full h-full">
        <Select
          id="year"
          ref={yearRef}
          options={years}
          defaultValue={currYearData}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          classNamePrefix=""
          styles={filterSelectStyles}
        />
        <Select
          id="month"
          ref={monthRef}
          options={months}
          defaultValue={currMonthData}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          classNamePrefix=""
          styles={filterSelectStyles}
        />
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
        <button className="bg-wine text-white rounded-full px-4 h-full">
          Enter
        </button>
      </div>
    </div>
  );
};

export default StatisticFilter;
