import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedModalShowed } from "@/slices/volunteerSlice";

const ModalItemLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-4 bg-skin-40 rounded-lg p-4">
      <h5 className="font-bold">{title}</h5>
      <div className="text-sm">{children}</div>
    </div>
  );
};

const VolunteerDetail = () => {
  const dispatch = useDispatch();
  const { volunteerDetail } = useSelector(
    (state: RootState) => state.volunteer
  );
  return (
    <>
      <ModalItemLayout title={volunteerDetail?.partner.name as string}>
        <div className="pl-2">
          <span>- 連絡電話:&nbsp;</span>
          <a href={`tel:${volunteerDetail?.partner.phone}`}>
            {volunteerDetail?.partner.phone}
          </a>
        </div>
        <div className="pl-2">
          <span>- Email:&nbsp;</span>
          <a href={`mailto:${volunteerDetail?.partner.email}`}>
            {volunteerDetail?.partner.email}
          </a>
        </div>
        <div className="pl-2">
          <span>- 聯絡地址:&nbsp;</span>
          {volunteerDetail?.partner.address}
        </div>
      </ModalItemLayout>
      <div className="grid grid-cols-2 gap-8">
        <ModalItemLayout title="最低時數">
          <div>
            <span className="font-bold text-lg text-wine">
              {volunteerDetail?.minHour}
            </span>{" "}
            小時
          </div>
        </ModalItemLayout>
        <ModalItemLayout title="需求人數">
          <div>
            <span className="font-bold text-lg text-wine">
              {volunteerDetail?.perPerson}
            </span>{" "}
            人
          </div>
        </ModalItemLayout>
      </div>
      <button
        onClick={() =>
          dispatch(updatedModalShowed({ id: volunteerDetail?.id }))
        }
        className="bg-wine text-white w-full px-4 py-1.5 rounded-lg hover:shadow-md"
      >
        報名
      </button>
    </>
  );
};

export default VolunteerDetail;
