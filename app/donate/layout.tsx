import { ReactNode } from "react";
import DonateRouter from "@/components/donate/DonateRouter";
import UserLayout from "@/components/common/UserLayout";
import PageLayout from "@/components/PageLayout";
import DonateThanks from "@/components/donate/DonateThanks";
const DonateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserLayout>
      <PageLayout
        title="Donate"
        description="Discover the vital role local animal shelters play in rescuing and
              caring for abandoned pets. Your donation helps provide food,
              medical care, and a safe environment for these animals, giving
              them a second chance at life. Join us in making a difference and
              supporting these shelters today."
        router={<DonateRouter />}
        extraChildren={<DonateThanks />}
      >
        {children}
      </PageLayout>
    </UserLayout>
  );
};

export default DonateLayout;
