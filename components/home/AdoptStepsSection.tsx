import Image from "next/image";
const AdoptStepsSection = () => {
  return (
    <section className="hidden md:block w-full h-[648px] md:h-[560px]" id="">
      <div className="md:grid md:grid-cols-2 gap-8 w-full h-full">
        <Image
          src="/images/home_adpot.jpg"
          alt="adopt step"
          width={960}
          height={1140}
          className="hidden md:block w-full h-full object-cover"
        ></Image>
        <div className=""></div>
      </div>
    </section>
  );
};
export default AdoptStepsSection;
