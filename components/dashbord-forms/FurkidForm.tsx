/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { RootState } from "@/store";
import {
  updatedFormInput,
  updatedModalShowed,
  updatedModalCanceled,
  updatedImageInput,
  updatedErrorStatus,
  getFurkidData,
} from "@/slices/furkidSlice";
import { SelectOptionType } from "@/types/default";
import { FurkidInputType } from "@/types/furkid";
import { clientFetch } from "@/lib/fetch";
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
import { toast } from "react-toastify";

export type AdoptionInput = {
  id: number | null;
  name: string;
  gender: string;
  animal: string | null;
  size: string | null;
  age: string | null;
  isNeutured: boolean;
  isVaccinated: boolean;
  location: OptionType;
};

interface FurkidFormProps {
  partners: SelectOptionType[];
}

const FurkidForm = ({ partners }: FurkidFormProps) => {
  const token = getCookie("staffToken");
  const { inputValue, furkidData, type, isShowed, isError } = useSelector(
    (state: RootState) => state.furkid
  );
  const type_str = type === "create" ? "新增" : "修改";
  const [fileError, setFileError] = useState({
    status: false,
    message: "",
  });
  const [filePrev, setFilePrev] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedFormInput({ name, value }));
  };
  const handleModalShowed = () => {
    dispatch(updatedModalShowed());
  };
  const handleModalCanceled = () => {
    setFilePrev("");
    dispatch(updatedModalCanceled());
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const MAX_SIZE = 500 * 1024 * 1024;
    const valid_types = ["image/jpeg", "image/png"];

    if (!file) return;
    if (!valid_types.includes(file.type)) {
      setFileError({
        status: true,
        message: "圖片非JPG, JPEG, PNG檔，請在試一次",
      });
      return;
    }

    if (file.size > MAX_SIZE) {
      setFileError({
        status: true,
        message: "圖片超過500MB，請在試一次",
      });
      return;
    }

    setFileError({ status: false, message: "" });

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePrev(reader.result as string);
    };
    reader.readAsDataURL(file);
    dispatch(updatedImageInput(file));
  };

  const inputErrorChecked = (inputValue: FurkidInputType) => {
    const { name, location } = inputValue;
    if (!name || !location.value) {
      dispatch(
        updatedErrorStatus({
          status: true,
          message: "請確實填寫以下資訊: 毛孩姓名、毛孩之家",
        })
      );
      return;
    } else {
      dispatch(
        updatedErrorStatus({
          status: false,
          message: "",
        })
      );
    }
  };
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    inputErrorChecked(inputValue);

    if (isError.status || fileError.status) return;

    const method = type === "create" ? "POST" : "PUT";
    const url =
      type === "create"
        ? "/admin/furkids"
        : `/admin/furkids/${inputValue.furkidId}`;

    const formData = new FormData();
    formData.append("name", inputValue.name);
    formData.append("gender", inputValue.gender);
    formData.append("size", inputValue.size);
    formData.append("age", inputValue.age);
    formData.append("animal", inputValue.animal);
    formData.append("isNeutured", inputValue.isNeutured.toString());
    formData.append("isVaccinated", inputValue.isVaccinated.toString());
    formData.append("userId", inputValue.location.value);
    if (inputValue.avatar) formData.append("file", inputValue.avatar);

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value instanceof File ? value.name : value);
    // }
    try {
      const response = await clientFetch(url, {
        method,
        body: formData,
        token,
      });

      if (!response.success) {
        toast.error(`${type_str}毛孩資料失敗，請再試一次`);
        return;
      }

      const partner = partners.find(
        (partner) => partner.value === Number(response.data.userId)
      );
      // console.log(partner);
      const data = {
        ...response.data,
        partner: {
          id: partner?.value,
          name: partner?.label,
        },
        adoptionNumber: 0,
        userId: undefined,
      };

      const updatedData =
        type === "create"
          ? [...furkidData, data]
          : furkidData.map((item) =>
              item.id === inputValue.furkidId ? data : item
            );

      toast.success(`${type_str}毛孩資料成功`);
      dispatch(getFurkidData({ data: updatedData }));
      handleModalCanceled();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleModalShowed}
        className="flex justify-center items-center gap-1 w-full lg:w-1/5 lg:max-w-[140px] py-2 bg-heart text-white lg:text-lg rounded-lg"
      >
        <div className="">{type_str}毛孩</div>
        <div className={`${isShowed && "rotate-180"} transition`}>
          <IoIosArrowDown />
        </div>
      </button>
      {isShowed && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            {/* avatar */}
            <div className="flex gap-8 items-end">
              <div className={`w-[210px] h-[150px] rounded-lg`}>
                {filePrev ? (
                  <Image
                    src={filePrev}
                    width={450}
                    height={300}
                    alt={inputValue.name}
                    className="w-full h-full object-cover border rounded-lg"
                  ></Image>
                ) : inputValue.avatar ? (
                  <Image
                    src={inputValue.avatar as string}
                    width={450}
                    height={300}
                    alt={inputValue.name}
                    className="w-full h-full object-cover border rounded-lg"
                  ></Image>
                ) : (
                  <div className="bg-skin-60 text-dark-40 text-xs w-full h-full rounded-lg flex justify-center items-center">
                    <p>尚未選擇檔案</p>
                  </div>
                )}
              </div>
              <label htmlFor="avatar" className="">
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="flex flex-col gap-2">
                  <span className="w-fit cursor-pointer shadow-md rounded-md bg-dark-5 px-4 py-1 hover:bg-white hover:shadow-xl">
                    上傳檔案
                  </span>
                  <p className="text-xs text-dark-40">
                    檔案需為500MB以下JPG, JPEG, PNG檔
                  </p>
                  {fileError.status && (
                    <p className="text-xs text-heart">{fileError.message}</p>
                  )}
                </div>
              </label>
            </div>
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
              {/* name */}
              <DefaultInput
                id="name"
                name="name"
                label="毛孩姓名"
                placeholder="請輸入毛孩姓名"
                inputValue={inputValue.name}
                onInputChange={handleInputChange}
              />
              {/* location */}
              <DefaultSelect
                title="毛孩之家"
                name="location"
                placeholder="請選擇毛孩之家"
                inputValue={inputValue.location}
                onSelectChange={handleInputChange}
                options={partners}
              />
            </div>
            <div className="lg:grid lg:grid-cols-[2fr_3fr] flex flex-col gap-4">
              <DefaultRadio
                title="毛孩姓別"
                options={gender_options}
                name="gender"
                inputValue={inputValue.gender}
                onRadioChange={handleInputChange}
              />
              <DefaultRadio
                title="毛孩類別"
                options={animal_options}
                name="animal"
                inputValue={inputValue.animal}
                onRadioChange={handleInputChange}
              />
            </div>
            <div className="lg:grid lg:grid-cols-[2fr_3fr] flex flex-col gap-4">
              <DefaultRadio
                title="毛孩年齡"
                options={age_options}
                name="age"
                inputValue={inputValue.age}
                onRadioChange={handleInputChange}
              />
              <DefaultRadio
                title="毛孩體型"
                options={size_options}
                name="size"
                inputValue={inputValue.size}
                onRadioChange={handleInputChange}
              />
            </div>
            <DefaultCheckbox
              label="是否進行絕育?"
              id="isNeutured"
              name="isNeutured"
              inputValue={inputValue.isNeutured}
              onCheckboxChange={handleInputChange}
            />
            <DefaultCheckbox
              label="是否施打疫苗?"
              id="isVaccinated"
              name="isVaccinated"
              inputValue={inputValue.isVaccinated}
              onCheckboxChange={handleInputChange}
            />
          </div>
          {isError.status && <p className="text-heart">{isError.message}</p>}
          <div className="w-full flex justify-end">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleModalCanceled}
                className="font-medium py-1 px-6 bg-dark-40 text-white rounded-lg hover:drop-shadow-lg"
              >
                取消
              </button>
              <button
                type="submit"
                className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg"
              >
                {type_str}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default FurkidForm;
