import DashboardContentLayout from "@/components/dashboard/DashboardContentLayout";
import ProfileForm from "@/components/dashboard/ProfileForm";
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
