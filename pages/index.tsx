import FrontLayout from "@/components/common/FrontLayout";
import AdoptionSection from "@/components/home-section/AdoptionSection";
import AdoptionStepSection from "@/components/home-section/AdoptionStepSection";
import HelpSection from "@/components/home-section/HelpSection";
export default function Home() {
  return (
    <FrontLayout includeTitle={false}>
      <AdoptionSection />
      <AdoptionStepSection />
      <HelpSection />
    </FrontLayout>
  );
}
