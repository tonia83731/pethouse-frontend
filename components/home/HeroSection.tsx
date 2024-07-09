import Image from "next/image";
import Link from "next/link";
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
    <div className="h-[calc(100vh-60px)]">
      <div className="relative md:hidden">
        <Image
          src="/images/home_hero_mobile.png"
          alt="home hero"
          className="md:hidden w-full h-auto object-cover"
          width={400}
          height={185}
        ></Image>
        <div className="w-4/6 sm:w-full flex flex-col gap-6 absolute left-4 top-1/2 -translate-y-1/2 2xl:left-52">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold font-nunito text-2xl">
              Not Only People Need a House
            </h1>
            <p className="text-base font-medium font-nunito-san">
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
      <div className="hidden md:block md:w-full md:h-full">
        <div className="w-full h-[83%] relative">
          <Image
            src="/images/home_hero.png"
            alt="home hero"
            className="md:h-full md:object-cover md:object-center"
            width={2160}
            height={996}
          ></Image>
          <div className="flex flex-col gap-4 absolute left-4 top-1/2 -translate-y-1/2 2xl:left-52">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold font-nunito text-4xl">
                Not Only People Need a House
              </h1>
              <p className="text-lg font-medium font-nunito-san">
                Give homeless pets a loving forever home.
              </p>
            </div>
            <Link
              href="/adopt"
              className="bg-dark text-white text-center w-52 px-2 py-0.5 md:px-4 md:py-2 rounded-full hover:font-bold hover:drop-shadow-md hover:italic"
            >
              Find Adoption
            </Link>
          </div>
        </div>
        <div className="md:h-[17%] md:grid md:grid-cols-6 md:items-center container max-w-[1280px] px-4 xl:px-0 mx-auto">
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
    </div>
  );
};
export default HeroSection;
