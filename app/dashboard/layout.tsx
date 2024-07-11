import Sidebar from "@/components/common/Sidebar";
import Topbar from "@/components/common/Topbar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="md:grid md:grid-cols-5 lg:grid-cols-6 md:bg-milk-tea min-h-screen">
      <div className="hidden md:block md:col-span-1">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <Topbar />
      </div>
      <main className="md:col-start-2 md:col-span-4 lg:col-span-5 w-full h-full">
        <div className="md:bg-white w-full h-full md:rounded-tl-[120px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
