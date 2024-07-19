"use client";
import { useStatisticStore } from "@/store/useStatisticStore";
import {
  PaginationState,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
const OUTTABLEHEADER = new Map([
  ["rpt_year", "年度"],
  ["rpt_month", "月份"],
  ["rpt_country", "縣市"],
  ["out_tback_num", "領回"],
  ["out_ad_ca_num", "領養_個人認養"],
  ["out_ad_fa_num", "領養_民間犬場"],
  ["out_ad_cv_num", "領養_動保團體"],
  ["out_hs_3_num", "動保法12-1-3"],
  ["out_hs_5_num", "動保法12-1-5"],
  ["out_hs_7_num", "動保法12-1-7"],
  ["out_hs_ot_num", "其他法令授權"],
  ["out_sd_num", "疾病死亡"],
  ["out_jd_num", "生理耗弱死亡"],
  ["out_rl_num", "釋回原地"],
  ["out_ec_num", "逃脫"],
  ["out_el_num", "其他"],
]);

const StatisticOutTable = ({
  bodyData,
  totalPage,
}: {
  bodyData: any[];
  totalPage: number;
}) => {
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const columnHelper = createColumnHelper<any>();
  const outtablekeys = Array.from(OUTTABLEHEADER.keys());
  const columns = outtablekeys.map((key: string) =>
    columnHelper.accessor(key, {
      header: () => `${OUTTABLEHEADER.get(key)}`,
      cell: (info: any) => <span className="">{info.getValue()}</span>,
    })
  );

  const table = useReactTable({
    data: bodyData,
    columns: columns,
    state: {
      sorting: sourceSorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSourceSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
  });

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-extrabold font-nunito text-3xl">出所方式</h4>
      <table className="">
        <thead className="rounded-md md:text-lg font-bold bg-milk-tea text-dark inline-block w-full">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr
                className="rounded-md grid grid-cols-16 items-center"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      className="cursor-pointer font-medium text-[14px] py-[13px]"
                      key={header.id}
                    >
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody className="max-h-[450px] custom-scroll overflow-y-auto overflow-x-hidden w-full scroll relative inline-block">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className={`border-b border-wine border-dotted last:border-none py-[20px] grid grid-cols-16 w-[calc(100%+12px)]`}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td
                      key={cell.id}
                      className={`font-medium text-[14px] py-[13px] text-center`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Pagination
          onNextClick={() => table.nextPage()}
          onPrevClick={() => table.previousPage()}
          totalPage={totalPage}
          currPage={table.getState().pagination.pageIndex + 1}
        />
      </div>
    </div>
  );
};

export default StatisticOutTable;
