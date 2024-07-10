"use client";
import Image from "next/image";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { GiKiwiBird } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { navlinks } from "@/data/navlinks";

const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <header className="h-[60px] leading-[60px] md:h-[90px] md:leading-[90px] flex justify-between items-center w-11/12 mx-auto sticky top-0 left-0 z-[999]">
        {/* Logo */}
        <Link href="/" className="flex gap-1 items-center">
          <Image
            src="/icons/logo.png"
            alt="Pethouse Logo"
            width={90}
            height={80}
            className="w-8 md:w-10"
          ></Image>
          <div className="font-nunito font-bold text-2xl md:text-3xl">
            PetHouse
          </div>
        </Link>
        <button className="text-xl md:hidden">
          <TiThMenu />
        </button>
        <nav className="hidden text-lg font-nunito font-medium md:flex md:gap-8">
          {navlinks.map(({ id, title, href }) => {
            return (
              <Link
                href={href}
                key={id}
                className={`${
                  pathname === href || pathname.includes(href)
                    ? "text-wine font-bold flex gap-1 items-center"
                    : "text-dark"
                }`}
              >
                <div
                  className={`${
                    pathname === href || pathname.includes(href)
                      ? "text-wine font-bold animate-bounce"
                      : "hidden"
                  }`}
                >
                  <GiKiwiBird />
                </div>
                <div className="">{title}</div>
              </Link>
            );
          })}
        </nav>
      </header>
      {/* <div className=""></div> */}
    </>
  );
};

export default Header;
