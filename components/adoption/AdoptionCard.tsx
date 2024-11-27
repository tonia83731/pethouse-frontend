import Link from "next/link";
import Image from "next/image";
import {
  GenderType,
  SizeType,
  AgeType,
  AnimalType,
  TransformGender,
  TransformAge,
  TransformSize,
  TransforTrueFalse,
  TransformAnimal,
} from "@/helpers/animal-helpers";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa";
import { MdPets } from "react-icons/md";

export interface AdoptionStrayProps {
  id: number;
  name: string;
  species: AnimalType;
  gender: GenderType;
  size: SizeType;
  age: AgeType;
  neutered: boolean;
  vaccinated: boolean;
  current_location: string;
  phone: string;
  image: string;
}

const AdoptionCard = ({
  name,
  species,
  gender,
  size,
  age,
  neutered,
  vaccinated,
  current_location,
  phone,
  image,
}: AdoptionStrayProps) => {
  const trans_gender = TransformGender(gender);
  const trans_size = TransformSize(size);
  const trans_age = TransformAge(age);
  const trans_animal = TransformAnimal(species);
  const isNeutered = TransforTrueFalse(neutered);
  const isVaccinated = TransforTrueFalse(vaccinated);
  return (
    <div className="">
      <div className="relative w-full h-[200px]">
        <Image
          src={image}
          alt={name}
          width={300}
          height={250}
          className="w-full h-full object-cover"
        ></Image>
        <Link
          href="/adoption/application"
          title="我要領養"
          className="absolute top-2 right-2 w-8 h-8 rounded-full text-xl bg-white-60 text-wine-60 hover:bg-white hover:text-wine flex justify-center items-center"
        >
          <MdPets />
        </Link>
      </div>
      <div className="relative z-[60] bg-white-80 hover:bg-white-40 drop-shadow-md rounded-lg px-4 py-2 mt-[-60px] mx-2 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2">
          <div className="font-bold flex items-center gap-0.5">
            <div
              className={`
                ${
                  gender === "Male"
                    ? "text-sky"
                    : gender === "Female"
                    ? "text-berry"
                    : "text-neutral"
                }
                `}
            >
              {trans_gender}
            </div>
            <div className="text-lg">
              {name} | {trans_animal}
            </div>
          </div>
          <div className="text-sm flex items-center gap-1">
            <div className="text-center py-0.5 w-[40px] bg-wine text-white rounded-md">
              {trans_size}
            </div>
            <div className="text-center py-0.5 w-[40px] bg-wine text-white rounded-md">
              {trans_age}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div
              className={`
                ${neutered ? "text-neutral" : "text-berry"}
                `}
            >
              {isNeutered}
            </div>
            <div className="text-dark-60">{neutered ? "已" : "未"}絕育</div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`
                ${vaccinated ? "text-neutral" : "text-berry"}
                `}
            >
              {isVaccinated}
            </div>
            <div className="text-dark-60">
              {vaccinated ? "已" : "未"}施打狂犬疫苗
            </div>
          </div>
        </div>
        <div className="border-b border-dotted border-dark-40"></div>
        <div className="flex items-center gap-2 text-dark-60">
          <div className="">
            <IoLocationSharp />
          </div>
          <div className="text-sm">{current_location}</div>
        </div>
        <div className="flex items-center gap-2 text-dark-60">
          <div className="">
            <FaPhoneVolume />
          </div>
          <Link href={`tel:${phone}`} className="text-sm">
            {phone}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdoptionCard;
