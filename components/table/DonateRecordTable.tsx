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
type DonateRecordTableProps = {
  name: string;
  phone: string;
  email: string;
  amount: number;
  gui: string;
  invoice: boolean;
};
const DONATERECORDTABLE = [
  ["name", "捐款人"],
  ["phone", "電話"],
  ["email", "Email"],
  ["amount", "捐款金額"],
  ["gui", "統一編號"],
  ["invoice", "是否需要發票?"],
  ["btn", ""],
];
const DonateRecordTable = ({ tableData }: { tableData: any }) => {
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const columnHelper = createColumnHelper<any>();
  const columns = DONATERECORDTABLE.map((title) =>
    columnHelper.accessor(title[0], {
      header: () => (
        <span className="text-base md:text-lg font-bold">{title[1]}</span>
      ),
      cell: (info: any) => {
        if (title[0] === "btn") {
          return (
            <button className="bg-taro text-white rounded-md drop-shadow-md px-2 py-1">
              詳細資料
            </button>
          );
        } else if (title[0] === "invoice") {
          const text = info.row.original.invoice ? "Y" : "N";
          return <span className="">{text}</span>;
        } else {
          return <span className="">{info.getValue()}</span>;
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
    <table className="w-full border-spacing-0 rounded-xl overflow-hidden bg-white shadow-default block">
      <thead className="rounded-md md:text-lg font-bold bg-milk-tea text-dark w-full inline-block ">
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr
              key={`MULTI-${headerGroup.id}`}
              className={`rounded-md w-full grid grid-cols-3 md:grid-cols-7 items-center`}
            >
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    key={header.id}
                    className={`cursor-pointer font-medium text-[14px] py-[13px] ${
                      index === 1 || index === 4 || index === 5
                        ? "hidden md:block"
                        : index === 2
                        ? "hidden md:block md:col-span-2"
                        : index === 6
                        ? "md:hidden"
                        : ""
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
      <tbody className=" max-h-[800px] custom-scroll overflow-y-auto overflow-x-hidden w-full scroll relative inline-block">
        <>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className={`border-b border-wine border-dotted last:border-none py-[20px] grid grid-cols-3 md:grid-cols-7`}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td
                      key={cell.id}
                      className={`font-medium text-[14px] py-[13px] px-2 text-center ${
                        index === 1 || index === 4 || index === 5
                          ? "hidden md:block"
                          : index === 2
                          ? "hidden md:block md:col-span-2"
                          : index === 6
                          ? "md:hidden"
                          : ""
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
  );
};
export default DonateRecordTable;
