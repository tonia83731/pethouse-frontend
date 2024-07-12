import Image from "next/image";
import { TbPhoneFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
type AdoptCardProps = {
  animal_id: string;
  user_id: string;
  name: string;
  phone: string;
  email: string;
  status: boolean;
};
const AdoptCard = ({
  animal_id,
  name,
  phone,
  email,
  status,
}: AdoptCardProps) => {
  return (
    <div className="bg-skin rounded-md p-4 grid grid-cols-3 gap-2 items-center drop-shadow-md">
      <div className="col-span-2 flex flex-col gap-2">
        <div className="flex gap-2 items-end">
          <Image
            src="/icons/animal_footpring.svg"
            width={60}
            height={60}
            alt="foot-print"
            className="w-8 h-8"
          ></Image>
          <div className="font-bold text-2xl">{animal_id}</div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="font-bold text-2xl">{name}</div>
          <div className="text-sm text-dark-60">
            <div className="flex items-center gap-1">
              <TbPhoneFilled />
              <a href={`mailto:${phone}`} className="">
                {phone}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <MdEmail />
              <a href={`mailto:${email}`} className="">
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button className="bg-taro py-2 text-white rounded-md">Detail</button>
        <button
          className={`text-white rounded-md py-2 ${
            status ? "bg-heart" : "bg-dirt"
          }`}
        >
          {status ? "Passed" : "Reviewing"}
        </button>
      </div>
    </div>
  );
};
export default AdoptCard;
