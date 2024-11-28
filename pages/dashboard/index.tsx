import { useState } from "react";
import Image from "next/image";
import PethouseLogo from "@/public/icons/Logo.svg";
import BackstageImg from "@/public/images/backstageImg.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const DashboardPage = () => {
  const [passwordShowed, setPasswordShowed] = useState(false);
  return (
    <main className="mx-auto w-11/12 lg:w-full lg:max-w-[900px] flex flex-col gap-[40px] pt-[120px] pb-6">
      <div className="text-dark w-full flex justify-center">
        <PethouseLogo className="w-[150px]" />
      </div>
      <div className="grid grid-cols-[400px_1fr] items-center gap-6">
        <Image
          src={BackstageImg}
          alt="Backstage Image"
          width={400}
          height={400}
        ></Image>
        <form className="flex flex-col gap-8">
          <h5 className="font-bold text-2xl text-center">後台登入</h5>
          <div className="flex flex-col gap-4">
            <label
              htmlFor="email"
              className="w-full h-12 px-4 leading-12 rounded-lg border-0 bg-skin-60 text-wine"
            >
              <input
                id="email"
                type="text"
                placeholder="Email"
                className="placeholder:text-dark-40 w-full h-12 bg-transparent"
              />
            </label>
            <label
              htmlFor="password"
              className="relative w-full h-12 px-4 leading-12 rounded-lg border-0 bg-skin-60 text-wine"
            >
              <input
                id="password"
                type={passwordShowed ? "text" : "password"}
                placeholder="Password"
                className="placeholder:text-dark-40 w-full h-12 bg-transparent"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                onClick={() => setPasswordShowed(!passwordShowed)}
              >
                {passwordShowed ? <FaEyeSlash /> : <FaEye />}
              </button>
            </label>
          </div>
          <button className="w-full bg-wine text-white rounded-lg h-10 hover:drop-shadow-md hover:font-bold">
            Enter
          </button>
        </form>
      </div>
    </main>
  );
};

export default DashboardPage;
