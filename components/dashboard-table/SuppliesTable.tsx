import { useState } from "react";
import {
  PaginationState,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

type SupplyTableProps = {
  id: number;
  supplyName: string;
  introduction: string;
  number: number;
  partnerName: string;
  partnerPhone: string;
  partnerAddress: string;
};

interface ISupplyTable {
  tableData: SupplyTableProps[];
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const SUPPLYTABLEMAP = [
  ["supplyName", "物資名稱"],
  ["introduction", "物資簡介"],
  ["number", "數量"],
  ["partnerName", "所需夥伴"],
  ["button", ""],
];

const SuppliesTable = ({
  tableData,
  onEditClick,
  onDeleteClick,
}: ISupplyTable) => {
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const columnHelper = createColumnHelper<any>();
  const columns = SUPPLYTABLEMAP.map(([key, label]) => {
    if (key === "supplyName") {
      return columnHelper.accessor(key, {
        id: key,
        header: () => (
          <div>
            <span className="md:hidden">所需物資</span>
            <span className="hidden md:block">{label}</span>
          </div>
        ),
        cell: (info) => (
          <div className="flex flex-col gap-1.5">
            <h5 className="font-medium">{info.getValue()}</h5>
            <p className="text-xs text-dark-60 md:hidden">
              {info.row.original.introduction}
            </p>
          </div>
        ),
      });
    } else if (key === "button") {
      return columnHelper.display({
        id: key,
        header: () => <span>{label}</span>,
        cell: (info) => (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onEditClick(info.row.original.id)}
              className="bg-skin text-dark w-full px-4 py-1.5 rounded-lg hover:shadow-md"
            >
              修改
            </button>
            <button
              onClick={() => onDeleteClick(info.row.original.id)}
              className="bg-taro text-dark w-full px-4 py-1.5 rounded-lg hover:shadow-md"
            >
              刪除
            </button>
          </div>
        ),
      });
    } else {
      return columnHelper.accessor(key, {
        id: key,
        header: () => <span>{label}</span>,
        cell: (info) => <span>{info.getValue()}</span>,
      });
    }
  });

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
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
  });
  return (
    <table>
      <thead className="bg-fern text-ivory text-sm md:text-base h-12 bg-skin overflow-hidden">
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <tr
              key={headerGroup.id}
              className={`grid grid-cols-7 md:grid-cols-10 h-12 leading-12`}
            >
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    key={header.id}
                    className={`cursor-pointer
                    ${
                      index === 1
                        ? "col-span-3"
                        : index === 0 || index === 3 || index === 4
                        ? "col-span-2"
                        : "col-span-1"
                    }
                    ${
                      index === 1 ? "hidden md:flex" : "flex"
                    } justify-center items-center`}
                    {...{
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody className="text-xs md:text-sm">
        {table.getRowModel().rows.map((row, index) => {
          return (
            <tr
              className={`py-1.5 grid grid-cols-7 md:grid-cols-10 ${
                index !== 0 && "border-t-[0.5px] border-fern-30"
              }`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <td
                    className={`${
                      index === 1
                        ? "col-span-3"
                        : index === 0 || index === 3 || index === 4
                        ? "col-span-2"
                        : "col-span-1"
                    } ${
                      index === 1 ? "hidden md:flex" : "flex"
                    } justify-center items-center`}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SuppliesTable;
