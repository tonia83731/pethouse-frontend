import UserLayout from "@/components/common/UserLayout";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { ReactNode } from "react";
const AdoptionBtn = () => {
  return (
    <div className="flex justify-center items-center">
      <Link
        href="/adopt"
        className="bg-heart text-white text-large px-4 py-2 rounded-full"
      >
        Adopting
      </Link>
    </div>
  );
};
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
