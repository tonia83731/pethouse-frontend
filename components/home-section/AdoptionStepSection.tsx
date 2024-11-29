import Image from "next/image";
import AdoptionStep from "@/public/images/adoptionStep.jpg";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaPersonCircleCheck } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { FaHome } from "react-icons/fa";
const AdoptionStepSection = () => {
  const adoption_steps = [
    {
      step: 1,
      title: "評估情況",
      description:
        "我們會了解每個家庭的狀況，確保他們擁有愛心，準備好接納孩子並與他們一起成長。",
      logo: <IoAnalyticsOutline />,
    },
    {
      step: 2,
      title: "審核文件",
      description:
        "處理一些簡單的文件確認，確保每個細節都對孩子好，讓他們在這裡找到真正的家。",
      logo: <FaPersonCircleCheck />,
    },
    {
      step: 3,
      title: "配對毛孩",
      description:
        "我們會找到最適合的孩子，讓他們能在充滿愛的家庭裡，感受到被珍惜和關心。",
      logo: <MdOutlinePets />,
    },
    {
      step: 4,
      title: "擁抱溫暖",
      description:
        "孩子終於來到新家，開始他們幸福的新生活，這裡將成為他們永遠的避風港。",
      logo: <FaHome />,
    },
  ];
  return (
    <section
      className="md:grid md:grid-cols-[1fr_1.5fr] gap-8 md:h-[320px]"
      id="adoption"
    >
      <Image
        src={AdoptionStep}
        alt="adoption-step"
        width={1920}
        height={2880}
        className="w-full h-full aspect-square object-cover object-center hidden md:flex"
      ></Image>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {adoption_steps.map(({ title, description, step, logo }) => {
          return (
            <div
              className="bg-skin-40 rounded-lg p-4 w-full h-full relative"
              key={step}
            >
              <div className="relative z-20">
                <div className="flex flex-col gap-0.5">
                  <p className="font-light bg-heart w-fit rounded-lg text-white px-2">
                    STEP {step}
                  </p>
                  <h5 className="text-lg font-bold">{title}</h5>
                </div>
                <p className="text-sm text-dark-60">{description}</p>
              </div>
              <div className="text-[90px] text-white absolute z-10 bottom-1 right-1 opacity-50">
                {logo}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AdoptionStepSection;
