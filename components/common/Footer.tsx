import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full h-[45px] leading-[45px] bg-dark text-white">
      <div className="w-11/12 mx-auto flex gap-2 justify-center items-center">
        <FaRegCopyright />
        <div className="">All rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
