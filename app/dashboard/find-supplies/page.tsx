import DashboardContentLayout from "@/components/layout/DashboardContentLayout";
import FindSuppliesForm from "@/components/forms/FindSuppliesForm";
import FindSuppliesTable from "@/components/table/FindSuppliesTable";
import { dummysuppliesdata } from "@/data/dummy/dummysuppliesdata";
const FindSuppliesPage = () => {
  return (
    <DashboardContentLayout title="Find Supplies">
      <div className="flex flex-col justify-between gap-8">
        <FindSuppliesForm />
        <div className="w-full border-t-2 border-dotted border-wine "></div>
        <FindSuppliesTable tableData={dummysuppliesdata} />
      </div>
    </DashboardContentLayout>
  );
};

export default FindSuppliesPage;
