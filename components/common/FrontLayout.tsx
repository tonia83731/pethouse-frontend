import { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegCopyright } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import PethouseLogo from "@/public/icons/logo.svg";

const nav_link = [
  {
    id: "adoption",
    href: "/adoption",
    title: "拯救與安置",
  },
  {
    id: "donation",
    href: "/donation/supplies",
    title: "愛心捐贈",
  },
  {
    id: "volunteer",
    href: "/volunteer",
    title: "成為志工",
  },
  {
    id: "statistic",
    href: "/statistics",
    title: "數據統計",
  },
];

const FrontLayout = ({
  children,
  includeTitle = true,
  title,
  description,
}: {
  children: ReactNode;
  includeTitle?: boolean;
  title?: string;
  description?: string;
}) => {
  const [navToggle, setNavToggle] = useState(false);
  const { pathname } = useRouter();
  return (
    <>
      <header className="fixed top-0 left-0 z-[100] w-full h-[60px] leading-[60px] md:h-[90px] md:leading-[90px]">
        {/* mobile */}
        <div className="relative md:hidden">
          <div className="px-4 flex justify-between items-center gap-8">
            <Link href="/" className="text-dark h-[60px] flex items-center">
              <PethouseLogo className="w-[120px]" />
            </Link>
            <button
              className="text-base"
              onClick={() => setNavToggle(!navToggle)}
            >
              {navToggle ? <ImCross /> : <GiHamburgerMenu />}
            </button>
          </div>
          <div
            className={`absolute top-0 ${
              navToggle ? "left-0" : "-left-full"
            } transition bg-skin text-white w-[200px] h-full min-h-screen flex flex-col font-medium gap-4`}
          >
            <Link
              href="/"
              className="text-white px-4 h-[60px] flex items-center"
            >
              <PethouseLogo className="w-[120px]" />
            </Link>
            <nav className="flex flex-col">
              {nav_link.map(({ id, href, title }) => {
                return (
                  <Link
                    href={href}
                    key={id}
                    className={`h-[60px] px-4 hover:text-wine ${
                      pathname === href && "bg-wine font-bold"
                    }`}
                  >
                    {title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
        {/* desktop */}
        <div className="w-11/12 mx-auto hidden md:flex justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-1 text-dark">
            <PethouseLogo className="w-[120px]" />
          </Link>
          <nav className="flex items-center gap-4 font-medium">
            {nav_link.map(({ id, href, title }) => {
              return (
                <Link
                  href={href}
                  key={id}
                  className={`hover:text-wine ${
                    pathname === href && "text-wine font-bold"
                  }`}
                >
                  {title}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-11/12 xl:w-full xl:max-w-[1280px] flex flex-col gap-[40px] pt-[120px] pb-6">
        {includeTitle && (
          <div className="flex flex-col gap-3 items-center w-9/12 mx-auto">
            <h1 className="text-xl md:text-3xl font-bold">{title}</h1>
            <p className="text-sm md:text-base font-medium text-dark-60 text-center">
              {description}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-[40px] md:gap-[80px]">{children}</div>
      </main>
      <footer className="bg-dark text-white h-[60px] leading-[60px]">
        <div className="w-11/12 mx-auto flex justify-center items-center gap-4">
          <div className="flex items-center gap-1">
            <FaRegCopyright />
            <p className="">All rights reserved</p>
          </div>
          <div className="">|</div>
          <div className="">
            <Link
              href="/dashboard"
              className="hover:font-bold hover:underline hover:underline-offset-2"
            >
              後台入口
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FrontLayout;
