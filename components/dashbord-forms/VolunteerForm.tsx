/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import DefaultInput from "@/components/common/input/DefaultInput";
import DefaultSelect, { OptionType } from "../common/input/DefaultSelect";
import DefaultTextarea from "../common/input/DefaultTextarea";
import { weekday_options } from "@/datas/weekday-option";
import { IoIosArrowDown } from "react-icons/io";
import { VolunteerInput } from "@/pages/dashboard/volunteers";
interface VolunteerFormProps {
  partners: OptionType[];
  type: "create" | "edit" | null;
  isShowed: boolean;
  isError: {
    status: boolean;
    message: any;
  };
  inputValue: VolunteerInput;
  onShowClick: () => void;
  onFormCancel: () => void;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (value: any, type: "location" | "weekday") => void;
}

export const weekday_data = [
  {
    label: "每日",
    value: null,
  },
  ...weekday_options,
];

const VolunteerForm = ({
  partners,
  type,
  inputValue,
  isShowed,
  isError,
  onShowClick,
  onFormCancel,
  onInputChange,
  onSelectChange,
}: VolunteerFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={onShowClick}
        className="flex justify-center items-center gap-1 w-full lg:w-1/5 lg:max-w-[140px] py-2 bg-heart text-white lg:text-lg rounded-lg"
      >
        <div className="">志工招募</div>
        <div className={`${isShowed && "rotate-180"} transition`}>
          <IoIosArrowDown />
        </div>
      </button>
      {isShowed && (
        <form className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-[3fr_2fr] gap-4">
              <DefaultSelect
                title="毛孩之家"
                name="location"
                inputValue={inputValue.location}
                onSelectChange={(value) => onSelectChange(value, "location")}
                options={partners}
              />
              <div className="grid grid-cols-2 gap-4">
                <DefaultInput
                  type="number"
                  id="perPerson"
                  name="perPerson"
                  label="需求人數"
                  placeholder="請輸入需求人數"
                  inputValue={inputValue.perPerson}
                  onInputChange={(e) => onInputChange(e)}
                />
                <div className="flex items-end gap-2">
                  <DefaultInput
                    type="number"
                    id="minHour"
                    name="minHour"
                    label="最低時數"
                    placeholder="請輸入最低時數"
                    inputValue={inputValue.minHour}
                    onInputChange={(e) => onInputChange(e)}
                  />
                  <div className="h-10 flex justify-center items-center">
                    時
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_3fr] gap-2">
              <DefaultSelect
                title="需求時間"
                options={weekday_data}
                inputValue={
                  inputValue.weekday.value
                    ? inputValue.weekday
                    : {
                        label: "每日",
                        value: "Everyday",
                      }
                }
                onSelectChange={(value) => onSelectChange(value, "weekday")}
                name="week"
              />
              <div className="grid grid-cols-[1fr_20px_1fr] gap-2 items-end">
                <DefaultInput
                  type="time"
                  id="startTime"
                  name="startTime"
                  placeholder="00:00"
                  inputValue={inputValue.startTime}
                  onInputChange={(e) => onInputChange(e)}
                />
                <div className="h-10 flex justify-center items-center">至</div>
                <DefaultInput
                  type="time"
                  id="endTime"
                  name="endTime"
                  placeholder="23:59"
                  inputValue={inputValue.endTime}
                  onInputChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <DefaultTextarea
              id="intro"
              name="intro"
              label="志工介紹"
              placeholder="請輸入志工介紹"
              inputValue={inputValue.intro}
              onInputChange={(e) => onInputChange(e)}
            />
          </div>
          {isError.status && <p className="text-heart">{isError.message}</p>}
          <div className="w-full flex justify-end">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={onFormCancel}
                className="font-medium py-1 px-6 bg-dark-40 text-white rounded-lg hover:drop-shadow-lg"
              >
                取消
              </button>
              <button className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg">
                {type === "create" ? "新增" : "修改"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default VolunteerForm;
