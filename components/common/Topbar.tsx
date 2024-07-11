"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { TiThMenu } from "react-icons/ti";
import { usePathname } from "next/navigation";
import { dashboardNavlinks } from "./Sidebar";
const Topbar = () => {
  const [isToggle, setIsToggle] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <header className="bg-milk-tea h-[60px] leading-[60px]">
        <div className="w-11/12 h-full mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex gap-1 items-center text-white"
          >
            <Image
              src="/icons/logo_white.png"
              alt="Pethouse Logo"
              width={90}
              height={80}
              className="w-8 md:w-10"
            ></Image>
            <div className="font-nunito font-extrabold text-2xl md:text-3xl">
              PetHouse
            </div>
          </Link>
          <div className="flex gap-4">
            <button className="border border-wine text-wine px-4 h-[45px] flex justify-center items-center rounded-md hover:bg-wine hover:text-white hover:drop-shadow-md">
              Log Out
            </button>
            <button
              className="text-xl md:hidden text-white"
              onClick={() => setIsToggle(!isToggle)}
            >
              <TiThMenu />
            </button>
          </div>
        </div>
      </header>
      {isToggle && (
        <div className="fixed top-0 left-0 flex flex-col gap-12 w-full h-full bg-milk-tea z-[999]">
          <div className="h-[60px] leading-[60px] flex justify-between w-11/12 mx-auto">
            <Link href="/" className="flex gap-1 items-center">
              <Image
                src="/icons/logo_white.png"
                alt="Pethouse Logo"
                width={90}
                height={80}
                className="w-8 md:w-10"
              ></Image>
              <div className="font-nunito text-white font-extrabold text-2xl md:text-3xl">
                PetHouse
              </div>
            </Link>
            <button
              className="text-white text-xl "
              onClick={() => setIsToggle(!isToggle)}
            >
              <ImCross />
            </button>
          </div>
          <nav className="text-lg font-nunito font-extrabold md:flex md:gap-8">
            {dashboardNavlinks.map(({ id, title, href, icon, icon_active }) => {
              return (
                <Link href={href} className={`text-white text-xl`} key={id}>
                  <div
                    className={`flex gap-2 items-center p-6 xl:px-8 ${
                      pathname === href ? "bg-wine font-extrabold" : ""
                    }`}
                  >
                    <Image
                      src={pathname === href ? icon_active : icon}
                      alt="title"
                      width={30}
                      height={30}
                    ></Image>
                    <div className={``}>{title}</div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
};

export default Topbar;
