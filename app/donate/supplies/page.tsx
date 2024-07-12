import SuppliesTable from "@/components/table/SuppliesTable";
import { dummysuppliesdata } from "@/data/dummy/dummysuppliesdata";

const DonateSuppliesPage = () => {
  return (
    <div className="w-full">
      <SuppliesTable tableData={dummysuppliesdata} />
    </div>
  );
};

export default DonateSuppliesPage;
