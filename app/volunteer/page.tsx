import VolunteerTable from "@/components/table/VolunteerTable";
import { dummyvolunteerdata } from "@/data/dummy/dummyvolunteerdata";
const VolunteerPage = () => {
  return (
    <div className="w-full">
      <VolunteerTable tableData={dummyvolunteerdata} />
    </div>
  );
};

export default VolunteerPage;
