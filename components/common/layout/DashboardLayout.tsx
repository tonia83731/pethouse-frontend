import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { Bounce, ToastContainer } from "react-toastify";
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
import PethouseShortLogo from "@/public/icons/ShortLogo.svg";

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
  const { pathname, push } = useRouter();
  const handleLogoutClick = () => {
    deleteCookie("staffToken");
    push({
      pathname: "/dashboard",
    });
  };

  return (
    <div className="w-full h-full min-h-screen grid grid-cols-[60px_2fr] lg:grid-cols-[200px_2fr] bg-skin">
      <header className="relative w-[60px] lg:w-[200px] h-full min-h-screen pt-12 pb-6 text-white flex flex-col justify-between">
        <nav className="flex flex-col gap-8">
          <Link
            href="/dashboard/adoption"
            className="text-white w-full flex justify-center"
          >
            <PethouseLogo className="hidden lg:block w-[150px]" />
            <PethouseShortLogo className="lg:hidden w-[48px] h-[48px]" />
          </Link>
          <div className="flex flex-col">
            {back_nav_link.map(({ id, href, title, icon, icon_active }) => {
              return (
                <Link
                  href={href}
                  key={id}
                  className={`flex items-center justify-center lg:justify-start gap-2 text-xl h-[60px] leading-[45px] lg:px-6 ${
                    pathname === href
                      ? "bg-wine hover:text-white"
                      : "hover:text-wine"
                  }`}
                >
                  <div className="">
                    {pathname === href ? icon_active : icon}
                  </div>
                  <div className="hidden lg:block">{title}</div>
                </Link>
              );
            })}
          </div>
        </nav>
        <button
          onClick={handleLogoutClick}
          className="flex items-center justify-center lg:justify-start gap-2 text-xl h-[60px] leading-[45px] lg:px-6 hover:text-wine"
        >
          <AiOutlineLogout />
          <div className="hidden lg:block">登出</div>
        </button>
      </header>
      <main className="w-full h-screen overflow-y-auto bg-white rounded-tl-[60px]">
        <div className="w-9/12 max-w-[1280px] mx-auto pt-[60px] flex flex-col gap-8">
          {title && <h1 className="font-bold text-2xl">{title}</h1>}
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </main>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};

export default DashboardLayout;
