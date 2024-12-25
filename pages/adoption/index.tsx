import { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { clientFetch, serverFetch } from "@/lib/fetch";
import Select from "react-select";
import { SELECTSTYLES } from "@/constants/select-style";
import FrontLayout from "@/components/common/layout/FrontLayout";
import Pagination from "@/components/common/Pagination";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { animal_options } from "@/datas/animal-option";
import { SelectOptionType } from "@/types/default";
import { FurkidProps } from "@/types/furkid";
import {
  TransformGender,
  TransformAge,
  TransformSize,
  TransforTrueFalse,
  TransformAnimal,
} from "@/helpers/animal-helpers";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdPets } from "react-icons/md";

export type PartnerProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  weekStart: number;
  weekEnd: number;
  openingTime: number;
  closingTime: number;
  address: string;
};
export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  // totalItems: number;
  itemsPerPage: number;
};
interface AdoptionPageProps {
  furkids: FurkidProps[];
  partners: SelectOptionType[];
  pagination: PaginationProps;
}

type CategoryState = {
  partner: SelectOptionType;
  animal: SelectOptionType;
};

const AdoptionPage = ({ furkids, pagination, partners }: AdoptionPageProps) => {
  const [currPage, setCurrPage] = useState(pagination?.currentPage | 1);
  const [furkidsData, setFurkidsData] = useState(furkids);
  const [category, setCategory] = useState<CategoryState>({
    partner: partners[0],
    animal: {
      label: "全部動物",
      value: null,
    },
  });

  const handleArrowClick = async (type: "prev" | "next") => {
    const page = type === "prev" ? currPage - 1 : currPage + 1;

    let url = `/furkids?page=${page}`;
    if (category.partner.value) url += `&userId=${category.partner.value}`;
    if (category.animal.value) url += `&animal=${category.animal.value}`;

    try {
      const response = await clientFetch(url);
      if (!response.success) {
        setFurkidsData([]);
        return;
      }
      if (response.success) {
        const data = response.data.furkids;
        setFurkidsData(data);
        setCurrPage(page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumberClick = async (num: number) => {
    if (currPage === num) return;
    let url = `/furkids?page=${num}`;
    if (category.partner.value) url += `&userId=${category.partner.value}`;
    if (category.animal.value) url += `&animal=${category.animal.value}`;

    try {
      const response = await clientFetch(url);
      if (!response.success) {
        setFurkidsData([]);
        return;
      }
      if (response.success) {
        const data = response.data.furkids;
        setFurkidsData(data);
        setCurrPage(num);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FrontLayout
      includeTitle={true}
      title="拯救與安置"
      description="了解我們的動物救援與安置計劃，幫助流浪動物找到溫暖的家。我們致力於提供醫療照護、心理輔導以及安置服務，讓每隻動物都能擁有新生的機會。無論是認養或支持救援行動，您都能參與其中，共同創造更美好的未來。"
    >
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
          <Select
            options={partners}
            defaultValue={category.partner}
            styles={SELECTSTYLES}
            onChange={async (newValue) => {
              const userId = newValue?.value;
              if (category.partner.value === userId) return;

              let url = `/furkids?page=1${userId ? `&userId=${userId}` : ""}`;
              if (category.animal.value)
                url += `animal=${category.animal.value}`;

              try {
                const response = await clientFetch(url);

                if (!response.success) {
                  setFurkidsData([]);
                  return;
                }
                if (response.success) {
                  const data = response.data.furkids;
                  setFurkidsData(data);
                  setCategory((prev) => ({
                    ...prev,
                    partner: newValue || {
                      label: "全部動物",
                      value: null,
                    },
                  }));
                }
              } catch (error) {
                console.log(error);
              }
            }}
          />
          <Select
            options={[
              {
                label: "全部動物",
                value: null,
              },
              ...animal_options,
            ]}
            defaultValue={category.animal}
            styles={SELECTSTYLES}
            onChange={async (newValue) => {
              const animal = newValue?.value;
              if (category.animal.value === animal) return;

              let url = `/furkids?page=1&${animal ? `animal=${animal}` : ""}`;
              if (category.partner.value)
                url += `partner=${category.partner.value}`;

              try {
                const response = await clientFetch(url);

                if (!response.success) {
                  setFurkidsData([]);
                  return;
                }
                if (response.success) {
                  const data = response.data.furkids;
                  setFurkidsData(data);
                  setCategory((prev) => ({
                    ...prev,
                    animal: newValue || partners[0],
                  }));
                }
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </div>
        <form className="w-full md:w-1/3 h-10 rounded-full border border-dark bg-skin-40 px-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="請輸入動物編號"
            className="outline-none w-full h-full bg-transparent placeholder:text-skin-60 text-dark"
          />
          <button
            className="text-xl w-10 h-10 flex justify-center items-center"
            type="submit"
          >
            <FaMagnifyingGlass />
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {/* {furkidsData.map((item) => {
          return <AdoptionCard {...item} key={item.id} />;
        })} */}
        {furkidsData.map(
          ({
            id,
            name,
            animal,
            gender,
            size,
            age,
            isNeutured,
            isVaccinated,
            partner,
            avatar,
          }) => {
            const trans_gender = TransformGender(gender);
            const trans_size = TransformSize(size);
            const trans_age = TransformAge(age);
            const trans_animal = TransformAnimal(animal);
            const is_neutured = TransforTrueFalse(isNeutured);
            const is_vaccinated = TransforTrueFalse(isVaccinated);
            return (
              <div className="" key={id}>
                <div className="relative w-full h-[200px]">
                  <Image
                    src={avatar}
                    alt={name}
                    width={300}
                    height={250}
                    className="w-full h-full object-cover"
                  ></Image>
                  <Link
                    href={`/adoption/application/${id}`}
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
                  gender === "M"
                    ? "text-sky"
                    : gender === "F"
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
                ${is_neutured ? "text-neutral" : "text-berry"}
                `}
                      >
                        {is_neutured}
                      </div>
                      <div className="text-dark-60">
                        {is_neutured ? "已" : "未"}絕育
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`
                ${is_vaccinated ? "text-neutral" : "text-berry"}
                `}
                      >
                        {is_vaccinated}
                      </div>
                      <div className="text-dark-60">
                        {is_vaccinated ? "已" : "未"}施打狂犬疫苗
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-dotted border-dark-40"></div>
                  <div className="flex items-center gap-2 text-dark-60">
                    <div className="">
                      <IoLocationSharp />
                    </div>
                    <div className="text-sm">{partner.name}</div>
                  </div>
                  <div className="flex items-center gap-2 text-dark-60">
                    <div className="">
                      <FaPhone />
                    </div>
                    <Link href={`tel:${partner.address}`} className="text-sm">
                      {partner.address}
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        )}
        {/* {furkidsData.map(({
  id,
  name,
  animal,
  gender,
  size,
  age,
  isNeutured,
  isVaccinated,
  partner,
  avatar,
}) => {
          const trans_gender = TransformGender(gender);
  const trans_size = TransformSize(size);
  const trans_age = TransformAge(age);
  const trans_animal = TransformAnimal(animal);
  const is_neutured = TransforTrueFalse(isNeutured);
  const is_vaccinated = TransforTrueFalse(isVaccinated);
  return (
    <div className="">
      <div className="relative w-full h-[200px]">
        <Image
          src={avatar}
          alt={name}
          width={300}
          height={250}
          className="w-full h-full object-cover"
        ></Image>
        <Link
          // href={`/adoption/application/1`}
          // href={`/adoption/application/${encodeURIComponent(id)}`}
          href={{
            pathname: "/adoption/application/[slug]",
            query: { slug: id },
          }}
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
                  gender === "M"
                    ? "text-sky"
                    : gender === "F"
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
                ${is_neutured ? "text-neutral" : "text-berry"}
                `}
            >
              {is_neutured}
            </div>
            <div className="text-dark-60">{is_neutured ? "已" : "未"}絕育</div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`
                ${is_vaccinated ? "text-neutral" : "text-berry"}
                `}
            >
              {is_vaccinated}
            </div>
            <div className="text-dark-60">
              {is_vaccinated ? "已" : "未"}施打狂犬疫苗
            </div>
          </div>
        </div>
        <div className="border-b border-dotted border-dark-40"></div>
        <div className="flex items-center gap-2 text-dark-60">
          <div className="">
            <IoLocationSharp />
          </div>
          <div className="text-sm">{partner.name}</div>
        </div>
        <div className="flex items-center gap-2 text-dark-60">
          <div className="">
            <FaPhone />
          </div>
          <Link href={`tel:${partner.address}`} className="text-sm">
            {partner.address}
          </Link>
        </div>
      </div>
    </div>
        })} */}
      </div>
      {pagination && (
        <div className="w-full flex justify-center md:justify-end">
          <Pagination
            currPage={currPage}
            totalPage={pagination?.totalPages}
            onArrowClick={handleArrowClick}
            onNumClick={handleNumberClick}
          />
        </div>
      )}
    </FrontLayout>
  );
};

export default AdoptionPage;
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // const response = await serverFetch("/furkids");
    const [furkid_res, partner_res] = await Promise.all([
      serverFetch("/furkids"),
      serverFetch("/partners"),
    ]);
    // console.log(response);

    if (!furkid_res.success || !partner_res.success)
      return {
        props: {
          partners: [],
          furkids: [],
          pagination: null,
        },
      };

    const partners = partner_res?.data.map((item: any) => ({
      value: item.id,
      label: item.name.split(" ")[1],
    }));

    // console.log(furkid_res.data);
    return {
      props: {
        partners: [
          {
            value: null,
            label: "全部分店",
          },
          ...partners,
        ],
        furkids: furkid_res.data.furkids,
        pagination: furkid_res.data.pagination,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        partners: [],
        furkids: [],
        pagination: null,
      },
    };
  }
};
