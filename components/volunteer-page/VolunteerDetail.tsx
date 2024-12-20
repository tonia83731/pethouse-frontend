import { ReactNode } from "react";
import { VolunteersProps } from "@/pages/volunteer";

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

const VolunteerDetail = ({
  modalDetail,
  onApplyClick,
}: {
  modalDetail: VolunteersProps | null;
  onApplyClick: (id: number | null) => void;
}) => {
  return (
    <>
      <ModalItemLayout title={modalDetail?.partner.name as string}>
        <div className="pl-2">
          <span>- 連絡電話:&nbsp;</span>
          <a href={`tel:${modalDetail?.partner.phone}`}>
            {modalDetail?.partner.phone}
          </a>
        </div>
        <div className="pl-2">
          <span>- Email:&nbsp;</span>
          <a href={`mailto:${modalDetail?.partner.email}`}>
            {modalDetail?.partner.email}
          </a>
        </div>
        <div className="pl-2">
          <span>- 聯絡地址:&nbsp;</span>
          {modalDetail?.partner.address}
        </div>
      </ModalItemLayout>
      <div className="grid grid-cols-2 gap-8">
        <ModalItemLayout title="最低時數">
          <div>
            <span className="font-bold text-lg text-wine">
              {modalDetail?.minHour}
            </span>{" "}
            小時
          </div>
        </ModalItemLayout>
        <ModalItemLayout title="需求人數">
          <div>
            <span className="font-bold text-lg text-wine">
              {modalDetail?.perPerson}
            </span>{" "}
            人
          </div>
        </ModalItemLayout>
      </div>
      <button
        onClick={() => onApplyClick(modalDetail && modalDetail.id)}
        className="bg-wine text-white w-full px-4 py-1.5 rounded-lg hover:shadow-md"
      >
        報名
      </button>
    </>
  );
};

export default VolunteerDetail;
