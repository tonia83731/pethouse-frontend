import Image from "next/image";
import PethouseLogo from "@/public/icons/Logo.svg";
import BackstageImg from "@/public/images/backstageImg.png";
const DashboardPage = () => {
  return (
    <main className="mx-auto w-11/12 lg:w-full lg:max-w-[900px] flex flex-col gap-[40px] pt-[120px] pb-6">
      <div className="text-dark w-full flex justify-center">
        <PethouseLogo className="w-[150px]" />
      </div>
      <div className="grid grid-cols-[400px_1fr] gap-6">
        <Image
          src={BackstageImg}
          alt="Backstage Image"
          width={400}
          height={400}
        ></Image>
        <form className=""></form>
      </div>
    </main>
  );
};

export default DashboardPage;
