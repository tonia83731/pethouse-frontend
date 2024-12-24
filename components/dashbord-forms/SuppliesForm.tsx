import { ChangeEvent, FormEvent } from "react";
// import DefaultInput from "@/components/common/input/DefaultInput";
import DefaultSelect, { OptionType } from "../common/input/DefaultSelect";
import DefaultTextarea from "../common/input/DefaultTextarea";
import { SuppliesInput } from "@/pages/dashboard/supplies";
import { IoIosArrowDown } from "react-icons/io";
import DefaultHookInput from "../common/input-hook/DefaultInput";
import DefaultHookTextarea from "../common/input-hook/DefaultTextarea";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useForm, Controller } from "react-hook-form";
import DefaultHookSelect from "../common/input-hook/DefaultSelect";
import { SupplyInputType } from "@/slices/supplySlice";
// import { RootState } from "@reduxjs/toolkit/query";
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
  // type,
  isShowed,
  // isError,
  // inputValue,
  onShowClick,
  onFormCancel,
}: // onInputChange,
// onSelectChange,
// onFormSubmit,
SuppliesFormProps) => {
  const { inputValue, type } = useSelector((state: RootState) => state.supply);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: inputValue,
  });

  const handleSupplyFormSubmit = (data: SupplyInputType) => {
    console.log(data, errors);
  };

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
          onSubmit={handleSubmit(handleSupplyFormSubmit)}
          className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <DefaultHookSelect
              title="寄送地點"
              name="location"
              placeholder="請選擇寄送地點"
              inputValue={inputValue.location}
              options={partners}
              control={control}
              error={errors.location}
            />
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
              <DefaultHookInput
                id="name"
                name="name"
                label="物資名稱"
                placeholder="請輸入物資名稱"
                error={errors.name}
                register={register}
                rules={{ required: "物資名稱為必填" }}
              />
              <DefaultHookInput
                id="number"
                type="number"
                name="number"
                label="最低數量"
                placeholder="請輸入最低數量"
                error={errors.number}
                register={register}
                rules={{
                  required: "最低數量為必填",
                  validate: (value: any) =>
                    Number(value) > 0 || "最低數量需大於0",
                }}
              />
            </div>
            <DefaultHookTextarea
              id="intro"
              name="intro"
              label="物資詳細資料"
              placeholder="請輸入物資詳細資料"
              error={errors.intro}
              register={register}
              rules={{
                validate: (value: any) => {
                  const wordCount = value.split(/\s+/).filter(Boolean).length;
                  return (
                    wordCount <= 300 ||
                    `詳細資料不可超過300個字，目前字數: ${wordCount}`
                  );
                },
              }}
            />
          </div>
          {/* {isError.status && <p className="text-heart">{isError.message}</p>} */}
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
