/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import DefaultInput from "@/components/common/DefaultInput";
import DefaultRadio from "@/components/common/DefaultRadio";
import DefaultCheckbox from "@/components/common/DefaultCheckbox";
import DefaultSelect from "../common/DefaultSelect";
import {
  gender_options,
  size_options,
  age_options,
  animal_options,
} from "@/datas/animal-option";
import { IoIosArrowDown } from "react-icons/io";

import { dummy_collaboration_data } from "@/datas/dummy/collaboration_data";

type AdoptionInput = {
  name: string;
  gender: string | null;
  animal: string | null;
  size: string | null;
  age: string | null;
  isNeutered: boolean;
  isVaccinated: boolean;
};

const FurkidForm = () => {
  const locationRef = useRef<any>(null);
  const [isShowed, setIsShowed] = useState(false);
  const [inputValue, setInputValue] = useState<AdoptionInput>({
    name: "",
    gender: null,
    animal: "Dog",
    size: "S",
    age: "Child",
    isNeutered: false,
    isVaccinated: false,
  });
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setIsShowed(!isShowed)}
        className="flex justify-center items-center gap-1 w-1/5 max-w-[140px] py-2 bg-heart text-white text-lg rounded-lg"
      >
        <div className="">新增毛孩</div>
        <div className={`${isShowed && "rotate-180"} transition`}>
          <IoIosArrowDown />
        </div>
      </button>
      {isShowed && (
        <form className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* name */}
              <DefaultInput
                id="name"
                name="name"
                label="毛孩姓名"
                placeholder="請輸入毛孩姓名"
                inputValue={inputValue.name}
                onInputChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {/* location */}
              <DefaultSelect
                title="毛孩之家"
                name="location"
                placeholder="請選擇毛孩之家"
                ref={locationRef}
                options={dummy_collaboration_data}
              />
            </div>
            <div className="grid grid-cols-[2fr_3fr] gap-4">
              <DefaultRadio
                title="毛孩姓別"
                options={gender_options}
                name="gender"
                inputValue={inputValue.gender}
                onRadioChange={(option) =>
                  setInputValue((prev) => ({ ...prev, gender: option }))
                }
              />
              <DefaultRadio
                title="毛孩類別"
                options={animal_options}
                name="animal"
                inputValue={inputValue.animal}
                onRadioChange={(option) =>
                  setInputValue((prev) => ({ ...prev, animal: option }))
                }
              />
            </div>
            <div className="grid grid-cols-[2fr_3fr] gap-4">
              <DefaultRadio
                title="毛孩年齡"
                options={age_options}
                name="age"
                inputValue={inputValue.age}
                onRadioChange={(option) =>
                  setInputValue((prev) => ({ ...prev, age: option }))
                }
              />
              <DefaultRadio
                title="毛孩體型"
                options={size_options}
                name="size"
                inputValue={inputValue.size}
                onRadioChange={(option) =>
                  setInputValue((prev) => ({ ...prev, size: option }))
                }
              />
            </div>
            <DefaultCheckbox
              label="是否進行絕育?"
              id="isNeutered"
              name="isNeutered"
              inputValue={inputValue.isNeutered}
              onCheckboxChange={(e) =>
                setInputValue((prev) => ({
                  ...prev,
                  isNeutered: e.target.checked,
                }))
              }
            />
            <DefaultCheckbox
              label="是否施打疫苗?"
              id="isVaccinated"
              name="isVaccinated"
              inputValue={inputValue.isVaccinated}
              onCheckboxChange={(e) =>
                setInputValue((prev) => ({
                  ...prev,
                  isVaccinated: e.target.checked,
                }))
              }
            />
          </div>
          <div className="w-full flex justify-end">
            <div className="grid grid-cols-2 gap-2">
              <button className="font-medium py-1 px-6 bg-dark-40 text-white rounded-lg hover:drop-shadow-lg">
                取消
              </button>
              <button className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg">
                新增
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default FurkidForm;
