import Image from "next/image";
import Link from "next/link";
import { adoptsteps } from "@/data/adoptsteps";
const AdoptStepsSection = () => {
  return (
    <section
      className="hidden md:block h-full w-full max-w-[1280px] mx-auto"
      id="adopt-steps"
    >
      <div className="md:grid md:grid-cols-2 gap-8 w-full h-full">
        <div className="w-full h-[480px] hidden md:block relative">
          <div className="bg-wine-20 w-full h-full absolute top-0 right-0"></div>
          <Image
            src="/images/home_adopt.jpg"
            alt="adopt steps"
            width={1200}
            height={1800}
            className="w-full h-full aspect-square object-cover object-center"
          ></Image>
        </div>
        <div className="flex flex-col justify-center gap-8 md:gap-12 w-full">
          <h4 className="font-bold font-nunito text-2xl xl:text-3xl">
            Adopt Steps
          </h4>
          <div className="flex flex-col gap-4">
            {adoptsteps.map(({ id, title, description }, index) => {
              return (
                <div className="flex gap-8" key={id}>
                  <div className="w-4 h-4 bg-taro font-bold rounded-full text-lg">
                    0{index + 1}
                  </div>
                  <div>
                    <h5 className="text-xl font-bold">{title}</h5>
                    <p className="text-base font-light text-dark-60">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href="/adopt"
            className="bg-heart text-white px-4 py-2.5 text-center rounded-full hover:font-bold hover:drop-shadow-md hover:italic w-1/3"
          >
            Adopt Now
          </Link>
        </div>
      </div>
    </section>
  );
};
export default AdoptStepsSection;
