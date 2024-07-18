"use client";
import DashboardContentLayout from "@/components/layout/DashboardContentLayout";
import AdoptCard from "@/components/card/AdoptCard";
import { dummyadoptcard } from "@/data/dummy/dummyadoptcard";
import AnimalForm from "@/components/forms/AnimalForm";
const AdoptListPage = () => {
  return (
    <DashboardContentLayout title="Adoption">
      <div className="flex flex-col gap-8">
        <AnimalForm />
        <div className="w-full h-[2px] border-t border-dotted border-wine"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyadoptcard.map((props) => {
            return <AdoptCard {...props} key={props.user_id} />;
          })}
        </div>
      </div>
    </DashboardContentLayout>
  );
};

export default AdoptListPage;
