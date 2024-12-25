import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  getPartnerData,
  getUserInfo,
  updatedModalCanceled,
  updateModalShowed,
} from "@/slices/partnerSlice";
import { authFetch } from "@/lib/fetch";
import { PartnerProps, UserInfoProps } from "@/types/partner";
import DashboardLayout from "@/components/common/layout/DashboardLayout";
import ModalLayout from "@/components/common/layout/ModalLayout";
import DashboardPartnerCard from "@/components/dashboard-card/DashboardPartnerCard";
import PartnerForm from "@/components/dashbord-forms/PartnerForm";

const CollaborationPage = ({
  partners,
  user,
}: {
  partners: PartnerProps[];
  user: UserInfoProps;
}) => {
  const dispatch = useDispatch();
  const { partnerData, currentUser, modalToggle, type } = useSelector(
    (state: RootState) => state.partner
  );

  const handleModalShowed = (type: "create" | "edit") => {
    dispatch(updateModalShowed({ type }));
  };
  const handleModalClosed = () => {
    dispatch(updatedModalCanceled());
  };

  useEffect(() => {
    if (!user) return;
    dispatch(getUserInfo({ data: user }));
  }, [user]);
  useEffect(() => {
    if (!partners) return;
    dispatch(getPartnerData({ data: partners }));
  }, [partners]);

  return (
    <DashboardLayout title="合作夥伴">
      {/* <CollaborationForm /> */}
      {/* <PartnerAdjust /> */}
      <button
        disabled={!currentUser?.isAdmin}
        onClick={() => handleModalShowed("create")}
        className="w-full lg:w-1/5 lg:max-w-[140px] py-2 bg-heart text-white lg:text-lg rounded-lg disabled:bg-dark-40 disabled:text-white"
      >
        新增夥伴
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partnerData.map((partner: PartnerProps) => {
          return <DashboardPartnerCard {...partner} key={partner.id} />;
        })}
      </div>
      {modalToggle && (
        <ModalLayout
          title={`${type === "create" ? "新增" : "修改"}夥伴`}
          onClose={handleModalClosed}
          isOpen={modalToggle}
          customClass="h-screen"
        >
          <PartnerForm />
        </ModalLayout>
      )}
    </DashboardLayout>
  );
};

export default CollaborationPage;
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const [partners_res, user_res] = await Promise.all([
      authFetch(context, "/admin/partners", "GET"),
      authFetch(context, "/admin/user-info", "GET"),
    ]);
    if (!partners_res.success || !user_res.success) {
      return {
        props: {
          partners: [],
          user: null,
        },
      };
    }

    return {
      props: {
        partners: partners_res.data,
        user: user_res.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        partners: [],
        user: null,
      },
    };
  }
};
