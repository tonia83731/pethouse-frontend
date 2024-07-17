import UserLayout from "@/components/layout/UserLayout";
import PageLayout from "@/components/layout/PageLayout";
import { ReactNode } from "react";
import AdoptionBtn from "@/components/animal/AnimalBtn";
const AnimalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserLayout>
      <PageLayout
        title="Rescue and Relocation"
        description="Focuses on the intricate process of rescuing and rehoming animals in need of adoption. It highlights the challenges and successes of these efforts, emphasizing the importance of finding safe and loving homes for rescued animals while addressing the logistical and emotional aspects of the adoption process."
        router={<AdoptionBtn />}
      >
        <div className="">{children}</div>
      </PageLayout>
    </UserLayout>
  );
};

export default AnimalLayout;
