import Image from "next/image";
import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";
import AdoptStepsSection from "@/components/home/AdoptStepsSection";
export default function Home() {
  return (
    <>
      <Header />
      <main className="">
        <HeroSection />
        {/* container max-w-[1280px] px-4 lg:px-0 */}
        <div className="flex flex-col gap-4 md:gap-8">
          <AdoptStepsSection />
          <section className="w-full h-[648px] md:h-[560px]" id=""></section>
          <section className="w-full h-[648px] md:h-[560px]"></section>
          <section className="w-full h-[648px] md:h-[560px]"></section>
        </div>
      </main>
    </>
  );
}
