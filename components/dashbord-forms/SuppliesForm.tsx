import { ChangeEvent, FormEvent } from "react";
import DefaultInput from "@/components/common/input/DefaultInput";
import DefaultSelect, { OptionType } from "../common/input/DefaultSelect";
import DefaultTextarea from "../common/input/DefaultTextarea";
import { SuppliesInput } from "@/pages/dashboard/supplies";
import { IoIosArrowDown } from "react-icons/io";

interface SuppliesFormProps {
  partners: OptionType[];
  type: "create" | "edit" | null;
  isShowed: boolean;
  inputValue: SuppliesInput;
  isError: {
    status: boolean;
    message: any;
  };
  onShowClick: () => void;
  onFormCancel: () => void;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (value: any) => void;
  onFormSubmit: (e: FormEvent) => void;
}

const SuppliesForm = ({
  partners,
  type,
  isShowed,
  isError,
  inputValue,
  onShowClick,
  onFormCancel,
  onInputChange,
  onSelectChange,
  onFormSubmit,
}: SuppliesFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={onShowClick}
        className="flex justify-center items-center gap-1 w-full lg:w-1/5 lg:max-w-[140px] py-2 bg-heart text-white lg:text-lg rounded-lg"
      >
        <div className="">物資招募</div>
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
            <DefaultSelect
              title="寄送地點"
              name="location"
              placeholder="請選擇寄送地點"
              inputValue={inputValue.location}
              onSelectChange={onSelectChange}
              options={partners}
            />
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
              <DefaultInput
                id="name"
                name="name"
                label="需求物資名稱"
                placeholder="請輸入需求物資名稱"
                inputValue={inputValue.name}
                onInputChange={(e) => onInputChange(e)}
              />
              <DefaultInput
                type="number"
                id="number"
                name="number"
                label="需求數量"
                placeholder="請輸入需求數量"
                inputValue={inputValue.number}
                onInputChange={(e) => onInputChange(e)}
              />
            </div>
            <DefaultTextarea
              id="intro"
              name="intro"
              label="備註"
              placeholder="請輸入備註"
              inputValue={inputValue.intro}
              onInputChange={(e) => onInputChange(e)}
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

export default SuppliesForm;
