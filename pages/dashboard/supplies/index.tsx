import DashboardLayout from "@/components/common/DashboardLayout";
import SuppliesForm from "@/components/dashbord-forms/SuppliesForm";
const SuppliesPage = () => {
  return (
    <DashboardLayout title="尋找物資">
      <SuppliesForm />
    </DashboardLayout>
  );
};

export default SuppliesPage;
