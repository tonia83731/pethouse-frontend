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
import { useModalStore } from "@/store/useModalStore";
import AddMemberModal from "../modal/AddMemberModal";
type MembertableProps = {
  name: string;
  address: string;
  phone: string;
  email: string;
};
const MEMBERTABLEHEADER = [
  ["name", "夥伴名稱"],
  ["address", "夥伴地址"],
  ["phone", "夥伴電話"],
  ["email", "Email"],
  ["btn", ""],
];

const MemberTable = ({ tableData }: { tableData: any }) => {
  const { isMemberModalToggle, setIsModalToggle } = useModalStore();
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const columnHelper = createColumnHelper<any>();
  const columns = MEMBERTABLEHEADER.map((title) =>
    columnHelper.accessor(title[0], {
      header: () => (
        <span className="text-base md:text-lg font-bold">{title[1]}</span>
      ),
      cell: (info: any) => {
        if (title[0] === "btn") {
          return (
            <div className="flex flex-col gap-2">
              <button className="bg-taro text-white rounded-md drop-shadow-md px-2 py-1">
                編輯
              </button>
              <button className="bg-heart text-white rounded-md drop-shadow-md px-2 py-1">
                刪除
              </button>
            </div>
          );
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
    <>
      <table className="w-full border-spacing-0 rounded-xl overflow-hidden bg-white shadow-default block">
        <thead className="rounded-md md:text-lg font-bold bg-milk-tea text-dark w-full inline-block ">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr
                key={`MULTI-${headerGroup.id}`}
                className={`rounded-md w-full grid grid-cols-4 md:grid-cols-7 items-center`}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      key={header.id}
                      className={`cursor-pointer font-medium text-[14px] py-[13px] ${
                        index === 1
                          ? "col-span-2"
                          : index === 3
                          ? "hidden md:block md:col-span-2"
                          : index === 2
                          ? "hidden md:block md:col-span-1"
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
        <tbody className="max-h-[720px] md:max-h-[660px] custom-scroll overflow-y-auto overflow-x-hidden w-full scroll relative inline-block text-center">
          <>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={`border-b border-wine border-dotted last:border-none py-[20px] grid grid-cols-4 md:grid-cols-7`}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <td
                        key={cell.id}
                        className={`font-medium text-[14px] py-[13px] px-2 ${
                          index === 1
                            ? "col-span-2"
                            : index === 3
                            ? "hidden md:block md:col-span-2"
                            : index === 2
                            ? "hidden md:block md:col-span-1"
                            : "col-span-1"
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
      {isMemberModalToggle && <AddMemberModal />}
    </>
  );
};
export default MemberTable;
