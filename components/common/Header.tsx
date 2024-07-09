import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="h-[60px]">
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
      </header>
      <div className=""></div>
    </>
  );
};

export default Header;
