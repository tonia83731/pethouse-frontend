import Image from "next/image";
import Link from "next/link";
type HelpCardProps = {
  img: string;
  title: string;
  description: string;
  href: string;
};
const HelpCard = (props: HelpCardProps) => {
  const { img, title, description, href } = props;
  return (
    <div className="w-full h-full relative mt-12">
      <Image
        src={img}
        alt={title}
        width={80}
        height={80}
        className="w-14 h-14 absolute left-1/2 top-0 -translate-y-1/2 -translate-x-1/2"
      ></Image>
      <div className="flex flex-col gap-2 justify-center items-center bg-white border-2 border-slate-400 w-full h-full rounded-md px-4 pt-8 pb-4 md:py-4">
        <h5 className="font-extrabold font-nunito text-lg md:text-xl">
          {title}
        </h5>
        <p className="text-dark-80 text-center">{description}</p>
        <Link
          href={href}
          className="mt-2 bg-dark text-white px-4 py-0.5 md:py-2 rounded-full hover:font-bold hover:drop-shadow-md hover:italic"
        >
          GO
        </Link>
      </div>
    </div>
  );
};

export default HelpCard;
