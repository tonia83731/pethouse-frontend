import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { getSupplyData } from "@/slices/supplySlice";
import { authFetch } from "@/lib/fetch";
import { SelectOptionType } from "@/types/default";
import { SupplyProps } from "@/types/supply";
import DashboardLayout from "@/components/common/layout/DashboardLayout";
import SuppliesForm from "@/components/dashbord-forms/SuppliesForm";
import SuppliesTable from "@/components/dashboard-table/SuppliesTable";
import { PartnerProps } from "@/types/partner";

const SuppliesPage = ({
  supplies,
  partners,
}: {
  supplies: SupplyProps[];
  partners: SelectOptionType[];
}) => {
  const dispatch = useDispatch();
  const { supplyData } = useSelector((state: RootState) => state.supply);
  useEffect(() => {
    if (supplies.length <= 0) return;
    dispatch(getSupplyData({ data: supplies }));
  }, [supplies]);
  return (
    <DashboardLayout title="尋找物資">
      <SuppliesForm partners={partners} />
      <SuppliesTable tableData={supplyData} />
    </DashboardLayout>
  );
};

export default SuppliesPage;
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const [supplies_res, partner_res] = await Promise.all([
      authFetch(context, "/admin/supplies", "GET"),
      authFetch(context, "/admin/partners", "GET"),
    ]);

    if (!supplies_res.success || !partner_res.success) {
      return {
        props: {
          supplies: [],
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
        supplies: supplies_res.data,
        partners,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        supplies: [],
      },
    };
  }
};
