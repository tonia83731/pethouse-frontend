import UserLayout from "@/components/layout/UserLayout";
import PageLayout from "@/components/layout/PageLayout";
import { ReactNode } from "react";

const StatisticsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserLayout>
      <PageLayout
        title="數據統計"
        description="此頁面展示了動物救援和領養努力的統計分析，通過條形圖和表格展示數據。它探討了領養率，救援趨勢和人口統計洞察，通過量化分析提供了改善動物福利努力的全面視圖。"
      >
        <div className="">{children}</div>
      </PageLayout>
    </UserLayout>
  );
};
export default StatisticsLayout;
