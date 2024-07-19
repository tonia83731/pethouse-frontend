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
import { STAYTABLEHEADER, staytablekeys } from "../statistic/TABLEHEADER";
import Pagination from "../common/Pagination";
const StatisticStayTable = ({
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
  const columns = staytablekeys.map((key: string) =>
    columnHelper.accessor(key, {
      header: () => `${STAYTABLEHEADER.get(key)}`,
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
      <h4 className="font-extrabold font-nunito text-3xl">可收留數</h4>
      <table className="">
        <thead className="rounded-md md:text-lg font-bold bg-milk-tea text-dark inline-block w-full">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr
                className="rounded-md grid grid-cols-7 items-center"
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
          <>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={`border-b border-wine border-dotted last:border-none py-[20px] grid grid-cols-7 w-[calc(100%+12px)]`}
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
          </>
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

export default StatisticStayTable;
