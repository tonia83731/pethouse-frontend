import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { handleSteps } from "@/slices/adoptionSlice";

const AdoptionButton = () => {
  const currStep = useSelector((state: RootState) => state.adoption.currStep);
  const dispatch = useDispatch();
  return (
    <div
      className={`flex items-center ${
        currStep === 1 ? "justify-end" : "justify-between"
      }`}
    >
      {currStep > 1 && (
        <button
          className="font-medium py-1 px-6 bg-dark-40 text-white rounded-lg hover:drop-shadow-lg"
          onClick={() => dispatch(handleSteps("prev"))}
        >
          上一頁
        </button>
      )}
      {currStep < 3 && (
        <button
          className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg"
          onClick={() => dispatch(handleSteps("next"))}
        >
          下一頁
        </button>
      )}
      {currStep === 3 && (
        <button className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg">
          提交
        </button>
      )}
    </div>
  );
};

export default AdoptionButton;
