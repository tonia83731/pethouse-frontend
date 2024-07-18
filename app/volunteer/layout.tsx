import UserLayout from "@/components/layout/UserLayout";
import PageLayout from "@/components/layout/PageLayout";
import { ReactNode } from "react";
const VolunteerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserLayout>
      <PageLayout
        title="成為志工"
        description="幫助有需要的動物。這個角色涉及照顧庇護中的動物，協助領養，並支持救援行動。志願者貢獻他們的時間和同情心來改善動物福利，對他們的生活和健康產生深遠的影響。"
      >
        {children}
      </PageLayout>
    </UserLayout>
  );
};

export default VolunteerLayout;
