import DashboardContentLayout from "@/components/layout/DashboardContentLayout";
import FindVolunteerForm from "@/components/forms/FindVolunteerForm";
import FindVolunteerTable from "@/components/table/FindVolunteerTable";
import { dummyvolunteerdata } from "@/data/dummy/dummyvolunteerdata";
const FindVolunteerPage = () => {
  return (
    <DashboardContentLayout title="尋找志工">
      <div className="flex flex-col justify-between gap-8">
        <FindVolunteerForm />
        <div className="w-full border-t-2 border-dotted border-wine "></div>
        <FindVolunteerTable tableData={dummyvolunteerdata} />
      </div>
    </DashboardContentLayout>
  );
};

export default FindVolunteerPage;
