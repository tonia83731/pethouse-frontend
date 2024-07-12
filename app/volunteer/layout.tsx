import UserLayout from "@/components/common/UserLayout";
import PageLayout from "@/components/PageLayout";
import { ReactNode } from "react";
const VolunteerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserLayout>
      <PageLayout
        title="Volunteer"
        description="Highlights the rewarding experience of helping animals in need. This role involves caring for sheltered animals, assisting with adoptions, and supporting rescue operations. Volunteers contribute their time and compassion to improve animal welfare, making a meaningful impact on their lives and well-being"
      >
        {children}
      </PageLayout>
    </UserLayout>
  );
};

export default VolunteerLayout;
