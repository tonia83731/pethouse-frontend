import DashboardContentLayout from "@/components/layout/DashboardContentLayout";
import DonateRecordTable from "@/components/table/DonateRecordTable";
import { dummydonaterecords } from "@/data/dummy/dummydonaterecords";
const DonateListPage = () => {
  return (
    <DashboardContentLayout title="捐款紀錄">
      <DonateRecordTable tableData={dummydonaterecords} />
    </DashboardContentLayout>
  );
};

export default DonateListPage;
