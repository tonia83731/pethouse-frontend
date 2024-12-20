/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent } from "react";
import DefaultInput from "@/components/common/input/DefaultInput";
import DefaultRadio from "@/components/common/input/DefaultRadio";
import DefaultCheckbox from "@/components/common/input/DefaultCheckbox";
import DefaultSelect, { OptionType } from "../common/input/DefaultSelect";
import {
  gender_options,
  size_options,
  age_options,
  animal_options,
} from "@/datas/animal-option";
import { IoIosArrowDown } from "react-icons/io";

// import { dummy_collaboration_data } from "@/datas/dummy/collaboration_data";

export type AdoptionInput = {
  id: number | null;
  name: string;
  gender: string | null;
  animal: string | null;
  size: string | null;
  age: string | null;
  isNeutered: boolean;
  isVaccinated: boolean;
  location: OptionType;
};

interface FurkidFormProps {
  partners: OptionType[];
  type: "create" | "edit" | null;
  isShowed: boolean;
  isError: {
    status: boolean;
    message: any;
  };
  inputValue: AdoptionInput;
  onShowClick: () => void;
  onFormCancel: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
  onRadioChange: (name: string, option: string | null) => void;
  onSelectChange: (value: any) => void;
  onFormSubmit: (e: FormEvent) => void;
}

const FurkidForm = ({
  partners,
  type,
  inputValue,
  isShowed,
  isError,
  onShowClick,
  onFormCancel,
  onInputChange,
  onCheckboxChange,
  onRadioChange,
  onSelectChange,
  onFormSubmit,
}: FurkidFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={onShowClick}
        className="flex justify-center items-center gap-1 w-full lg:w-1/5 lg:max-w-[140px] py-2 bg-heart text-white lg:text-lg rounded-lg"
      >
        <div className="">新增毛孩</div>
        <div className={`${isShowed && "rotate-180"} transition`}>
          <IoIosArrowDown />
        </div>
      </button>
      {isShowed && (
        <form
          onSubmit={(e) => onFormSubmit(e)}
          className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
              {/* name */}
              <DefaultInput
                id="name"
                name="name"
                label="毛孩姓名"
                placeholder="請輸入毛孩姓名"
                inputValue={inputValue.name}
                onInputChange={(e) => onInputChange(e)}
              />
              {/* location */}
              <DefaultSelect
                title="毛孩之家"
                name="location"
                placeholder="請選擇毛孩之家"
                inputValue={inputValue.location}
                onSelectChange={onSelectChange}
                options={partners}
              />
            </div>
            <div className="lg:grid lg:grid-cols-[2fr_3fr] flex flex-col gap-4">
              <DefaultRadio
                title="毛孩姓別"
                options={gender_options}
                name="gender"
                inputValue={inputValue.gender}
                onRadioChange={(name, option) => onRadioChange(name, option)}
              />
              <DefaultRadio
                title="毛孩類別"
                options={animal_options}
                name="animal"
                inputValue={inputValue.animal}
                onRadioChange={(name, option) => onRadioChange(name, option)}
              />
            </div>
            <div className="lg:grid lg:grid-cols-[2fr_3fr] flex flex-col gap-4">
              <DefaultRadio
                title="毛孩年齡"
                options={age_options}
                name="age"
                inputValue={inputValue.age}
                onRadioChange={(name, option) => onRadioChange(name, option)}
              />
              <DefaultRadio
                title="毛孩體型"
                options={size_options}
                name="size"
                inputValue={inputValue.size}
                onRadioChange={(name, option) => onRadioChange(name, option)}
              />
            </div>
            <DefaultCheckbox
              label="是否進行絕育?"
              id="isNeutered"
              name="isNeutered"
              inputValue={inputValue.isNeutered}
              onCheckboxChange={(e) => onCheckboxChange(e, "isNeutered")}
            />
            <DefaultCheckbox
              label="是否施打疫苗?"
              id="isVaccinated"
              name="isVaccinated"
              inputValue={inputValue.isVaccinated}
              onCheckboxChange={(e) => onCheckboxChange(e, "isVaccinated")}
            />
          </div>
          {isError.status && <p className="text-heart">{isError.message}</p>}
          <div className="w-full flex justify-end">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onFormCancel}
                className="font-medium py-1 px-6 bg-dark-40 text-white rounded-lg hover:drop-shadow-lg"
              >
                取消
              </button>
              <button
                type="submit"
                className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg"
              >
                {type === "create" ? "新增" : "修改"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default FurkidForm;
