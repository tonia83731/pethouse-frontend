import { useFormContext } from "@/context/FormContext";

const AdoptionButton = () => {
  const { currStep, handleStepClick } = useFormContext();
  return (
    <div
      className={`flex items-center ${
        currStep === 1 ? "justify-end" : "justify-between"
      }`}
    >
      {currStep > 1 && (
        <button
          className="font-medium py-1 px-6 bg-dark-40 text-white rounded-lg hover:drop-shadow-lg"
          onClick={() => handleStepClick("prev")}
        >
          上一頁
        </button>
      )}
      {currStep < 3 && (
        <button
          className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg"
          onClick={() => handleStepClick("next")}
        >
          下一頁
        </button>
      )}
      {currStep === 3 && (
        <button
          className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg"
          // onClick={() => setCurrStep(currStep + 1)}
        >
          提交
        </button>
      )}
    </div>
  );
};

export default AdoptionButton;
