import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  getPartnerData,
  updatedErrorStatus,
  updatedFormInput,
  updatedModalCanceled,
} from "@/slices/partnerSlice";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import validator from "validator";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import DefaultInput from "../common/input/DefaultInput";
import DefaultSelect from "../common/input/DefaultSelect";
import { weekday_options } from "@/datas/weekday-option";
import { convertMinToTime } from "@/helpers/time-helpers";
import { PartnerInputType } from "@/types/partner";
import { clientFetch } from "@/lib/fetch";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

const PartnerForm = () => {
  const token = getCookie("staffToken");
  const dispatch = useDispatch();
  const { inputValue, type, isError, currentUser, partnerData } = useSelector(
    (state: RootState) => state.partner
  );
  const [passwordShowed, setPasswordShowed] = useState(false);
  const type_str = type === "create" ? "新增" : "修改";

  const curr_date = dayjs().format("YYYY-MM-DD");
  const opening_time = convertMinToTime(inputValue.openingTime);
  const closing_time = convertMinToTime(inputValue.closingTime);
  const day_start = new Date(`${curr_date}T00:00`);
  const day_end = new Date(`${curr_date}T23:59`);
  const opening = new Date(`${curr_date}T${opening_time}`);
  const closing = new Date(`${curr_date}T${closing_time}`);

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedFormInput({ name, value }));
  };
  const handleModalClosed = () => {
    dispatch(updatedModalCanceled());
  };

  const inputErrorChecked = (inputValue: PartnerInputType) => {
    const {
      name,
      account,
      email,
      weekStart,
      weekEnd,
      openingTime,
      closingTime,
    } = inputValue;

    let error = { status: false, message: "" };

    switch (true) {
      case !name || !account || !email:
        error = {
          status: true,
          message: "請確實填寫以下資訊: 店名、帳號、電子郵件、密碼",
        };
        break;
      case !validator.isEmail(email):
        error = {
          status: true,
          message: "無效電子郵件",
        };
        break;
      case account.length < 6 || account.length > 20:
        error = {
          status: true,
          message: "帳號請介於6-20字之間",
        };
        break;
      case weekStart.value > weekEnd.value:
        error = {
          status: true,
          message: `營業時間錯誤: ${weekStart.label}不可大於${weekEnd.label}`,
        };
        break;
      case openingTime >= closingTime:
        error = {
          status: true,
          message: `營業時間錯誤: ${openingTime}不可大於${closingTime}`,
        };
        break;
      default:
        error = {
          status: false,
          message: "",
        };
        break;
    }

    dispatch(updatedErrorStatus(error));
    return error.status;
  };
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (type === "create" && !currentUser?.isAdmin) {
      toast.error("使用者沒有建立新夥伴的權限");
      return;
    }

    if (
      type === "edit" &&
      !currentUser?.isAdmin &&
      currentUser?.id !== inputValue.partnerId
    ) {
      toast.error("使用者沒有修改夥伴資料的權限");
      return;
    }

    if (inputErrorChecked(inputValue)) {
      return;
    }

    const method = type === "create" ? "POST" : "PUT";
    const url =
      type === "create"
        ? "/admin/partners"
        : `/admin/partners/${inputValue.partnerId}`;
    const {
      name,
      account,
      email,
      phone,
      address,
      password,
      weekStart,
      weekEnd,
      openingTime,
      closingTime,
    } = inputValue;
    const body = {
      name,
      account,
      email,
      phone,
      address,
      ...(password ? { password } : {}),
      weekStart: weekStart.value,
      weekEnd: weekEnd.value,
      openingTime,
      closingTime,
    };

    try {
      const response = await clientFetch(url, {
        method,
        body,
        token,
      });

      if (!response.success) {
        toast.error(`${type_str}毛孩夥伴失敗，請再試一次`);
        return;
      }

      const updatedData =
        type === "create"
          ? [...partnerData, response.data]
          : partnerData.map((item) =>
              item.id === inputValue.partnerId ? response.data : item
            );

      toast.success(`${type_str}毛孩夥伴成功`);
      dispatch(getPartnerData({ data: updatedData }));
      handleModalClosed();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_2fr]">
          <DefaultInput
            id="name"
            name="name"
            label="店名"
            placeholder="請輸入店名"
            inputValue={inputValue.name}
            onInputChange={handleInputChange}
          />
          <DefaultInput
            id="address"
            name="address"
            label="地址"
            placeholder="請輸入地址"
            inputValue={inputValue.address}
            onInputChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            id="account"
            name="account"
            label="帳號"
            placeholder="請輸入帳號"
            inputValue={inputValue.account}
            onInputChange={handleInputChange}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-medium">
              密碼
            </label>
            <div className="w-full h-10 bg-skin-60 text-wine rounded-lg relative">
              <input
                type={passwordShowed ? "text" : "password"}
                id="password"
                name="password"
                placeholder="請輸入密碼"
                className="leading-10 px-4 border-0 bg-transparent placeholder:text-dark-40 placeholder:text-xs"
                value={inputValue.password}
                onChange={(e) => {
                  const { name, value } = e.target;
                  handleInputChange(name, value);
                }}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xl"
                onClick={() => setPasswordShowed(!passwordShowed)}
              >
                {passwordShowed ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            id="email"
            name="email"
            label="電子郵件"
            type="email"
            placeholder="請輸入電子郵件"
            inputValue={inputValue.email}
            onInputChange={handleInputChange}
          />
          <DefaultInput
            id="phone"
            name="phone"
            label="電話"
            type="tel"
            placeholder="請輸入電話"
            inputValue={inputValue.phone}
            onInputChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-[1fr_40px_1fr] gap-2 items-end">
          <DefaultSelect
            title="營業時間"
            options={weekday_options}
            name="weekStart"
            inputValue={inputValue.weekStart}
            onSelectChange={handleInputChange}
          />
          <p className="text-dark-60 text-sm text-center">至</p>
          <DefaultSelect
            options={weekday_options}
            name="weekEnd"
            inputValue={inputValue.weekEnd}
            onSelectChange={handleInputChange}
          />
        </div>
        <div className="grid grid-cols-[1fr_40px_1fr] gap-2 items-end">
          <DatePicker
            showTimeSelect
            showTimeSelectOnly
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            minTime={day_start}
            maxTime={closing}
            className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
            selected={opening}
            onChange={(time) => {
              const hours = dayjs(time).format("HH");
              const mins = dayjs(time).format("mm");
              const opening = Number(hours) * 60 + Number(mins);
              // console.log(opening);
              handleInputChange("openingTime", opening);
            }}
          />
          <p className="text-dark-60 text-sm text-center">至</p>
          <DatePicker
            showTimeSelect
            showTimeSelectOnly
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            minTime={opening}
            maxTime={day_end}
            className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
            selected={closing}
            onChange={(time) => {
              const hours = dayjs(time).format("HH");
              const mins = dayjs(time).format("mm");
              const closing = Number(hours) * 60 + Number(mins);
              handleInputChange("closingTime", closing);
            }}
          />
        </div>
      </div>
      {isError.status && <p className="text-heart">{isError.message}</p>}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleModalClosed}
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
    </form>
  );
};

export default PartnerForm;
