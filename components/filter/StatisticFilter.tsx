"use client";
import { useEffect, useRef } from "react";
import { months } from "@/data/months";
import { years } from "@/data/years";
import { twcitydataWithCode } from "@/data/twcityoptions";
import { filterSelectStyles } from "@/styles/filterSelectStyles";
import Select from "react-select";
import { useStatisticStore } from "@/store/useStatisticStore";
const StatisticFilter = () => {
  let year_default = years[0];
  let month_default = months[0];
  let country_code_default = twcitydataWithCode[0];
  const yearRef = useRef<any>(year_default);
  const monthRef = useRef<any>(month_default);
  const cityRef = useRef<any>(country_code_default);

  const { statisticData, setStatisticData } = useStatisticStore();
  const handleDataFilter = async () => {
    const rpt_year = yearRef.current?.props.value.value;
    const month = monthRef.current?.props.value.value;
    const rpt_month = +month;
    const rpt_country_code = cityRef.current?.props.value.value;
    let filter = "";
    if (rpt_year) filter += `&rpt_year=${rpt_year}`;
    if (rpt_month) filter += `&rpt_month=${rpt_month}`;
    if (rpt_country_code) filter += `&rpt_country_code=${rpt_country_code}`;
    // console.log(filter);
    try {
      const res = await fetch(
        `https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=p9yPwrCs2OtC${filter}`
      );
      const data = await res.json();
      const length = data?.length;
      setStatisticData(data, length);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDataClear = () => {
    yearRef.current?.setValue(years[0]);
    monthRef.current?.setValue(months[0]);
    cityRef.current?.setValue(twcitydataWithCode[0]);
  };
  useEffect(() => {
    const fetchStatisticData = async () => {
      try {
        const res = await fetch(
          `https://data.moa.gov.tw/Service/OpenData/TransService.aspx?UnitId=p9yPwrCs2OtC`
        );
        const data = await res.json();
        const length = data?.length;
        setStatisticData(data, length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatisticData();
  }, []);
  return (
    <div className="lg:grid lg:grid-cols-2 lg:justify-between lg:items-center">
      <div className="grid grid-cols-5 items-center text-center gap-4 w-full h-full">
        <Select
          id="year"
          ref={yearRef}
          options={years}
          defaultValue={year_default}
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
          defaultValue={month_default}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          classNamePrefix=""
          styles={filterSelectStyles}
        />
        <Select
          id="city"
          ref={cityRef}
          options={twcitydataWithCode}
          defaultValue={country_code_default}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          classNamePrefix=""
          styles={filterSelectStyles}
        />
        <button
          onClick={handleDataFilter}
          className="bg-wine text-white rounded-full px-4 h-full"
        >
          輸入
        </button>
        <button
          onClick={handleDataClear}
          className="bg-dirt text-white rounded-full px-4 h-full"
        >
          清除
        </button>
      </div>
    </div>
  );
};

export default StatisticFilter;
