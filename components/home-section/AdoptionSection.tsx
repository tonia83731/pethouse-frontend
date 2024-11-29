import Link from "next/link";
import Image from "next/image";
import DogsImg from "@/public/images/animals/dog.png";
import CatsImg from "@/public/images/animals/cat.png";
import RabbitsImg from "@/public/images/animals/rabbit.png";
import BirdsImg from "@/public/images/animals/bird.png";
const AdoptionSection = () => {
  const animal_types = [
    {
      title: "Dogs",
      src: DogsImg,
    },
    {
      title: "Cats",
      src: CatsImg,
    },
    {
      title: "Rabbits",
      src: RabbitsImg,
    },
    {
      title: "Birds",
      src: BirdsImg,
    },
  ];
  return (
    <div className="flex justify-center items-center gap-4 flex-col md:flex-row md:justify-between">
      <div className="hidden md:flex flex-col gap-4">
        <h5 className="text-xl font-bold">尋找與認養</h5>
        <Link
          href="/adoption"
          className="w-30 text-center bg-dark text-white px-4 py-1 rounded-full hover:drop-shadow-lg hover:font-medium"
        >
          尋找毛孩
        </Link>
      </div>

      <div className="flex justify-between md:grid md:grid-cols-4 gap-12 md:gap-8">
        {animal_types.map(({ title, src }) => {
          return (
            <div className="flex flex-col gap-2 items-center" key={title}>
              <Image
                src={src}
                alt={title}
                width={200}
                height={200}
                className="w-20 h-20"
              ></Image>
              <h5 className="font-bold font-nunito text-base">{title}</h5>
            </div>
          );
        })}
      </div>
      <Link
        href="/adoption"
        className="w-30 text-center bg-dark text-white px-4 py-1 rounded-full hover:drop-shadow-lg hover:font-medium md:hidden"
      >
        尋找毛孩
      </Link>
    </div>
  );
};

export default AdoptionSection;
