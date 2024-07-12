import DashboardContentLayout from "@/components/layout/DashboardContentLayout";
import DonateRecordTable from "@/components/table/DonateRecordTable";
import { dummydonaterecords } from "@/data/dummy/dummydonaterecords";
const DonateListPage = () => {
  return (
    <DashboardContentLayout title="Donate Record">
      <DonateRecordTable tableData={dummydonaterecords} />
    </DashboardContentLayout>
  );
};

export default DonateListPage;
