"use client";
import { useStepStore } from "@/store/useStepStore";
export const adoptSteps = [
  {
    id: "STEP1",
    title: "Basic Info.",
  },
  {
    id: "STEP2",
    title: "Family Info.",
  },
  {
    id: "STEP1",
    title: "Experience",
  },
  {
    id: "STEP4",
    title: "Success",
  },
];
const AdoptSteps = () => {
  const { currStep } = useStepStore();
  return (
    <div className="w-10/12 h-full mx-auto">
      <div className="flex gap-4 items-center justify-center h-full md:flex-col md:gap-12 md:items-start md:w-3/5 md:mx-auto">
        {adoptSteps.map(({ id, title }, index) => {
          return (
            <div
              className="text-white text-lg md:text-xl md:flex md:gap-6"
              key={id}
            >
              <div
                className={`w-12 h-12 md:w-16 md:h-16 border-2 border-white rounded-full flex justify-center items-center ${
                  currStep === index + 1 ? "bg-taro" : ""
                }`}
              >
                0{index + 1}
              </div>
              <div className="hidden md:flex md:flex-col gap-1">
                <p className="text-xs font-light">{id}</p>
                <h5 className="font-medium text-2xl">{title}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AdoptSteps;
