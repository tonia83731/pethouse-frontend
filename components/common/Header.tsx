"use client";
import Image from "next/image";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { GiKiwiBird } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { navlinks } from "@/data/navlinks";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
const Header = () => {
  const pathname = usePathname();
  const [isScrolledPass, setIsScrollPass] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;

      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

      if (scrollPercent > 50) setIsScrollPass(true);
      else setIsScrollPass(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <>
      <header
        className={`h-[60px] leading-[60px] md:h-[90px] md:leading-[90px] sticky top-0 left-0 z-[888] ${
          (pathname === "/" && isScrolledPass) || pathname !== "/"
            ? "bg-white"
            : "bg-skin"
        }`}
      >
        {/* w-11/12 mx-auto */}
        <div className="w-11/12 h-full mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex gap-1 items-center">
            <Image
              src="/icons/logo.png"
              alt="Pethouse Logo"
              width={90}
              height={80}
              className="w-8 md:w-10"
            ></Image>
            <div className="font-nunito font-extrabold text-2xl md:text-3xl">
              PetHouse
            </div>
          </Link>
          <button
            className="text-xl md:hidden"
            onClick={() => setIsToggle(!isToggle)}
          >
            <TiThMenu />
          </button>
          <nav className="hidden text-lg font-nunito font-bold md:flex md:gap-8">
            {navlinks.map(({ id, title, href }) => {
              return (
                <Link
                  href={href}
                  key={id}
                  className={`${
                    pathname === href || pathname.includes(href)
                      ? "text-wine font-extrabold flex gap-1 items-center"
                      : "text-dark"
                  }`}
                >
                  <div
                    className={`${
                      pathname === href || pathname.includes(href)
                        ? "text-wine font-extrabold animate-bounce"
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
        </div>
      </header>
      {isToggle && (
        <div className="fixed top-0 left-0 flex flex-col gap-12 w-full h-full bg-skin z-[999]">
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
              className="text-white text-xl"
              onClick={() => setIsToggle(!isToggle)}
            >
              <ImCross />
            </button>
          </div>
          <nav className="flex flex-col">
            {navlinks.map(({ id, title, href }) => {
              return (
                <Link
                  href={href}
                  key={id}
                  className={`${
                    pathname === href || pathname.includes(href)
                      ? "bg-wine text-white font-bold flex gap-4 items-center"
                      : "text-dark"
                  } px-8 py-4 text-lg`}
                >
                  <div
                    className={`${
                      pathname === href || pathname.includes(href)
                        ? "text-white font-bold animate-bounce"
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
        </div>
      )}
    </>
  );
};

export default Header;
