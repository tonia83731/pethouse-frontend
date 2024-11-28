/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import DefaultInput from "@/components/common/DefaultInput";
import DefaultSelect from "../common/DefaultSelect";
import DefaultTextarea from "../common/DefaultTextarea";
import { weekday_options } from "@/datas/weekday-option";
import { IoIosArrowDown } from "react-icons/io";

import { dummy_collaboration_data } from "@/datas/dummy/collaboration_data";

type VolunteerInput = {
  name: string;
  perPerson: number;
  startTime: string;
  endTime: string;
  minHour: number;
  intro: string;
};

const VolunteerForm = () => {
  const locationRef = useRef<any>(null);
  const weekRef = useRef<any>(null);
  const [isShowed, setIsShowed] = useState(false);
  const [inputValue, setInputValue] = useState<VolunteerInput>({
    name: "",
    perPerson: 1,
    startTime: "",
    endTime: "",
    minHour: 4,
    intro: "",
  });
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setIsShowed(!isShowed)}
        className="flex justify-center items-center gap-1 w-1/5 max-w-[140px] py-2 bg-heart text-white text-lg rounded-lg"
      >
        <div className="">志工招募</div>
        <div className={`${isShowed && "rotate-180"} transition`}>
          <IoIosArrowDown />
        </div>
      </button>
      {isShowed && (
        <form className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[3fr_1fr] gap-4">
              <DefaultSelect
                title="毛孩之家"
                name="location"
                placeholder="請選擇毛孩之家"
                ref={locationRef}
                options={dummy_collaboration_data}
              />
              <DefaultInput
                type="number"
                id="perPerson"
                name="perPerson"
                label="需求人數"
                placeholder="請輸入需求人數"
                inputValue={inputValue.perPerson}
                onInputChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-[3fr_1fr] gap-4">
              <div className="grid grid-cols-[1fr_3fr] gap-2">
                <DefaultSelect
                  title="需求時間"
                  options={[
                    {
                      label: "每日",
                      value: "Everyday",
                    },
                    ...weekday_options,
                  ]}
                  // placeholder="夥伴位置"
                  inputValue={{
                    label: "每日",
                    value: "Everyday",
                  }}
                  ref={weekRef}
                  name="week"
                />
                <div className="grid grid-cols-[1fr_20px_1fr] gap-2 items-end">
                  <DefaultInput
                    type="time"
                    id="startTime"
                    name="startTime"
                    inputValue={inputValue.startTime}
                    onInputChange={(e) =>
                      setInputValue((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                  <div className="h-10 flex justify-center items-center">
                    至
                  </div>
                  <DefaultInput
                    type="time"
                    id="endTime"
                    name="endTime"
                    inputValue={inputValue.endTime}
                    onInputChange={(e) =>
                      setInputValue((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <DefaultInput
                  type="number"
                  id="minHour"
                  name="minHour"
                  label="最低時數"
                  placeholder="請輸入最低時數"
                  inputValue={inputValue.minHour}
                  onInputChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
                <div className="h-10 flex justify-center items-center">時</div>
              </div>
            </div>
            <DefaultTextarea
              id="intro"
              name="intro"
              label="志工介紹"
              placeholder="請輸入志工介紹"
              inputValue={inputValue.intro}
              onInputChange={(e) =>
                setInputValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
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

export default VolunteerForm;
