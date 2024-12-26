import { useState } from "react";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { clientFetch } from "@/lib/fetch";
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
import { MdPhoneAndroid } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { VolunteerTableProps } from "@/types/volunteer";
import { useDispatch, useSelector } from "react-redux";
// import { updateEditClick } from "@/slices/partnerSlice";
import { toast } from "react-toastify";
import { RootState } from "@/store";
import {
  getVolunteerData,
  updatedEditClick,
} from "@/slices/dashboarVolunteerSlice";
import Link from "next/link";

// export type VolunteerTableProps = {
//   id: number;
//   partnerId: number;
//   partner: string;
//   time: {
//     weekday: string;
//     startTime: string;
//     endTime: string;
//   };
//   minHour: number;
//   perPerson: number;
//   introduction: string;
// };

interface IVolunteerTable {
  tableData: VolunteerTableProps[];
}

const VOLUNTEERTABLEMAP = [
  ["partner", "需求夥伴"], // 2
  ["introduction", "工作內容"],
  ["time", "工作時間"],
  ["minHour", "最低時數"],
  ["perPerson", "需求人數"], // 1
  ["application", "報名列表"],
  ["button", ""], // 2
];

const VolunteerDashboardTable = ({ tableData }: IVolunteerTable) => {
  const token = getCookie("staffToken");
  const dispatch = useDispatch();
  const { volunteerData } = useSelector(
    (state: RootState) => state.dashboardVolunteer
  );
  const [toggle, setToggle] = useState({
    detail: false,
    application: false,
  });
  const [toggleData, setToggleData] = useState<any>(null);
  const [applicationData, setApplicationData] = useState<any>([]);
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
          cell: (info) => (
            <div className="flex items-center gap-0.5">
              <div className="">{info.getValue()["name"]}</div>
              <button
                onClick={() => handleDetailClick(info.row.original.id)}
                className="lg:hidden text-lg"
              >
                <CiCircleMore />
              </button>
            </div>
          ),
        });
      case "time":
        return columnHelper.accessor(key, {
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => (
            <div className="flex flex-col items-center gap-2">
              <div className="font-medium">{info.getValue()["date"]}</div>
              <div className="flex items-center gap-1">
                <p>{info.getValue()["startTime"]}</p>
                <p>~</p>
                <p>{info.getValue()["endTime"]}</p>
              </div>
            </div>
          ),
        });
      case "application":
        return columnHelper.display({
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => (
            // <button
            //   // onClick={() => onEditClick(info.row.original.id)}
            //   onClick={() => handleApplicationClick(info.row.original.id)}
            //   className="text-dark-60 hover:text-dark hover:underline hover:underline-offset-2 text-xs lg:text-sm"
            // >
            //   查看
            // </button>
            <Link
              href={`/dashboard/volunteers/${info.row.original.id}`}
              className="text-dark-60 hover:text-dark hover:underline hover:underline-offset-2 text-xs lg:text-sm"
            >
              查看
            </Link>
          ),
        });
      case "button":
        return columnHelper.display({
          id: key,
          header: () => <span>{label}</span>,
          cell: (info) => (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEditClick(info.row.original.id)}
                className="bg-skin text-dark w-full px-4 py-1.5 rounded-lg hover:shadow-md"
              >
                修改
              </button>
              <button
                onClick={() => handleDeleteClick(info.row.original.id)}
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

  const handleEditClick = async (id: number | null) => {
    try {
      const response = await clientFetch(`/admin/volunteers/${id}`, {
        token,
      });
      if (response.success) {
        const {
          startTime,
          endTime,
          date,
          introduction,
          minHour,
          partner,
          perPerson,
        } = response.data;
        const formData = {
          volunteerId: id,
          startTime,
          endTime,
          date: date ? date : null,
          intro: introduction,
          minHour,
          perPerson,
          location: {
            label: partner.name,
            value: partner.id,
          },
        };
        dispatch(updatedEditClick({ formData }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = async (id: number | null) => {
    try {
      const response = await clientFetch(`/admin/volunteers/${id}`, {
        method: "DELETE",
        token,
      });

      if (!response.success) {
        toast.error("刪除尋找志工資料失敗，請在試一次");
        return;
      }

      const updated_data = volunteerData.filter((item) => item.id !== id);
      dispatch(getVolunteerData(updated_data));
      toast.success("刪除尋找志工資料成功");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetailClick = (id: number | null) => {
    const volunteer = tableData.find((item) => item.id === id);
    if (volunteer) {
      setToggleData(volunteer);
      setToggle((prev) => ({ ...prev, detail: true }));
    }
  };

  // const handleApplicationClick = async (id: number | null) => {
  //   try {
  //     const response = await clientFetch(
  //       `/admin/volunteers/${id}/application`,
  //       {
  //         token,
  //       }
  //     );

  //     if (response.success) {
  //       setApplicationData(response.data);
  //       setToggle((prev) => ({ ...prev, application: true }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <table>
        <thead className="bg-fern text-ivory h-12 bg-skin overflow-hidden">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr
                key={headerGroup.id}
                className={`grid grid-cols-5 lg:grid-cols-12 h-12 leading-12`}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <th
                      key={header.id}
                      className={`cursor-pointer
                    ${
                      index === 1
                        ? "col-span-3"
                        : index === 0 || index === 2
                        ? "col-span-2"
                        : index === 5
                        ? "col-span-1 lg:col-span-2"
                        : "col-span-1"
                    } ${
                        index === 1 || index === 2 || index === 3
                          ? "hidden lg:flex"
                          : "flex"
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
                className={`py-1.5 grid grid-cols-5 lg:grid-cols-12 ${
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
                          : index === 0 || index === 2
                          ? "col-span-2"
                          : index === 5
                          ? "col-span-1 lg:col-span-2"
                          : "col-span-1"
                      } ${
                        index === 1 || index === 2 || index === 3
                          ? "hidden lg:flex"
                          : "flex"
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
      {toggle.detail && (
        <ModalLayout
          title="志工詳細資料"
          isOpen={toggle.detail}
          onClose={() => {
            setToggle((prev) => ({ ...prev, detail: false }));
            setToggleData(null);
          }}
          customClass="h-screen mt-0"
        >
          <div className="flex flex-col gap-4">
            <p className="">{toggleData.introduction}</p>
            <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] gap-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 relative">
                  <h5 className="font-medium bg-white absolute left-4 -top-3">
                    工作日期
                  </h5>
                  <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
                    <div className="">{toggleData.time.date}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 relative">
                  <h5 className="font-medium bg-white absolute left-4 -top-3">
                    工作時間
                  </h5>
                  <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
                    <div className="">
                      {toggleData.time.startTime} ~ {toggleData.time.endTime}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <h5 className="font-medium bg-white absolute left-4 -top-3">
                  最低時數
                </h5>
                <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
                  {toggleData.minHour} 時
                </div>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
      {toggle.application && (
        <ModalLayout
          title="志工申請列表"
          isOpen={toggle.application}
          onClose={() => {
            setToggle((prev) => ({ ...prev, application: false }));
            setApplicationData([]);
          }}
          customClass="h-screen mt-0"
        >
          <div className="flex flex-col gap-4">
            {applicationData.length > 0 ? (
              <>
                {applicationData.map((item: any) => {
                  return (
                    <div
                      className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4"
                      key={item.id}
                    >
                      <div className="text-xl font-bold">
                        <span className="text-xs font-normal mr-2">申請人</span>
                        {item.name}
                      </div>
                      <div className="flex flex-col gap-2">
                        <h5 className="font-bold">申請人聯絡資料</h5>
                        <div className="text-sm text-dark-60 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <MdPhoneAndroid className="text-lg" />
                            <a
                              href={`tel:${item.phone}`}
                              className="hover:underline hover:underline-offset-2 hover:font-medium"
                            >
                              {item.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <HiOutlineMailOpen className="text-lg" />
                            <a
                              href={`mailto:${item.email}`}
                              className="hover:underline hover:underline-offset-2 hover:font-medium"
                            >
                              {item.email}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h5 className="font-bold">申請人工作資料</h5>
                        <div className="text-sm text-dark-60 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <IoTimeOutline className="text-lg" />
                            <div className="">
                              {dayjs(item.date).format("YYYY-MM-DD")}, 共
                              {item.hours}小時
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="text-dark-60 w-full h-full flex justify-center items-center">
                沒有申請資料
              </div>
            )}
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setToggle((prev) => ({ ...prev, application: false }));
                setApplicationData([]);
              }}
              className="bg-wine text-white px-4 py-1.5 rounded-lg shadow-md"
            >
              關閉
            </button>
          </div>
        </ModalLayout>
      )}
    </>
  );
};

export default VolunteerDashboardTable;
