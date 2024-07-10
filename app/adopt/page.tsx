import Image from "next/image";
import UserLayout from "@/components/common/UserLayout";
import AdoptSteps from "@/components/adopt/AdoptSteps";
import AdoptButton from "@/components/adopt/AdoptButton";
import AdoptForm from "@/components/adopt/AdoptForm";
const AdoptPage = () => {
  return (
    <UserLayout extraClass="h-full mb-[0px] md:grid md:grid-cols-3">
      <div className="w-full h-[200px] relative md:h-[calc(100vh-135px)]">
        <Image
          src="/images/adopt_form_hero_mobile.jpg"
          alt="adopt mobile"
          width={960}
          height={540}
          className="w-full h-full object-cover object-center md:hidden"
        ></Image>
        <Image
          src="/images/adopt_form_hero.jpg"
          alt="adopt desktop"
          width={2400}
          height={3600}
          className="w-full h-full object-cover object-center hidden md:block"
        ></Image>
        <div className="w-full h-full bg-dark-40 absolute top-0 left-0"></div>
        <div className="w-full h-full absolute top-0 left-0">
          <AdoptSteps />
        </div>
      </div>
      <div className="w-10/12 h-[calc(100vh-305px)] md:h-full mx-auto md:col-span-2">
        <div className="h-4/5 pt-12 my-auto flex flex-col justify-between">
          <AdoptForm />
          <AdoptButton />
        </div>
      </div>
    </UserLayout>
  );
};

export default AdoptPage;
