import { ReactNode } from "react";

type DashboardContentProps = {
  title: string;
  children: ReactNode;
};

const DashboardContentLayout = ({ title, children }: DashboardContentProps) => {
  return (
    <div className="w-10/12 h-full mx-auto py-8 md:py-12 flex flex-col gap-12 md:gap-20">
      <h1 className="font-extrabold font-nunito text-4xl text-center">
        {title}
      </h1>
      <div className="">{children}</div>
    </div>
  );
};
export default DashboardContentLayout;
