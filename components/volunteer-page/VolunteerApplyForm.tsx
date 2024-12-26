import { FormEvent } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import validator from "validator";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  resetApplyForm,
  updatedErrorStatus,
  updatedFormInput,
} from "@/slices/volunteerSlice";
import { clientFetch } from "@/lib/fetch";
import DefaultInput from "../common/input/DefaultInput";
import DefaultCheckbox from "../common/input/DefaultCheckbox";
import { convertMinToTime } from "@/helpers/time-helpers";
import { VolunteerApplyInputType } from "@/types/volunteer";

const VolunteerApplyForm = () => {
  const dispatch = useDispatch();
  const { applyValue, isError, volunteerDetail } = useSelector(
    (state: RootState) => state.volunteer
  );

  const currDate = dayjs().format("YYYY-MM-DD");
  const data_startTime =
    volunteerDetail && convertMinToTime(volunteerDetail?.startTime);
  const data_endTime =
    volunteerDetail && convertMinToTime(volunteerDetail?.endTime);
  const valid_starttime = new Date(`${currDate}T${data_startTime}`);
  const valid_endtime = new Date(`${currDate}T${data_endTime}`);
  const input_starttime = new Date(
    `${currDate}T${convertMinToTime(applyValue.startTime)}`
  );

  const valid_date = volunteerDetail?.date
    ? new Date(volunteerDetail?.date)
    : new Date();

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedFormInput({ name, value }));
  };
  const handleModalCanceled = () => {
    dispatch(resetApplyForm());
  };

  const inputErrorChecked = (inputValue: VolunteerApplyInputType) => {
    const { name, phone, email, date, startTime, hours } = inputValue;
    let error = { status: false, message: "" };
    switch (true) {
      case !name || !phone || !email:
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
      case volunteerDetail?.date !== null && volunteerDetail?.date !== date:
        error = {
          status: true,
          message: `選擇日期錯誤: 只能選擇${volunteerDetail?.date}`,
        };
        break;
      case volunteerDetail &&
        startTime + hours * 60 >= volunteerDetail?.endTime:
        error = {
          status: true,
          message: `選擇時間錯誤: 開始時間與工作時數不可超過結束時間${data_endTime}`,
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

  const handleApplySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inputErrorChecked(applyValue)) {
      return;
    }
    const { name, phone, email, date, startTime, hours, needProven } =
      applyValue;
    const body = { name, phone, email, date, startTime, hours, needProven };
    try {
      const response = await clientFetch(
        `/volunteers/${applyValue.findVolunteerId}/apply`,
        {
          method: "POST",
          body,
        }
      );

      if (!response.success) {
        toast.error("申請志工失敗，請在試一次");
      } else {
        toast.success("申請志工成功");
        // send a email here
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleApplySubmit}>
      <div className="flex flex-col gap-4">
        <DefaultInput
          label="姓名"
          id="name"
          name="name"
          placeholder="請輸入姓名"
          inputValue={applyValue.name}
          onInputChange={handleInputChange}
        />
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            label="電話"
            type="tel"
            id="phone"
            name="phone"
            placeholder="請輸入電話"
            inputValue={applyValue.phone}
            onInputChange={handleInputChange}
          />
          <DefaultInput
            label="電子郵件"
            type="email"
            id="email"
            name="email"
            placeholder="請輸入電子郵件"
            inputValue={applyValue.email}
            onInputChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h5 className="font-medium">選擇日期</h5>
            <DatePicker
              dateFormat="YYYY-MM-dd"
              selected={valid_date}
              disabledKeyboardNavigation
              disabled={
                !volunteerDetail ||
                (volunteerDetail && volunteerDetail?.date !== null)
              }
              onChange={(date) => {
                const input_date = dayjs(date).format("YYYY-MM-DD");
                handleInputChange("date", input_date);
              }}
              minDate={new Date()}
              maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
              className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs disabled:bg-gray-200 disabled:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="font-medium">工作時間</h5>
            <DatePicker
              showTimeSelect
              showTimeSelectOnly
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              selected={input_starttime}
              minTime={valid_starttime}
              maxTime={valid_endtime}
              className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
              onChange={(time) => {
                const hours = dayjs(time).format("HH");
                const mins = dayjs(time).format("mm");
                const starttime = Number(hours) * 60 + Number(mins);
                handleInputChange("startTime", starttime);
              }}
            />
          </div>
          <DefaultInput
            label="工作時數"
            type="number"
            id="hours"
            name="hours"
            placeholder="請輸入工作時數"
            inputValue={applyValue.hours}
            onInputChange={handleInputChange}
          />
        </div>
        <DefaultCheckbox
          label="是否需要證明"
          id="needProven"
          name="needProven"
          inputValue={applyValue.needProven}
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
            提交
          </button>
        </div>
      </div>
    </form>
  );
};

export default VolunteerApplyForm;
