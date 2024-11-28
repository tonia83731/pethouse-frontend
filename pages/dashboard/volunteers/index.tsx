import DashboardLayout from "@/components/common/DashboardLayout";
import VolunteerForm from "@/components/dashbord-forms/VolunteerForm";
const VolunteerPage = () => {
  return (
    <DashboardLayout title="尋找志工">
      <VolunteerForm />
    </DashboardLayout>
  );
};

export default VolunteerPage;
