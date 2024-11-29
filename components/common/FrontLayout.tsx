import { ReactNode } from "react";
import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa";
import FrontHeader from "./header/FrontHeader";

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
  return (
    <>
      <FrontHeader />
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
