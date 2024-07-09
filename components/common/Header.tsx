import Image from "next/image";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";

const Header = () => {
  return (
    <>
      <header className="h-[50px] leading-[50px] md:h-[60px] md:leading-[60px] flex justify-between items-center w-11/12 mx-auto sticky top-0 left-0 z-[999]">
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
        <button className="text-xl">
          <TiThMenu />
        </button>
      </header>
      <div className=""></div>
    </>
  );
};

export default Header;
