"use client";
import DashboardContentLayout from "@/components/layout/DashboardContentLayout";
import AdoptCard from "@/components/card/AdoptCard";
import { dummyadoptcard } from "@/data/dummy/dummyadoptcard";

const AdoptListPage = () => {
  return (
    <DashboardContentLayout title="Adoption">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyadoptcard.map((props) => {
          return <AdoptCard {...props} key={props.user_id} />;
        })}
      </div>
    </DashboardContentLayout>
  );
};

export default AdoptListPage;
