import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updatedFormInput, resetForm } from "@/slices/adoptionSlice";
import FrontApplicationLayout from "@/components/common/layout/FrontApplicationLayout";
import AdoptionSteps from "@/components/adoption/AdoptionSteps";
import AdoptionButton from "@/components/adoption/AdoptionButton";
import AdoptionStep1 from "@/components/adoption/form/AdoptionStep1";
import AdoptionStep2 from "@/components/adoption/form/AdoptionStep2";
import AdoptionStep3 from "@/components/adoption/form/AdoptionStep3";
import { ImCross } from "react-icons/im";

export const STEPS_OBJECT = [
  {
    id: "STEP 1",
    num: 1,
    title: "基本資料",
    component: <AdoptionStep1 />,
  },
  {
    id: "STEP 2",
    num: 2,
    title: "家庭狀況",
    component: <AdoptionStep2 />,
  },
  {
    id: "STEP 3",
    num: 3,
    title: "飼養經驗",
    component: <AdoptionStep3 />,
  },
];

const ApplicationPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const currStep = useSelector((state: RootState) => state.adoption.currStep);
  const dispatch = useDispatch();

  const handleCancelApplication = () => {
    dispatch(resetForm());
    router.push("/adoption");
  };

  useEffect(() => {
    if (!slug) return;
    const furkidId = parseInt(slug as string, 10);

    dispatch(updatedFormInput({ name: "furkidId", value: furkidId }));
  }, [slug]);

  return (
    <FrontApplicationLayout>
      <AdoptionSteps />
      <div className="h-[calc(100vh-260px)] w-11/12 mx-auto py-[30px] flex flex-col gap-8">
        <div className="w-full flex justify-end">
          <button
            onClick={handleCancelApplication}
            title="取消申請"
            className="text-wine-60 hover:text-wine"
          >
            <ImCross />
          </button>
        </div>
        <h1 className="text-2xl font-bold md:text-4xl">
          {STEPS_OBJECT[currStep - 1].title} |{" "}
          <span className="text-base">#{slug}</span>
        </h1>
        <div className="flex flex-col gap-4 md:min-h-[350px]">
          {STEPS_OBJECT[currStep - 1].component}
        </div>
        <AdoptionButton />
      </div>
    </FrontApplicationLayout>
  );
};

export default ApplicationPage;
