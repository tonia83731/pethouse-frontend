"use client";
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
import { useState } from "react";
import dayjs from "dayjs";
import ApplyFormModal from "../modal/ApplyFormModal";
import { useModalStore } from "@/store/useModalStore";
const VOLUNTEERTABLEHEADER = [
  ["basic-info", "Org. Information"],
  ["date", "Date"],
  ["min_hr", "Min. Working (hrs)"],
  ["people_num", "Require People"],
  ["note", "Note"],
  ["btn", ""],
];
const FindVolunteerTable = ({ tableData }: { tableData: any }) => {
  const { isModalToggle, setIsModalToggle } = useModalStore();
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const columnHelper = createColumnHelper<any>();
  const columns = VOLUNTEERTABLEHEADER.map((title) =>
    columnHelper.accessor(title[0], {
      header: () => (
        <span className="text-base md:text-lg font-bold">{title[1]}</span>
      ),
      cell: (info: any) => {
        if (title[0] === "basic-info") {
          const { name, address } = info.row.original.basic_info;
          return (
            <div className="">
              <div className="text-base font-bold">{name}</div>
              <div className="text-xs">{address}</div>
            </div>
          );
        } else if (title[0] === "btn") {
          return (
            <div className="flex flex-col gap-2">
              <button className="bg-taro text-dark rounded-md drop-shadow-md px-2 py-1">
                Edit
              </button>
              <button className="bg-skin text-dark rounded-md drop-shadow-md px-2 py-1">
                Applications
              </button>
            </div>
          );
        } else if (title[0] === "date") {
          const { date, start_time, end_time } = info.row.original.date;
          const format_date = dayjs(date).format("YYYY-MM-DD");
          const start_time_format = dayjs(start_time).format("HH:mm");
          const end_time_format = dayjs(end_time).format("HH:mm");

          return (
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="">{format_date}</div>
              <div className="">
                {start_time_format} ~ {end_time_format}
              </div>
            </div>
          );
        } else {
          return <span className="text-center">{info.getValue()}</span>;
        }
      },
    })
  );
  const table = useReactTable({
    data: tableData,
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
    <>
      <table className="w-full border-spacing-0 rounded-xl overflow-hidden bg-white shadow-default block">
        <thead className="rounded-md md:text-lg font-bold bg-milk-tea text-dark w-full inline-block ">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr
                key={`MULTI-${headerGroup.id}`}
                className={`rounded-md w-full grid grid-cols-3 md:grid-cols-10 items-center`}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      key={header.id}
                      className={`cursor-pointer font-medium text-[14px] py-[13px] ${
                        index === 0
                          ? "hidden md:block md:col-span-3"
                          : index === 2
                          ? "hidden md:block md:col-span-1"
                          : index === 4
                          ? "hidden md:block md:col-span-3"
                          : "col-span-1"
                      }
                      `}
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
        <tbody className=" max-h-[550px] custom-scroll overflow-y-auto overflow-x-hidden w-full scroll relative inline-block">
          <>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={`border-b border-wine border-dotted last:border-none py-[20px] grid grid-cols-3 md:grid-cols-10`}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <td
                        key={cell.id}
                        className={`font-medium text-[14px] py-[13px] px-2 ${
                          index === 0
                            ? "hidden md:block md:col-span-3"
                            : index === 2
                            ? "hidden md:block md:col-span-1 text-center"
                            : index === 4
                            ? "hidden md:block md:col-span-3"
                            : "col-span-1 text-center"
                        }
                      `}
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
          </>
        </tbody>
      </table>
      {isModalToggle && <ApplyFormModal />}
    </>
  );
};

export default FindVolunteerTable;
