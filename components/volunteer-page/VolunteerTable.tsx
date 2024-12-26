import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { convertMinToTime } from "@/helpers/time-helpers";
import { VolunteerTableProps } from "@/types/volunteer";
import { clientFetch } from "@/lib/fetch";
import {
  getVolunteerDetail,
  updatedFormInput,
  updatedModalShowed,
} from "@/slices/volunteerSlice";

const VOLUNTEERTABLEMAP = [
  ["partner", "需求夥伴"], // 2          //m
  ["introduction", "工作內容"], // 2  //t//m
  ["time", "需求時間"], // 2          //t//m
  ["minHour", "最低時數"], // 1          //m
  ["perPerson", "需求人數"], // 1        //m
  ["apply", ""], // 1               //t//m
];

const VolunteerTable = ({
  tableData,
}: {
  tableData: VolunteerTableProps[];
}) => {
  // console.log(tableData);
  const dispatch = useDispatch();

  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const columnHelper = createColumnHelper<any>();
  const columns = VOLUNTEERTABLEMAP.map(([key, label]) => {
    switch (key) {
      case "partner":
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => <div className="">{info.getValue()["name"]}</div>,
        });
      case "time":
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => (
            <div className="flex flex-col items-center gap-2">
              <div className="font-medium">{info.getValue()["date"]}</div>
              <div className="flex items-center gap-1">
                <p>{convertMinToTime(info.getValue()["startTime"])}</p>
                <p>~</p>
                <p>{convertMinToTime(info.getValue()["endTime"])}</p>
              </div>
            </div>
          ),
        });
      case "apply":
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleDetailClick(info.row.original.id)}
                className="bg-taro text-white px-4 py-1 rounded-lg lg:hidden hover:shadow-md"
              >
                More
              </button>
              <button
                onClick={() => handleApplyClick(info.row.original.id)}
                className="bg-skin text-white px-4 py-1 rounded-lg hover:shadow-md"
              >
                報名
              </button>
            </div>
          ),
        });
      default:
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
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

  const handleDetailClick = async (id: number | null) => {
    try {
      const response = await clientFetch(`/volunteers/${id}`);
      if (response.success) {
        dispatch(getVolunteerDetail({ data: response.data }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApplyClick = async (id: number | null) => {
    try {
      const response = await clientFetch(`/volunteers/${id}`);
      if (response.success) {
        dispatch(getVolunteerDetail({ data: response.data }));
        dispatch(updatedModalShowed({ id }));
        // dispatch(
        //   updatedFormInput({ name: "findVolunteerId", value: id as number })
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

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
