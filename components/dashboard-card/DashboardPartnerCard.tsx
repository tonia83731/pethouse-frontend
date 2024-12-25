import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { weekday_options } from "@/datas/weekday-option";
import { convertMinToTime } from "@/helpers/time-helpers";
import { MdPhoneAndroid } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { PartnerProps } from "@/types/partner";
import { clientFetch } from "@/lib/fetch";
import { getCookie } from "cookies-next";
import { getPartnerData, updateEditClick } from "@/slices/partnerSlice";
import { toast } from "react-toastify";

const DashboardPartnerCard = ({
  id,
  name,
  address,
  phone,
  email,
  isAdmin,
  weekStart,
  weekEnd,
  openingTime,
  closingTime,
}: PartnerProps) => {
  const dispatch = useDispatch();
  const token = getCookie("staffToken");
  const { currentUser, partnerData } = useSelector(
    (state: RootState) => state.partner
  );
  const week_start = weekday_options[weekStart]?.label;
  const week_end = weekday_options[weekEnd]?.label;
  const opening = convertMinToTime(openingTime);
  const closing = convertMinToTime(closingTime);
  const handleEditClick = async (id: number | null) => {
    try {
      const response = await clientFetch(`/admin/partners/${id}`, {
        token,
      });
      if (response.success) {
        const {
          name,
          account,
          email,
          phone,
          address,
          password,
          weekStart,
          weekEnd,
          openingTime,
          closingTime,
        } = response.data;
        const formData = {
          partnerId: id,
          name,
          account,
          email,
          phone,
          address,
          password,
          weekStart: weekday_options[weekStart],
          weekEnd: weekday_options[weekEnd],
          openingTime,
          closingTime,
        };
        // console.log(response.data);
        dispatch(updateEditClick({ formData }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteClick = async (id: number | null) => {
    if (!currentUser?.isAdmin) {
      toast.error("使用者沒有刪除夥伴權限");
      return;
    }
    try {
      const response = await clientFetch(`/admin/partners/${id}`, {
        token,
        method: "DELETE",
      });

      if (!response.success) {
        toast.error("夥伴刪除失敗，請在試一次");
        return;
      }

      const updatedData = partnerData.filter((partner) => partner.id !== id);
      dispatch(getPartnerData({ data: updatedData }));
      toast.success("夥伴刪除成功");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={id}
      className="bg-white rounded-lg p-4 shadow-md flex flex-col gap-4"
    >
      <h5 className="font-bold text-lg">
        {name}{" "}
        {isAdmin ? (
          <span className="text-xs bg-wine text-white px-2 py-0.5 rounded-md">
            管理員
          </span>
        ) : (
          ""
        )}
      </h5>
      {!isAdmin && <div className="text-sm">{address}</div>}
      <div className="text-sm flex flex-col gap-1">
        {!isAdmin && (
          <div className="flex flex-row gap-2 items-center">
            <IoTimeOutline />
            <div className="flex flex-row gap-2">
              <div className="">
                {week_start} 至 {week_end}
              </div>
              <div className="">
                {opening}~{closing}
              </div>
            </div>
          </div>
        )}
        {!isAdmin && (
          <div className="flex items-center gap-2">
            <MdPhoneAndroid />
            <a
              href={`tel:${phone}`}
              className="hover:underline hover:underline-offset-2"
            >
              {phone}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2">
          <HiOutlineMailOpen />
          <a
            href={`mailto:${email}`}
            className="hover:underline hover:underline-offset-2"
          >
            {email}
          </a>
        </div>
      </div>
      {!isAdmin && (
        <div className="grid grid-cols-2 gap-4">
          <button
            disabled={!currentUser?.isAdmin}
            onClick={() => handleDeleteClick(id)}
            className="bg-taro text-dark w-full px-4 py-1.5 rounded-lg hover:shadow-md disabled:bg-dark-40 disabled:text-white disabled:hover:shadow-none"
          >
            刪除
          </button>
          <button
            disabled={!currentUser?.isAdmin && currentUser?.id !== id}
            onClick={() => handleEditClick(id)}
            className="bg-skin text-dark w-full px-4 py-1.5 rounded-lg hover:shadow-md disabled:bg-dark-40 disabled:text-white disabled:hover:shadow-none"
          >
            修改
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPartnerCard;
