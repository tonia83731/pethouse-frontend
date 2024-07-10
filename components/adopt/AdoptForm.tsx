"use client";
import { useStepStore } from "@/store/useStepStore";
import AdoptForm1 from "./AdoptForm1";
import AdoptForm2 from "./AdoptForm2";
import AdoptForm3 from "./AdoptForm3";
const AdoptForm = () => {
  const { currStep } = useStepStore();
  return (
    <div>
      {currStep === 1 && <AdoptForm1 />}
      {currStep === 2 && <AdoptForm2 />}
      {currStep === 3 && <AdoptForm3 />}
    </div>
  );
};

export default AdoptForm;
