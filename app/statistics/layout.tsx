import UserLayout from "@/components/common/UserLayout";
import PageLayout from "@/components/PageLayout";

const StatisticsLayout = () => {
  return (
    <UserLayout>
      <PageLayout
        title="Statistics"
        description="This page presents statistical analyses of animal rescue and adoption efforts, showcasing data through bar graphs and tables. It explores adoption rates, rescue trends, and demographic insights, providing a comprehensive view of efforts to improve animal welfare through quantitative analysis"
      >
        <div className=""></div>
      </PageLayout>
    </UserLayout>
  );
};
export default StatisticsLayout;
