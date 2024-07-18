import { FaRegCopyright } from "react-icons/fa";
import dayjs from "dayjs";
import Link from "next/link";
const Footer = () => {
  const currentYear = dayjs().format("YYYY");
  return (
    <footer className="w-full h-[45px] leading-[45px] bg-dark text-white text-xs md:text-base">
      <div className="w-11/12 h-full mx-auto flex gap-1 md:gap-4 justify-center items-center">
        <div className="flex gap-2 justify-center items-center">
          <FaRegCopyright />
          <div className="">All rights reserved, {currentYear}</div>
        </div>
        <div className="">|</div>
        <Link href="/dashboard" className="hover:italic hover:underline">
          前往Dashboard
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
