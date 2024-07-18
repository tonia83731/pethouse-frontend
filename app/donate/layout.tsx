import { ReactNode } from "react";
import DonateRouter from "@/components/donate/DonateRouter";
import UserLayout from "@/components/layout/UserLayout";
import PageLayout from "@/components/layout/PageLayout";
import DonateThanks from "@/components/donate/DonateThanks";
const DonateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserLayout>
      <PageLayout
        title="愛心捐贈"
        description="'愛心捐贈'計劃旨在為動物收容所募集所需物資，提供食物、藥品、玩具等，確保動物們獲得最佳照顧，幫助牠們找到永遠的家。"
        router={<DonateRouter />}
        extraChildren={<DonateThanks />}
      >
        {children}
      </PageLayout>
    </UserLayout>
  );
};

export default DonateLayout;
