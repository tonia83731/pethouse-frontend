import FrontApplicationLayout from "@/components/common/FrontApplicationLayout";
import { useFormContext, steps_btn } from "@/context/FormContext";
import AdoptionSteps from "@/components/adoption/AdoptionSteps";
import AdoptionButton from "@/components/adoption/AdoptionButton";
import AdoptionStep1 from "@/components/adoption/form/AdoptionStep1";
import AdoptionStep2 from "@/components/adoption/form/AdoptionStep2";
import AdoptionStep3 from "@/components/adoption/form/AdoptionStep3";

const ApplicationPage = () => {
  const { currStep } = useFormContext();
  return (
    <FrontApplicationLayout>
      <AdoptionSteps />
      <div className="h-[calc(100vh-260px)] w-11/12 mx-auto pt-[90px] pb-[30px] flex flex-col gap-8">
        <h1 className="text-2xl font-bold md:text-4xl">
          {steps_btn[currStep - 1].title} |{" "}
          <span className="text-base">#ANIMALID</span>
        </h1>
        <div className="flex flex-col gap-4 md:min-h-[350px]">
          {currStep === 1 && <AdoptionStep1 />}
          {currStep === 2 && <AdoptionStep2 />}
          {currStep === 3 && <AdoptionStep3 />}
        </div>
        <AdoptionButton />
      </div>
    </FrontApplicationLayout>
  );
};

export default ApplicationPage;
