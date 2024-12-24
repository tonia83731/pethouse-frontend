import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { authFetch } from "@/lib/fetch";
import { OptionType } from "@/components/common/input/DefaultSelect";
import { FurkidProps } from "@/pages/adoption";
import { PartnerProps } from "@/components/home-section/PartnerSection";

import DashboardLayout from "@/components/common/layout/DashboardLayout";
import FurkidForm from "@/components/dashbord-forms/FurkidForm";
import FurkidTable from "@/components/dashboard-table/FurkidTable";
import { useSelector, useDispatch } from "react-redux";
import { getFurkidData } from "@/slices/furkidSlice";
import { RootState } from "@/store";

type DashboardFurkidProps = FurkidProps & {
  adoptionNumber: number;
};

const FurkidDashboardPage = ({
  furkids,
  partners,
}: {
  furkids: DashboardFurkidProps[];
  partners: OptionType[];
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

    const partners = partner_res.data.map((partner: PartnerProps) => ({
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
