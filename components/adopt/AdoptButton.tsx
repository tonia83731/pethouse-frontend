"use client";
import { useStepStore } from "@/store/useStepStore";
const AdoptButton = () => {
  const { currStep, increaseSteps, decreseSteps } = useStepStore();
  return (
    <div
      className={`flex items-center gap-2 ${
        currStep === 1 ? "justify-end" : "justify-between"
      }`}
    >
      <button
        onClick={decreseSteps}
        className={`${
          currStep === 1 ? "hidden" : ""
        } rounded-full bg-dirt px-12 py-2 hover:drop-shadow-md`}
      >
        Prev
      </button>
      <button
        onClick={increaseSteps}
        className={`${
          currStep === 3 ? "hidden" : ""
        } rounded-full bg-taro px-12 py-2 hover:drop-shadow-md`}
      >
        Next
      </button>
      <button
        className={`${
          currStep === 3 ? "" : "hidden"
        } rounded-full bg-taro px-12 py-2 hover:drop-shadow-md`}
      >
        Submit
      </button>
    </div>
  );
};
export default AdoptButton;
