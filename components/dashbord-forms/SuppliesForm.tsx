/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import DefaultInput from "@/components/common/DefaultInput";
import DefaultSelect from "../common/DefaultSelect";
import DefaultTextarea from "../common/DefaultTextarea";
import { IoIosArrowDown } from "react-icons/io";

import { dummy_collaboration_data } from "@/datas/dummy/collaboration_data";

type SuppliesInput = {
  name: string;
  number: number;
  intro: string;
};

const SuppliesForm = () => {
  const locationRef = useRef<any>(null);
  const [isShowed, setIsShowed] = useState(false);
  const [inputValue, setInputValue] = useState<SuppliesInput>({
    name: "",
    number: 1,
    intro: "",
  });
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setIsShowed(!isShowed)}
        className="flex justify-center items-center gap-1 w-1/5 max-w-[140px] py-2 bg-heart text-white text-lg rounded-lg"
      >
        <div className="">物資招募</div>
        <div className={`${isShowed && "rotate-180"} transition`}>
          <IoIosArrowDown />
        </div>
      </button>
      {isShowed && (
        <form className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <DefaultSelect
              title="寄送地點"
              name="location"
              placeholder="請選擇寄送地點"
              ref={locationRef}
              options={dummy_collaboration_data}
            />
            <div className="grid grid-cols-2 gap-4">
              <DefaultInput
                id="name"
                name="name"
                label="需求物資名稱"
                placeholder="請輸入需求物資名稱"
                inputValue={inputValue.name}
                onInputChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <DefaultInput
                type="number"
                id="number"
                name="number"
                label="需求數量"
                placeholder="請輸入需求數量"
                inputValue={inputValue.number}
                onInputChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <DefaultTextarea
              id="intro"
              name="intro"
              label="備註"
              placeholder="請輸入備註"
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

export default SuppliesForm;
