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
import { VolunteersProps } from "@/pages/volunteer";
import { possible_weekday } from "@/pages/volunteer";

import { BsPhoneVibrateFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const VOLUNTEERTABLEMAP = [
  ["partner", "需求夥伴"], // 2          //m
  ["introduction", "工作內容"], // 2  //t//m
  ["time", "需求時間"], // 2          //t//m
  ["minHour", "最低時數"], // 1          //m
  ["perPerson", "需求人數"], // 1        //m
  ["apply", ""], // 1               //t//m
];

type VolunteerTableProps = {
  tableData: VolunteersProps[];
  onDetailClick: (id: number) => void;
  onApplyClick: (id: number) => void;
};

const converMinToTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

const VolunteerTable = ({
  tableData,
  onDetailClick,
  onApplyClick,
}: VolunteerTableProps) => {
  // console.log(tableData);
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const columnHelper = createColumnHelper<any>();
  const columns = VOLUNTEERTABLEMAP.map((tHead: string[]) => {
    if (tHead[0] === "partner") {
      return columnHelper.accessor(tHead[0], {
        id: tHead[0],
        header: () => <span>{tHead[1]}</span>,
        cell: (info) => (
          <div className="flex flex-col gap-2 px-2">
            <h5 className="font-medium">{info.getValue()["name"]}</h5>
            <ul className="text-xs">
              <li className="flex items-start gap-1">
                <BsPhoneVibrateFill className="text-lg" />
                <a
                  href={`tel:${info.getValue()["phone"]}`}
                  className="text-dark-60 hover:underline hover:underline-offset-2"
                >
                  {info.getValue()["phone"]}
                </a>
              </li>
              <li className="flex items-start gap-1">
                <MdEmail className="text-lg" />
                <a
                  href={`mailto:${info.getValue()["email"]}`}
                  className="text-dark-60 hover:underline hover:underline-offset-2"
                >
                  {info.getValue()["email"]}
                </a>
              </li>
              <li className="flex items-start gap-1">
                <IoLocationSharp className="text-lg" />
                <p className="text-dark-60">{info.getValue()["address"]}</p>
              </li>
            </ul>
          </div>
        ),
      });
    } else if (tHead[0] === "time") {
      return columnHelper.accessor(tHead[0], {
        id: tHead[0],
        header: () => <span>{tHead[1]}</span>,
        cell: (info) => (
          <div className="flex flex-col items-center gap-2">
            <div className="font-medium">
              {info.getValue()["weekday"]
                ? possible_weekday[info.getValue()["weekday"]]
                : "每日"}
            </div>
            <div className="flex items-center gap-1">
              <p>{converMinToTime(info.getValue()["startTime"])}</p>
              <p>~</p>
              <p>{converMinToTime(info.getValue()["endTime"])}</p>
            </div>
          </div>
        ),
      });
    } else if (tHead[0] === "apply") {
      return columnHelper.accessor(tHead[0], {
        id: tHead[0],
        header: () => <span>{tHead[1]}</span>,
        cell: (info) => (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onDetailClick(info.row.original.id)}
              className="bg-taro text-white px-4 py-1 rounded-lg lg:hidden hover:shadow-md"
            >
              More
            </button>
            <button
              onClick={() => onApplyClick(info.row.original.id)}
              className="bg-skin text-white px-4 py-1 rounded-lg hover:shadow-md"
            >
              報名
            </button>
          </div>
        ),
      });
    } else {
      return columnHelper.accessor(tHead[0], {
        id: tHead[0],
        header: () => <span>{tHead[1]}</span>,
        cell: (info) => <span className="px-2">{info.getValue()}</span>,
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
              className={`grid grid-cols-5 lg:grid-cols-9 h-12 leading-12`}
            >
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    key={header.id}
                    className={`cursor-pointer ${
                      (index === 0 || index === 1 || index === 2) &&
                      "col-span-2"
                    } ${
                      index !== 1 && index !== 2 && index !== 5
                        ? "hidden lg:flex lg:justify-center lg:items-center"
                        : "flex justify-center items-center"
                    }`}
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
      <tbody className="text-xs lg:text-sm">
        {table.getRowModel().rows.map((row, index) => {
          return (
            <tr
              className={`py-1.5 grid grid-cols-5 lg:grid-cols-9 ${
                index !== 0 && "border-t-[0.5px] border-fern-30"
              }`}
              key={row.id}
            >
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <td
                    className={`${
                      (index === 0 || index === 1 || index === 2) &&
                      "col-span-2"
                    } ${
                      index !== 1 && index !== 2 && index !== 5
                        ? "hidden lg:flex"
                        : "flex"
                    } ${index === 1 && "text-xs items-center"} ${
                      index !== 0 &&
                      index !== 1 &&
                      "items-center justify-center"
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

export default VolunteerTable;
