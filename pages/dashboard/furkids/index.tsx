import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { getFurkidData } from "@/slices/furkidSlice";
import { authFetch } from "@/lib/fetch";
import { SelectOptionType } from "@/types/default";
import { DashboardFurkidProps } from "@/types/furkid";
// import { PartnerProps } from "@/components/home-section/PartnerSection";
import { PartnerProps } from "@/types/partner";
import DashboardLayout from "@/components/common/layout/DashboardLayout";
import FurkidForm from "@/components/dashbord-forms/FurkidForm";
import FurkidTable from "@/components/dashboard-table/FurkidTable";

const FurkidDashboardPage = ({
  furkids,
  partners,
}: {
  furkids: DashboardFurkidProps[];
  partners: SelectOptionType[];
}) => {
  const dispatch = useDispatch();
  const { furkidData } = useSelector((state: RootState) => state.furkid);

  useEffect(() => {
    if (furkids.length <= 0) return;
    dispatch(getFurkidData({ data: furkids }));
  }, [furkids]);

  return (
    <DashboardLayout title="毛孩列表">
      <FurkidForm partners={partners} />
      <FurkidTable tableData={furkidData} />
    </DashboardLayout>
  );
};

export default FurkidDashboardPage;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const [furkid_res, partner_res] = await Promise.all([
      authFetch(context, "/admin/furkids", "GET"),
      authFetch(context, "/admin/partners", "GET"),
    ]);

    if (!furkid_res.success || !partner_res.success) {
      return {
        props: {
          furkids: [],
          partners: [],
        },
      };
    }

    const partners = partner_res.data
      .filter((partner: PartnerProps) => !partner.isAdmin)
      .map((partner: PartnerProps) => ({
        label: partner.name,
        value: partner.id,
      }));

    return {
      props: {
        furkids: furkid_res.data,
        partners,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        furkids: [],
        partners: [],
      },
    };
  }
};
