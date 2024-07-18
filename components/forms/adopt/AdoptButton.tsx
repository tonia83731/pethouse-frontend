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
        上一頁
      </button>
      <button
        onClick={increaseSteps}
        className={`${
          currStep === 3 ? "hidden" : ""
        } rounded-full bg-taro px-12 py-2 hover:drop-shadow-md`}
      >
        下一頁
      </button>
      <button
        className={`${
          currStep === 3 ? "" : "hidden"
        } rounded-full bg-taro px-12 py-2 hover:drop-shadow-md`}
      >
        提交
      </button>
    </div>
  );
};
export default AdoptButton;
