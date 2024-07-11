import Image from "next/image";
import Link from "next/link";
import { adoptsteps } from "@/data/adoptsteps";
const animallist = [
  {
    id: "dog",
    img: "/icons/dog.png",
  },
  {
    id: "cat",
    img: "/icons/cat.png",
  },
  {
    id: "bird",
    img: "/icons/bird.png",
  },
  {
    id: "others",
    img: "/icons/rabbit.png",
  },
];
const HeroSection = () => {
  // Not Only People Need a House
  return (
    <div className="w-full h-[calc(100vh-50px)] md:h-[calc(100vh-60px)] grid grid-rows-2 gap-2 md:flex md:flex-col md:gap-8">
      {/* mobile version */}
      <div className="w-full h-full bg-mobileHomeHero bg-cover bg-right-center md:hidden">
        <div className="w-10/12 h-full mx-auto flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-extrabold font-nunito text-2xl">
              Not Only People Need a House
            </h1>
            <p className="text-base font-medium font-noto-san">
              Give homeless pets a loving forever home.
            </p>
          </div>
          <Link
            href="/adopt"
            className="bg-dark text-base text-white text-center w-48 px-2 py-0.5 md:px-4 md:py-2 rounded-full hover:font-bold hover:drop-shadow-md hover:italic"
          >
            Find Adoption
          </Link>
        </div>
      </div>
      {/* desktop version */}
      <div className="hidden md:grid md:grid-rows-5 md:w-full md:h-full">
        <div className="md:w-full md:h-full md:row-span-4 md:gap-2 md:bg-homeHero md:bg-cover md:bg-center">
          <div className="md:w-10/12 md:h-full md:mx-auto md:max-w-[1280px] flex flex-col justify-center gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-extrabold font-nunito text-4xl xl:text-5xl">
                Not Only People Need a House
              </h1>
              <p className="text-lg font-medium font-noto-san">
                Give homeless pets a loving forever home.
              </p>
            </div>
            <Link
              href="/adopt"
              className="bg-dark text-white text-center w-52 px-2 py-0.5 md:px-4 md:py-2 rounded-full hover:font-bold hover:drop-shadow-md hover:italic"
            >
              Adopt Now!
            </Link>
          </div>
        </div>
        <div className="md:h-full md:grid md:grid-cols-6 md:items-center container max-w-[1280px] w-10/12 mx-auto">
          <div className="flex flex-col gap-4 col-span-2">
            <h4 className="font-bold font-mono text-2xl">Rescue & Rehome</h4>
            <Link
              href="/animals"
              className="bg-dark text-white text-center w-52 px-2 py-0.5 md:px-4 md:py-2 rounded-full hover:font-bold hover:drop-shadow-md hover:italic"
            >
              Find Adoption
            </Link>
          </div>
          <div className="col-start-4 col-span-3 grid grid-cols-4 gap-1">
            {animallist.map(({ id, img }) => {
              return (
                <div
                  className="flex flex-col justify-center items-center gap-2"
                  key={id}
                >
                  <Image
                    src={img}
                    alt={id}
                    width={120}
                    height={120}
                    className="w-16 h-16"
                  ></Image>
                  <h5 className="font-bold text-lg capitalize">{id}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <section
        className="flex flex-col justify-center gap-6 md:gap-12 w-full px-4 md:hidden"
        id="adopt-steps"
      >
        <h4 className="font-extrabold font-nunito text-2xl">Adopt Steps</h4>
        <div className="flex flex-col gap-4">
          {adoptsteps.map(({ id, title, description }, index) => {
            return (
              <div className="flex gap-8" key={id}>
                <div className="w-4 h-4 bg-taro font-bold rounded-full text-lg">
                  0{index + 1}
                </div>
                <div>
                  <h5 className="text-lg md:text-xl font-bold">{title}</h5>
                  <p className="text-xs text-dark-60">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-1/2 text-center">
          <Link
            href="/adopt"
            className="bg-heart text-white px-4 py-2 rounded-full hover:font-bold hover:drop-shadow-md hover:italic"
          >
            Adopt Now
          </Link>
        </div>
      </section>
    </div>
  );
};
export default HeroSection;
