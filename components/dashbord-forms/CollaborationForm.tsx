/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import DefaultInput from "@/components/common/DefaultInput";
import DefaultSelect from "../common/DefaultSelect";
import { IoIosArrowDown } from "react-icons/io";
import { getTwCity } from "@/datas/twCityDistricts";
import { weekday_options } from "@/datas/weekday-option";
type CollaborateInput = {
  name: string;
  email: string;
  phone: string;
  location: string;
  opening: string;
  closing: string;
};

const CollaborationForm = () => {
  const cityRef = useRef<any>(null);
  const weekstartRef = useRef<any>(null);
  const weekendRef = useRef<any>(null);
  const [isShowed, setIsShowed] = useState(false);
  const [inputValue, setInputValue] = useState<CollaborateInput>({
    name: "",
    email: "",
    phone: "",
    location: "",
    opening: "",
    closing: "",
  });
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setIsShowed(!isShowed)}
        className="flex justify-center items-center gap-1 w-1/5 max-w-[140px] py-2 bg-heart text-white text-lg rounded-lg"
      >
        <div className="">新增夥伴</div>
        <div className={`${isShowed && "rotate-180"} transition`}>
          <IoIosArrowDown />
        </div>
      </button>
      {isShowed && (
        <form className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <DefaultInput
              id="name"
              name="name"
              label="夥伴店名"
              placeholder="請輸入夥伴店名"
              inputValue={inputValue.name}
              onInputChange={(e) =>
                setInputValue((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <DefaultInput
                id="email"
                name="email"
                label="夥伴Email"
                placeholder="請輸入夥伴Email"
                inputValue={inputValue.email}
                onInputChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <DefaultInput
                id="phone"
                name="phone"
                label="夥伴電話"
                placeholder="請輸入夥伴電話"
                inputValue={inputValue.phone}
                onInputChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-[1fr_4fr] items-end gap-4">
              <DefaultSelect
                title="夥伴位置"
                options={getTwCity()}
                placeholder="夥伴位置"
                ref={cityRef}
                name="city"
                inputValue={getTwCity()[0]}
              />
              <DefaultInput
                id="location"
                name="location"
                label="夥伴地址"
                placeholder="請輸入夥伴地址"
                inputValue={inputValue.location}
                onInputChange={(e) =>
                  setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4 items-end">
              <div className="grid grid-cols-[1fr_20px_1fr] gap-2 items-end">
                <DefaultSelect
                  title="營業時間"
                  options={weekday_options}
                  // placeholder="營業時間"
                  inputValue={weekday_options[0]}
                  ref={weekstartRef}
                  name="week"
                />
                <div className="h-10 flex justify-center items-center">至</div>
                <DefaultSelect
                  options={weekday_options}
                  // placeholder="夥伴位置"
                  inputValue={weekday_options[6]}
                  ref={weekendRef}
                  name="week"
                />
              </div>
              <div className="grid grid-cols-[1fr_20px_1fr] gap-2 items-end">
                <DefaultInput
                  type="time"
                  id="opening"
                  name="opening"
                  inputValue={inputValue.opening}
                  onInputChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
                <div className="h-10 flex justify-center items-center">至</div>
                <DefaultInput
                  type="time"
                  id="closing"
                  name="closing"
                  inputValue={inputValue.closing}
                  onInputChange={(e) =>
                    setInputValue((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-[2fr_3fr] gap-4"></div>
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

export default CollaborationForm;
