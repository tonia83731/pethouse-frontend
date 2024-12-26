import { convertMinToTime } from "@/helpers/time-helpers";
import { VolunteersProps } from "@/types/volunteer";

const DashboardVolunteerDetailCard = ({
  introduction,
  perPerson,
  Volunteers,
  partner,
  date,
  startTime,
  endTime,
}: VolunteersProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <h5 className="font-medium text-lg">報名志工詳細資料</h5>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2 relative">
          <h5 className="font-medium bg-white absolute left-4 -top-3">
            工作地點
          </h5>
          <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
            <div className="font-medium">{partner.name}</div>
            <div className="">{partner.address}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 relative">
            <h5 className="font-medium bg-white absolute left-4 -top-3">
              工作日期
            </h5>
            <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
              <div className="">{date}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 relative">
            <h5 className="font-medium bg-white absolute left-4 -top-3">
              工作時間
            </h5>
            <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
              <div className="">
                {convertMinToTime(startTime)}~{convertMinToTime(endTime)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <h5 className="font-medium bg-white absolute left-4 -top-3">
            工作簡述
          </h5>
          <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
            <div className="">{introduction}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 relative">
            <h5 className="font-medium bg-white absolute left-4 -top-3">
              報名人數
            </h5>
            <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
              <div className="">{Volunteers.length}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 relative">
            <h5 className="font-medium bg-white absolute left-4 -top-3">
              需求人數
            </h5>
            <div className="flex items-center gap-2 border border-wine rounded-lg p-4">
              <div className="">{perPerson}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardVolunteerDetailCard;
