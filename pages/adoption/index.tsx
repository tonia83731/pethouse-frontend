import FrontLayout from "@/components/common/FrontLayout";
import AdoptionCard from "@/components/adoption/AdoptionCard";
import Pagination from "@/components/common/Pagination";
import Select from "react-select";
import { SELECTSTYLES } from "@/constants/select-style";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { getTwCity } from "@/datas/twCityDistricts";
import { animal_options } from "@/datas/animal-option";
import { dummy_stray_data } from "@/datas/dummy/stray_data";
import { useState } from "react";

const AdoptionPage = () => {
  const [currPage, setCurrPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);

  const totalPage = Math.ceil(dummy_stray_data.length / itemPerPage);
  const pages = Array.from({ length: totalPage }, (data, index) => index + 1);

  const handleArrowClick = (type: "prev" | "next") => {
    if (type === "prev") setCurrPage(currPage - 1);
    else setCurrPage(currPage + 1);
  };

  const handleNumberClick = (num: number) => {
    setCurrPage(num);
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
            options={getTwCity()}
            defaultValue={getTwCity()[0]}
            styles={SELECTSTYLES}
          />
          <Select
            options={[
              {
                label: "全部動物",
                value: "all",
              },
              ...animal_options,
            ]}
            defaultValue={{
              label: "全部動物",
              value: "all",
            }}
            styles={SELECTSTYLES}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
        {dummy_stray_data.map((item) => {
          return <AdoptionCard {...item} key={item.id} />;
        })}
      </div>
      <div className="w-full flex justify-center md:justify-end">
        <Pagination
          currPage={currPage}
          totalPage={totalPage}
          pages={pages}
          onArrowClick={handleArrowClick}
          onNumClick={handleNumberClick}
        />
      </div>
    </FrontLayout>
  );
};

export default AdoptionPage;
