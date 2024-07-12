import DashboardContentLayout from "@/components/layout/DashboardContentLayout";
import ProfileForm from "@/components/forms/ProfileForm";
const DashboardPage = () => {
  return (
    <DashboardContentLayout title="Profile">
      <form className="flex flex-col gap-12">
        <ProfileForm />
      </form>
    </DashboardContentLayout>
  );
};

export default DashboardPage;
