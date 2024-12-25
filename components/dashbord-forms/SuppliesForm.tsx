import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { RootState } from "@/store";
import { clientFetch } from "@/lib/fetch";
import { SelectOptionType } from "@/types/default";
import { SupplyInputType } from "@/types/supply";
import DefaultInput from "../common/input/DefaultInput";
import DefaultSelect from "../common/input/DefaultSelect";
import DefaultTextarea from "../common/input/DefaultTextarea";
import { IoIosArrowDown } from "react-icons/io";
import {
  updatedModalShowed,
  updatedModalCanceled,
  updatedFormInput,
  updatedErrorStatus,
  getSupplyData,
} from "@/slices/supplySlice";

interface SuppliesFormProps {
  partners: SelectOptionType[];
}

const SuppliesForm = ({ partners }: SuppliesFormProps) => {
  const token = getCookie("staffToken");
  const dispatch = useDispatch();
  const { inputValue, type, isShowed, isError, supplyData } = useSelector(
    (state: RootState) => state.supply
  );
  const type_str = type === "create" ? "新增" : "修改";

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedFormInput({ name, value }));
  };
  const handleModalShowed = () => {
    dispatch(updatedModalShowed());
  };
  const handleModalCanceled = () => {
    dispatch(updatedModalCanceled());
  };

  const inputErrorChecked = (inputValue: SupplyInputType) => {
    const { name, number, location } = inputValue;
    if (!name || !location.value) {
      dispatch(
        updatedErrorStatus({
          status: true,
          message: "請確實填寫以下資訊: 物資名稱、寄送地點",
        })
      );
      return;
    }

    if (number <= 1) {
      dispatch(
        updatedErrorStatus({
          status: true,
          message: "最低數量需大於1",
        })
      );
      return;
    }

    dispatch(
      updatedErrorStatus({
        status: false,
        message: "",
      })
    );
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    inputErrorChecked(inputValue);

    if (isError.status) return;

    const method = type === "create" ? "POST" : "PUT";
    const url =
      type === "create"
        ? "/admin/supplies"
        : `/admin/supplies/${inputValue.supplyId}`;

    const body = {
      userId: inputValue.location.value,
      supplyName: inputValue.name,
      number: inputValue.number,
      introduction: inputValue.intro,
    };

    try {
      const response = await clientFetch(url, {
        method,
        token,
        body,
      });
      if (!response.success) {
        toast.error(`${type_str}需求物資失敗，請再試一次`);
        return;
      }
      const partner = partners.find(
        (partner) => partner.value === Number(response.data.userId)
      );
      const data = {
        ...response.data,
        partner: {
          id: partner?.value,
          name: partner?.label,
        },
      };
      const updatedData =
        type === "create"
          ? [...supplyData, data]
          : supplyData.map((item) =>
              item.id === inputValue.supplyId ? data : item
            );
      toast.success(`${type_str}需求物資成功`);
      dispatch(getSupplyData({ data: updatedData }));
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
        <div className="">物資招募</div>
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
            <DefaultSelect
              title="寄送地點"
              name="location"
              placeholder="請選擇毛孩之家"
              inputValue={inputValue.location}
              onSelectChange={handleInputChange}
              options={partners}
            />
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4">
              <DefaultInput
                id="name"
                name="name"
                label="物資名稱"
                placeholder="請輸入物資名稱"
                inputValue={inputValue.name}
                onInputChange={handleInputChange}
              />
              <DefaultInput
                id="number"
                name="number"
                type="number"
                label="最低數量"
                placeholder="請輸入最低數量"
                inputValue={inputValue.number}
                onInputChange={handleInputChange}
              />
            </div>

            <DefaultTextarea
              id="intro"
              name="intro"
              label="物資簡介"
              placeholder="請簡述物資簡介"
              inputValue={inputValue.intro}
              onInputChange={handleInputChange}
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

export default SuppliesForm;
