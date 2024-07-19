"use client";
import { useRef, useState } from "react";
import Select from "react-select";
import { MultiValue, ActionMeta } from "react-select";
import dayjs from "dayjs";
import { years } from "@/data/years";
import { months } from "@/data/months";
import { twcitydataWithCode } from "@/data/twcityoptions";
import {
  filterSelectStyles,
  filterSelectMultiStlye,
} from "@/styles/filterSelectStyles";
import { getTableData } from "./TABLEHEADER";
import { tableOptions } from "./TABLEHEADER";
import StatisticInTable from "../table/StatisticInTable";
import StatisticOutTable from "../table/StatisticOutTable";
import StatisticFeedTable from "../table/StatisticFeedTable";
import StatisticStayTable from "../table/StatisticStayTable";
import {
  intablekeys,
  outtablekeys,
  staytablekeys,
  feedtablekeys,
} from "./TABLEHEADER";
export type TableOptions = "in" | "out" | "feed" | "stay";
export type ShowTableType = {
  [key in TableOptions]: boolean;
};
const base_url = process.env.NEXT_PUBLIC_ANIMAL_BASE_URL;
const StatisticTableShow = () => {
  const [showTable, setShowTable] = useState<ShowTableType>({
    in: false,
    out: false,
    feed: false,
    stay: false,
  });
  const [totalPage, setTotalPage] = useState(0);
  const [inTableData, setInTableData] = useState<any>([]);
  const [outTableData, setOutTableData] = useState<any>([]);
  const [stayTableData, setStayTableData] = useState<any>([]);
  const [feedTableData, setFeedTableData] = useState<any>([]);
  const currYear = dayjs().format("YYYY");
  const prevMonth = dayjs().subtract(1, "month").format("MM");
  let year_default = years.filter((item) => item.label === currYear)[0];
  let month_default = months.filter((item) => item.value === prevMonth)[0];
  let country_code_default = twcitydataWithCode[0];
  const yearRef = useRef<any>(year_default);
  const monthRef = useRef<any>(month_default);
  const cityRef = useRef<any>(country_code_default);
  const tableRef = useRef<any>(null);
  const initializedData = () => {
    setInTableData([]);
    setOutTableData([]);
    setFeedTableData([]);
    setStayTableData([]);
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
    initializedData();
  };
  const handleDataFilter = async () => {
    initializedData();
    if (!tableRef.current?.props?.value?.length) {
      alert("請選擇顯示內容");
      return;
    }

    const selectedTableOptions = tableRef.current?.props?.value || [];
    const updatedShowTable: ShowTableType = {
      in: false,
      out: false,
      feed: false,
      stay: false,
    };

    selectedTableOptions.forEach((item: { value: TableOptions }) => {
      updatedShowTable[item.value] = true;
    });

    setShowTable(updatedShowTable);
    const rpt_year = yearRef.current?.props.value.value;
    const month = monthRef.current?.props.value.value;
    const rpt_month = +month;
    const rpt_country_code = cityRef.current?.props.value.value;
    let filter = "";
    if (rpt_year) filter += `&rpt_year=${rpt_year}`;
    if (rpt_month) filter += `&rpt_month=${rpt_month}`;
    if (rpt_country_code) filter += `&rpt_country_code=${rpt_country_code}`;
    try {
      const res = await fetch(`${base_url}?UnitId=p9yPwrCs2OtC${filter}`);
      const data = await res.json();
      const length = Math.ceil(data.length / 20);
      setTotalPage(length);
      const indata = getTableData(data, intablekeys);
      setInTableData(indata);
      const outdata = getTableData(data, outtablekeys);
      setOutTableData(outdata);
      const feeddata = getTableData(data, feedtablekeys);
      setFeedTableData(feeddata);
      const staydata = getTableData(data, staytablekeys);
      setStayTableData(staydata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-8 items-center text-center gap-4 w-full h-full">
        <div className="w-full md:col-span-3 grid grid-cols-3 gap-4">
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
        </div>
        <Select
          id="table"
          ref={tableRef}
          options={tableOptions}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          isMulti={true}
          classNamePrefix=""
          className="col-span-3 w-full"
          styles={filterSelectMultiStlye}
          placeholder="請選擇顯示內容"
        />
        <div className="flex gap-2 col-span-2 w-full h-[45px] md:h-full">
          <button
            onClick={handleDataFilter}
            className="bg-wine text-white rounded-full px-4 md:h-full w-full"
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
      <div className="flex flex-col gap-12">
        {showTable.in && (
          <StatisticInTable bodyData={inTableData} totalPage={totalPage} />
        )}
        {showTable.out && (
          <StatisticOutTable bodyData={outTableData} totalPage={totalPage} />
        )}
        {showTable.feed && (
          <StatisticFeedTable bodyData={feedTableData} totalPage={totalPage} />
        )}
        {showTable.stay && (
          <StatisticStayTable bodyData={stayTableData} totalPage={totalPage} />
        )}
      </div>
    </>
  );
};

export default StatisticTableShow;
