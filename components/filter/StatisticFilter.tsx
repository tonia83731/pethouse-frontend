"use client";
import { useEffect, useRef, useState } from "react";
import { months } from "@/data/months";
import { years } from "@/data/years";
import { twcitydataWithCode } from "@/data/twcityoptions";
import {
  filterSelectStyles,
  filterSelectMultiStlye,
} from "@/styles/filterSelectStyles";
import Select from "react-select";
import { useStatisticStore } from "@/store/useStatisticStore";
import dayjs from "dayjs";
import { MultiValue, ActionMeta } from "react-select";
import { TableOptions, ShowTableType } from "@/store/useStatisticStore";
const tableOptions = [
  {
    label: "入所方式",
    value: "in",
  },
  {
    label: "出所方式",
    value: "out",
  },
  {
    label: "在養數",
    value: "feed",
  },
  {
    label: "可收留數",
    value: "stay",
  },
];
const StatisticFilter = () => {
  const [showTable, setShowTable] = useState<ShowTableType>({
    in: false,
    out: false,
    feed: false,
    stay: false,
  });
  const currYear = dayjs().format("YYYY");
  const prevMonth = dayjs().subtract(1, "month").format("MM");
  let year_default = years.filter((item) => item.label === currYear)[0];
  let month_default = months.filter((item) => item.value === prevMonth)[0];
  let country_code_default = twcitydataWithCode[0];
  const yearRef = useRef<any>(year_default);
  const monthRef = useRef<any>(month_default);
  const cityRef = useRef<any>(country_code_default);
  const tableRef = useRef<any>(null);
  const { statisticData, setStatisticData } = useStatisticStore();
  const handleDataFilter = async () => {
    // setStatisticData([], 0, showTable);
    if (!tableRef.current.props.value) {
      alert("請選擇顯示內容");
      return;
    }
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
      setStatisticData(data, length, showTable);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDataClear = () => {
    yearRef.current?.setValue(year_default);
    monthRef.current?.setValue(month_default);
    cityRef.current?.setValue(country_code_default);
    tableRef.current?.clearValue();

    setShowTable({
      in: false,
      out: false,
      feed: false,
      stay: false,
    });
    setStatisticData([], 0, showTable);
  };
  const handleTableChange = (
    newValue: MultiValue<{ label: string; value: string }>,
    actionMeta: ActionMeta<{ label: string; value: string }>
  ) => {
    const updatedShowTable: ShowTableType = {
      in: false,
      out: false,
      feed: false,
      stay: false,
    };
    newValue.forEach((item) => {
      updatedShowTable[item.value as TableOptions] = true;
    });

    setShowTable(updatedShowTable);
  };
  return (
    <div className="w-full">
      <div className="grid grid-cols-8 items-center text-center gap-4 w-full h-full">
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
        <Select
          id="table"
          ref={tableRef}
          options={tableOptions}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          isMulti={true}
          classNamePrefix=""
          className="col-span-3"
          styles={filterSelectMultiStlye}
          placeholder="請選擇顯示內容"
          onChange={handleTableChange}
        />
        <div className="flex gap-2 col-span-2 w-full h-full">
          <button
            onClick={handleDataFilter}
            className="bg-wine text-white rounded-full px-4 h-full w-full"
          >
            輸入
          </button>
          <button
            onClick={handleDataClear}
            className="bg-dirt text-white rounded-full px-4 h-full w-full"
          >
            清除
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatisticFilter;
