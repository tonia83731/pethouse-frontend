import { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import DefaultInput from "../common/input/DefaultInput";
import DefaultCheckbox from "../common/input/DefaultCheckbox";
import { VolunteerFormProps } from "@/pages/volunteer";

type VolunteerProps = {
  applyInput: VolunteerFormProps;
  applyAvailableTime: null | number;
  isError: {
    status: boolean;
    message: string;
  };
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (date: Date) => void;
  onTimeChange: (type: "startTime", time: string) => void;
};

const VolunteerApplyForm = ({
  applyInput,
  applyAvailableTime,
  isError,
  onInputChange,
  onDateChange,
  onTimeChange,
  onCheckboxChange,
}: VolunteerProps) => {
  const disabledWeekday = (date: Date) => {
    if (applyAvailableTime === null) return true;
    return date.getDay() === applyAvailableTime;
  };
  const currDate = dayjs().format("YYYY-MM-DD");
  const valid_starttime = new Date(`${currDate}T${applyInput.startTime}`);
  // console.log(valid_starttime);
  return (
    <div className="flex flex-col gap-4">
      <DefaultInput
        label="姓名"
        id="name"
        name="name"
        placeholder="請輸入姓名"
        inputValue={applyInput.name}
        onInputChange={(e) => onInputChange(e)}
      />
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          label="電話"
          type="tel"
          id="phone"
          name="phone"
          placeholder="請輸入電話"
          inputValue={applyInput.phone}
          onInputChange={(e) => onInputChange(e)}
        />
        <DefaultInput
          label="電子郵件"
          type="email"
          id="email"
          name="email"
          placeholder="請輸入電子郵件"
          inputValue={applyInput.email}
          onInputChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <h5 className="font-medium">選擇日期</h5>
          <DatePicker
            dateFormat="YYYY-MM-dd"
            selected={applyInput.date}
            disabledKeyboardNavigation
            filterDate={disabledWeekday}
            onChange={(date) => onDateChange(date as Date)}
            minDate={new Date()}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
            className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
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
            selected={valid_starttime}
            className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
            onChange={(time) => {
              const starttime = dayjs(time).format("HH:mm");
              console.log(starttime);
              onTimeChange("startTime", starttime);
            }}
          />
        </div>
        <DefaultInput
          label="工作時數"
          type="number"
          id="hours"
          name="hours"
          placeholder="請輸入工作時數"
          inputValue={applyInput.hours}
          onInputChange={(e) => onInputChange(e)}
        />
      </div>
      <DefaultCheckbox
        label="是否需要證明"
        id="needProven"
        name="needProven"
        inputValue={applyInput.needProven}
        onCheckboxChange={(e) => onCheckboxChange(e)}
      />
      {isError.status && <p className="text-heart">{isError.message}</p>}
    </div>
  );
};

export default VolunteerApplyForm;
