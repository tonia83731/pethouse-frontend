import Link from "next/link";
import { MdVolunteerActivism } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { TbBoneFilled } from "react-icons/tb";
const HelpSection = () => {
  const helper_datas = [
    {
      title: "成為志工",
      description:
        "加入我們的志工團隊，透過您的熱心協助，為需要幫助的人帶來改變。每一份力量都能讓社會變得更溫暖，期待您的參與！",
      icon: <MdVolunteerActivism />,
      href: "/volunteer",
    },
    {
      title: "捐款",
      description:
        "您的捐款將成為幫助弱勢群體的重要支持。每一筆善款都將用於推動公益計劃，攜手讓社會更加美好。",
      icon: <FaDonate />,
      href: "/donation/money",
    },
    {
      title: "寄送物資",
      description:
        "透過寄送物資，您可以直接幫助有需要的人。無論是衣物、食物還是生活必需品，都能讓愛心傳遞到最需要的地方。",
      icon: <TbBoneFilled />,
      href: "/donation/supplies",
    },
  ];
  return (
    <section className="" id="help">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-6">
        {helper_datas.map(({ title, description, icon, href }) => {
          return (
            <div
              className="border border-dark-40 rounded-lg p-4 flex flex-col justify-center items-center gap-2"
              key={title}
            >
              <div className="bg-wine text-white text-xl flex justify-center items-center w-10 h-10 rounded-full">
                {icon}
              </div>
              <h5 className="text-lg font-bold">{title}</h5>
              <p className="text-dark-60 text-sm md:min-h-[80px] lg:h-[60px]">
                {description}
              </p>
              <Link
                href={href}
                className="bg-dark text-white px-4 py-1 rounded-full hover:drop-shadow-lg hover:font-medium"
              >
                前往
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HelpSection;
