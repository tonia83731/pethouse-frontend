import DashboardLayout from "@/components/common/DashboardLayout";
import CollaborationForm from "@/components/dashbord-forms/CollaborationForm";
const CollaborationPage = () => {
  return (
    <DashboardLayout title="合作夥伴">
      <CollaborationForm />
      <div className=""></div>
    </DashboardLayout>
  );
};

export default CollaborationPage;
