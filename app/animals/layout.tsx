import UserLayout from "@/components/layout/UserLayout";
import PageLayout from "@/components/layout/PageLayout";
import { ReactNode } from "react";
import AdoptionBtn from "@/components/animal/AnimalBtn";
const AnimalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserLayout>
      <PageLayout
        title="拯救與安置"
        description="幫助寵物透過耐心的領養計劃和充滿愛心的照顧找到溫馨家庭"
        router={<AdoptionBtn />}
      >
        <div className="">{children}</div>
      </PageLayout>
    </UserLayout>
  );
};

export default AnimalLayout;
