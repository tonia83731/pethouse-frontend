import DashboardContentLayout from "@/components/layout/DashboardContentLayout";
import MemberFilter from "@/components/filter/MemberFilter";
import MemberTable from "@/components/table/MemberTable";
import { dummymembers } from "@/data/dummy/dummymember";
const MemberPage = () => {
  return (
    <DashboardContentLayout title="Members">
      <div className="flex flex-col justify-between gap-8">
        <MemberFilter />
        <MemberTable tableData={dummymembers} />
      </div>
    </DashboardContentLayout>
  );
};

export default MemberPage;
