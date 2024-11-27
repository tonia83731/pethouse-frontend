import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PiDog } from "react-icons/pi";
import { PiDogFill } from "react-icons/pi";
import { MdOutlineHandshake } from "react-icons/md";
import { MdHandshake } from "react-icons/md";
import { PiBoneBold } from "react-icons/pi";
import { PiBoneFill } from "react-icons/pi";
import { MdOutlineVolunteerActivism } from "react-icons/md";
import { MdVolunteerActivism } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import PethouseLogo from "@/public/icons/Logo.svg";
const back_nav_link = [
  {
    id: "d-adoption",
    href: "/dashboard/adoption",
    title: "毛孩列表",
    icon: <PiDog />,
    icon_active: <PiDogFill />,
  },
  {
    id: "d-supplies",
    href: "/dashboard/supplies",
    title: "尋找物資",
    icon: <PiBoneBold />,
    icon_active: <PiBoneFill />,
  },
  {
    id: "d-volunteers",
    href: "/dashboard/volunteers",
    title: "尋找志工",
    icon: <MdOutlineVolunteerActivism />,
    icon_active: <MdVolunteerActivism />,
  },
  {
    id: "d-collaboration",
    href: "/dashboard/collaboration",
    title: "合作夥伴",
    icon: <MdOutlineHandshake />,
    icon_active: <MdHandshake />,
  },
];
const DashboardLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => {
  const { pathname } = useRouter();
  return (
    <div className="w-full h-full min-h-screen grid grid-cols-[200px_2fr] bg-skin">
      <header className="w-[200px] h-full min-h-screen pt-12 pb-6 text-white flex flex-col justify-between">
        <nav className="flex flex-col gap-8">
          <Link
            href="/dashboard/adoption"
            className="text-white w-full flex justify-center"
          >
            <PethouseLogo className="w-[150px]" />
          </Link>
          <div className="flex flex-col">
            {back_nav_link.map(({ id, href, title, icon, icon_active }) => {
              return (
                <Link
                  href={href}
                  key={id}
                  className={`flex items-center gap-2 text-xl h-[60px] leading-[45px] px-6 hover:text-wine ${
                    pathname === href ? "bg-wine hover:text-white" : ""
                  }`}
                >
                  <div className="">
                    {pathname === href ? icon_active : icon}
                  </div>
                  <div className="">{title}</div>
                </Link>
              );
            })}
          </div>
        </nav>
        <button className="flex items-center gap-2 text-xl h-[60px] leading-[45px] px-6 hover:text-wine">
          <AiOutlineLogout />
          <div className="">登出</div>
        </button>
      </header>
      <main className="w-full h-full min-h-screen bg-white rounded-tl-[60px]">
        <div className="w-9/12 max-w-[1280px] mx-auto pt-[60px] flex flex-col gap-8">
          {title && <h1 className="font-bold text-2xl">{title}</h1>}
          <div className="">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
