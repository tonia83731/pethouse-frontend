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
import { useState } from "react";
import { SuppliesProps } from "@/pages/donation/supplies";
const SUPPLIESTABLEMAP = [
  ["supplyName", "物資名稱"],
  ["introduction", "物資簡述"],
  ["number", "需求數量"],
  ["partner", "需求夥伴"],
];

const DonationTable = ({ tableData }: { tableData: SuppliesProps[] }) => {
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const columnHelper = createColumnHelper<any>();

  const columns = SUPPLIESTABLEMAP.map((tHead: string[]) => {
    if (tHead[0] === "partner") {
      return columnHelper.accessor(tHead[0], {
        id: tHead[0],
        header: () => <span>{tHead[1]}</span>,
        cell: (info) => (
          <div className="flex flex-col gap-2">
            <input
              type="checkbox"
              id={info.row.original.id}
              className="peer hidden"
            />
            <label
              htmlFor={info.row.original.id}
              className="peer-checked:font-medium peer-checked:text-wine cursor-pointer hover:font-medium"
            >
              {info.getValue()["name"]}
            </label>
            <ul className="hidden peer-checked:flex flex-col text-xs">
              <li className="flex flex-col">
                <span>- 連絡電話:&nbsp;</span>
                <a
                  href={`tel:${info.getValue()["phone"]}`}
                  className="hover:underline hover:underline-offset-2 text-xs text-dark-60"
                >
                  {info.getValue()["phone"]}
                </a>
              </li>
              <li className="flex flex-col">
                <span>- 聯絡地址:&nbsp;</span>
                <a
                  href={`mailto:${info.getValue()["address"]}`}
                  className="hover:underline hover:underline-offset-2 text-xs text-dark-60"
                >
                  {info.getValue()["address"]}
                </a>
              </li>
            </ul>
          </div>
        ),
      });
    } else {
      return columnHelper.accessor(tHead[0], {
        id: tHead[0],
        header: () => <span>{tHead[1]}</span>,
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
              className={`grid grid-cols-6 md:grid-cols-5 h-12 leading-12`}
            >
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    key={header.id}
                    className={`h-12 cursor-pointer flex justify-center items-center ${
                      index === 1 && "col-span-2"
                    } ${index === 3 && "col-span-2 md:col-span-1"}`}
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
              className={`py-1.5 grid grid-cols-6 md:grid-cols-5 ${
                index !== 0 && "border-t-[0.5px] border-fern-30"
              }`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <td
                    className={`flex items-center ${
                      index === 1 && "col-span-2"
                    } ${index === 3 && "col-span-2 md:col-span-1"} ${
                      index !== 1 && index !== 3 && "justify-center text-center"
                    }`}
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

export default DonationTable;
