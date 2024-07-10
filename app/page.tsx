import Image from "next/image";
import { FaRegCopyright } from "react-icons/fa";
import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";
import AdoptStepsSection from "@/components/home/AdoptStepsSection";
import HelpSection from "@/components/home/HelpSection";
import ContectSection from "@/components/home/ContectSection";
import CollaborateSection from "@/components/home/CollaborateSection";
import UserLayout from "@/components/common/UserLayout";

export default function Home() {
  return (
    <UserLayout>
      <div className="flex flex-col gap-8 md:gap-12">
        <HeroSection />
        <div className="flex flex-col gap-8 md:gap-12">
          <AdoptStepsSection />
          <HelpSection />
          <ContectSection />
          <CollaborateSection />
        </div>
      </div>
    </UserLayout>
  );
}
