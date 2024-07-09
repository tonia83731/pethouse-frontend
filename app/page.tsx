import Image from "next/image";
import { FaRegCopyright } from "react-icons/fa";
import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";
import AdoptStepsSection from "@/components/home/AdoptStepsSection";
import HelpSection from "@/components/home/HelpSection";
import ContectSection from "@/components/home/ContectSection";
import CollaborateSection from "@/components/home/CollaborateSection";
export default function Home() {
  return (
    <>
      <Header />
      <main className="mt-[30px] mb-[100px] md:mb-[120px]">
        <div className="flex flex-col gap-8 md:gap-12">
          <HeroSection />
          <div className="flex flex-col gap-8 md:gap-12">
            <AdoptStepsSection />
            <HelpSection />
            <ContectSection />
            <CollaborateSection />
          </div>
        </div>
      </main>
      <footer className="w-full h-[45px] leading-[45px] bg-dark text-white">
        <div className="w-11/12 mx-auto flex gap-2 justify-center items-center">
          <FaRegCopyright />
          <div className="">All rights reserved</div>
        </div>
      </footer>
    </>
  );
}
