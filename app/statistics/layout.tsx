import UserLayout from "@/components/layout/UserLayout";
import PageLayout from "@/components/layout/PageLayout";
import { ReactNode } from "react";

const StatisticsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserLayout>
      <PageLayout
        title="Statistics"
        description="This page presents statistical analyses of animal rescue and adoption efforts, showcasing data through bar graphs and tables. It explores adoption rates, rescue trends, and demographic insights, providing a comprehensive view of efforts to improve animal welfare through quantitative analysis"
      >
        <div className="">{children}</div>
      </PageLayout>
    </UserLayout>
  );
};
export default StatisticsLayout;
