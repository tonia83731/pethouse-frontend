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
    <div className="">
      <Image src={img} alt={title} width={80} height={80}></Image>
      <div className="">
        <h5 className="font-bold font-nunito text-lg md:text-xl">{title}</h5>
        <p className="text-dark-80">{description}</p>
        <Link
          href={href}
          className="bg-dark text-white px-2 py-0.5 md:px-4 md:py-2 rounded-full hover:font-bold hover:drop-shadow-md hover:italic"
        >
          GO
        </Link>
      </div>
    </div>
  );
};

export default HelpCard;
