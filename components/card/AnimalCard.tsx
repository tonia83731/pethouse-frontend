import Link from "next/link";
import Image from "next/image";
import { animalshelter } from "@/data/animalshelter";
import { PiGenderFemaleBold } from "react-icons/pi";
import { PiGenderMaleBold } from "react-icons/pi";
import { FaQuestion } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbPhoneFilled } from "react-icons/tb";
type AnimalProps = {
  animal_id: string;
  animal_subid: string;
  animal_area_pkid: string;
  animal_shelter_pkid: string;
  animal_place: string;
  animal_kind: string;
  animal_Variety: string;
  animal_sex: string;
  animal_bodytype: string;
  animal_colour: string;
  animal_age: string;
  animal_sterilization: string;
  animal_bacterin: string;
  animal_foundplace: string;
  animal_title: string;
  animal_status: string;
  animal_remark: string;
  animal_caption: string;
  animal_opendate: string;
  animal_closeddate: string;
  animal_update: string;
  animal_createtime: string;
  shelter_name: string;
  album_file: string;
  album_update: string;
  cDate: string;
  shelter_address: string;
  shelter_tel: string;
};

const AnimalCard = ({
  animal_id,
  album_file,
  shelter_name,
  shelter_tel,
  animal_kind,
  animal_Variety,
  animal_sex,
  animal_bodytype,
  animal_age,
  animal_sterilization,
  animal_bacterin,
}: AnimalProps) => {
  const animal_image = album_file
    ? album_file
    : "/images/default_animal_card.jpg";
  const animal_shelter = animalshelter.find(
    (item: any) => item.name === shelter_name
  );

  const animalbodytype_text =
    animal_bodytype === "SMALL"
      ? "小型"
      : animal_bodytype === "MEDIUM"
      ? "中型"
      : "大型";

  const animalage_text = animal_age === "ADULT" ? "成年" : "幼年";
  const animal_sex_icon =
    animal_sex === "F" ? (
      <PiGenderFemaleBold />
    ) : animal_sex === "M" ? (
      <PiGenderMaleBold />
    ) : (
      <FaQuestion />
    );
  const sterilization =
    animal_sterilization === "T" ? (
      <FaCheck />
    ) : animal_sterilization === "F" ? (
      <ImCross />
    ) : (
      <FaQuestion />
    );
  const sterilization_text =
    animal_sterilization === "T"
      ? "已絕育"
      : animal_sterilization === "F"
      ? "未絕育"
      : "未知";

  const bacterin =
    animal_bacterin === "T" ? (
      <FaCheck />
    ) : animal_bacterin === "F" ? (
      <ImCross />
    ) : (
      <FaQuestion />
    );
  const bacterin_text =
    animal_bacterin === "T"
      ? "已施打疫苗"
      : animal_bacterin === "F"
      ? "未施打疫苗"
      : "未知";
  return (
    <div className="h-full md:h-[360px] w-full relative">
      <div className="w-full h-5/6 relative">
        <Image
          src={animal_image}
          width={300}
          height={300}
          alt={animal_id}
          className="w-full h-full object-cover drop-shadow-md"
        ></Image>
        <div className="bg-white text-dark p-1 rounded-md absolute top-2 left-2">
          # {animal_id}
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 drop-shadow-md bg-white-75 w-11/12 rounded-md p-4 mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <div
              className={`text-lg ${
                animal_sex === "F"
                  ? "text-female"
                  : animal_sex === "M"
                  ? "text-male"
                  : "text-slate-500"
              }`}
            >
              {animal_sex_icon}
            </div>
            <h5 className="font-bold text-lg">{animal_Variety}</h5>
          </div>
          <div className="flex gap-2 text-sm">
            <div className="bg-wine text-white rounded-md px-2">
              {animalbodytype_text}
            </div>
            <div className="bg-wine text-white rounded-md px-2">
              {animalage_text}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-1 items-center">
            <div
              className={
                animal_sterilization === "T"
                  ? "text-check"
                  : animal_sterilization === "F"
                  ? "text-heart"
                  : "text-slate-400"
              }
            >
              {sterilization}
            </div>
            <div className="text-sm">{sterilization_text}</div>
          </div>
          <div className="flex gap-1 items-center">
            <div
              className={
                animal_bacterin === "T"
                  ? "text-check"
                  : animal_bacterin === "F"
                  ? "text-heart"
                  : "text-slate-400"
              }
            >
              {bacterin}
            </div>
            <div className="text-sm">{bacterin_text}</div>
          </div>
        </div>
        <div className="w-full border-t-2 border-dotted border-wine"></div>
        <div className="flex gap-2 items-center">
          <div className="">
            <FaLocationDot />
          </div>
          <div className="">{shelter_name}</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="">
            <TbPhoneFilled />
          </div>
          <a href={`tel:${shelter_tel}`} className="">
            {shelter_tel}
          </a>
        </div>
      </div>
    </div>
  );
};
export default AnimalCard;
