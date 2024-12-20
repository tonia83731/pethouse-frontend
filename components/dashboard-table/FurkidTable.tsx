import Link from "next/link";
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
import ModalLayout from "../common/layout/ModalLayout";
import { CiCircleMore } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import {
  SizeType,
  TransformAge,
  TransformAnimal,
  TransformGender,
  TransformSize,
  TransforTrueFalse,
} from "@/helpers/animal-helpers";
import { FurkidProps } from "@/pages/adoption";

interface IFurkidTable {
  tableData: FurkidProps[];
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const FURKIDSTABLEMAP = [
  ["name", "名字"],
  ["animal", "種類"],
  ["gender", "性別"],
  ["size", "體型"],
  ["age", "年齡"],
  ["isNeutured", "結紮"],
  ["isVaccinated", "疫苗"],
  ["partner", "所屬夥伴"],
  ["adoptionNumber", "申請數量"],
  ["button", ""],
];

const optionsMap = {
  gender: TransformGender,
  size: TransformSize,
  age: TransformAge,
  animal: TransformAnimal,
};

const FurkidTable = ({
  tableData,
  onEditClick,
  onDeleteClick,
}: IFurkidTable) => {
  const [sourceSorting, setSourceSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });
  const [toggle, setToggle] = useState(false);
  const [toggleData, setToggleData] = useState<any>(null);
  const columnHelper = createColumnHelper<any>();
  const columns = FURKIDSTABLEMAP.map(([key, label]) => {
    switch (key) {
      case "name":
        return columnHelper.accessor(key, {
          id: key,
          header: () => (
            <div className="">
              <span className="lg:hidden">毛孩資料</span>
              <span className="hidden lg:block">{label}</span>
            </div>
          ),
          cell: (info) => (
            <div className="flex items-center gap-0.5">
              <div className="">{info.getValue()}</div>
              <button
                onClick={() => handleDetailClick(info.row.original.id)}
                className="lg:hidden text-lg"
              >
                <CiCircleMore />
              </button>
            </div>
          ),
        });
      case "isNeutured":
      case "isVaccinated":
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => TransforTrueFalse(info.getValue()),
          // <span>{info.getValue() ? "Y" : "N"}</span>
        });
      case "animal":
      case "size":
      case "age":
      case "gender":
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => {
            const transformFunction = optionsMap[key];
            const transformedValue = transformFunction(
              info.getValue() as never
            );
            return <span>{transformedValue}</span>;
          },
        });
      case "adoptionNumber":
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => (
            <div className="flex flex-col gap-2 items-center">
              <div
                className={info.getValue() >= 10 ? "text-heart font-bold" : ""}
              >
                {info.getValue()}
              </div>
              <Link
                href="#"
                className="text-dark-60 hover:text-dark hover:underline hover:underline-offset-2 text-xs lg:text-sm"
              >
                查看文件
              </Link>
            </div>
          ),
        });
      case "partner":
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => {
            const name = info.getValue()["name"].split(" ")[1];
            return <span>{name}</span>;
          },
        });
      case "button":
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
      default:
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

  const handleDetailClick = (id: number | null) => {
    const furkid = tableData.find((item) => item.id === id);
    if (furkid) {
      const animal = TransformAnimal(furkid.animal);
      const gender = TransformGender(furkid.gender);
      const size = TransformSize(furkid.size as SizeType);
      const age = TransformAge(furkid.age);

      const data = {
        ...furkid,
        animal,
        gender,
        size,
        age,
        isNeutured: (
          <div className="flex items-center gap-1">
            {furkid.isNeutured ? (
              <FaCheck className="text-neutral" />
            ) : (
              <ImCross className="text-berry" />
            )}
            <span>{furkid.isNeutured ? "已絕育" : "未絕育"}</span>
          </div>
        ),
        isVaccinated: (
          <div className="flex items-center gap-1">
            {furkid.isVaccinated ? (
              <FaCheck className="text-neutral" />
            ) : (
              <ImCross className="text-berry" />
            )}
            <span>
              {furkid.isVaccinated ? "已施打狂犬疫苗" : "未施打狂犬疫苗"}
            </span>
          </div>
        ),
      };
      setToggleData(data);
      setToggle(true);
    }
  };
  return (
    <>
      <table>
        <thead className="bg-fern text-ivory text-sm lg:text-base h-12 bg-skin overflow-hidden">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr
                key={headerGroup.id}
                className={`grid grid-cols-8 lg:grid-cols-14 h-12 leading-12`}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      key={header.id}
                      className={`cursor-pointer 
                      ${
                        index !== 0 && index !== 7 && index !== 8 && index !== 9
                          ? "hidden lg:flex"
                          : "col-span-2 flex"
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
        <tbody className="text-xs lg:text-sm">
          {table.getRowModel().rows.map((row, index) => {
            return (
              <tr
                className={`py-1.5 grid grid-cols-8 lg:grid-cols-14 ${
                  index !== 0 && "border-t-[0.5px] border-fern-30"
                }`}
                key={row.id}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td
                      className={` ${
                        index !== 0 && index !== 7 && index !== 8 && index !== 9
                          ? "hidden lg:flex"
                          : "col-span-2 flex"
                      } justify-center items-center`}
                      key={cell.id}
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
      {toggle && (
        <ModalLayout
          title={`${toggleData.name} 簡介`}
          isOpen={toggle}
          onClose={() => {
            setToggle(false);
            setToggleData(null);
          }}
          customClass="h-screen mt-0"
        >
          <div className="flex flex-col gap-6">
            <div className="border border-dark shadow-md text-center px-4 py-2 rounded-lg flex items-center gap-1 justify-center">
              <div>{toggleData.animal}</div>
              <div>{toggleData.gender}</div>
            </div>
            <div className="gap-4 grid grid-cols-2">
              <div className="relative">
                <h5 className="absolute left-2 -translate-y-1/2 bg-white px-2">
                  毛孩體型
                </h5>
                <div className="border border-dark shadow-md text-center px-4 py-2 rounded-lg">
                  {toggleData.size}
                </div>
              </div>
              <div className="relative">
                <h5 className="absolute left-2 -translate-y-1/2 bg-white px-2">
                  毛孩年齡
                </h5>
                <div className="border border-dark shadow-md text-center px-4 py-2 rounded-lg">
                  {toggleData.age}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>{toggleData.isNeutured}</div>
              <div>{toggleData.isVaccinated}</div>
            </div>
          </div>
        </ModalLayout>
      )}
    </>
  );
};

export default FurkidTable;
