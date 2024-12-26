import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  updatedFormInput,
  updatedModalShowed,
  resetForm,
  updatedErrorStatus,
  getVolunteerData,
} from "@/slices/dashboarVolunteerSlice";
import DatePicker from "react-datepicker";
import DefaultInput from "@/components/common/input/DefaultInput";
import DefaultSelect, { OptionType } from "../common/input/DefaultSelect";
import DefaultTextarea from "../common/input/DefaultTextarea";
import { IoIosArrowDown } from "react-icons/io";
import dayjs from "dayjs";
import { convertMinToTime } from "@/helpers/time-helpers";
import DefaultCheckbox from "../common/input/DefaultCheckbox";
import { FormEvent } from "react";
import { VolunteerInputType } from "@/types/volunteer";
import { clientFetch } from "@/lib/fetch";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";
interface VolunteerFormProps {
  partners: OptionType[];
}

const VolunteerForm = ({ partners }: VolunteerFormProps) => {
  const dispatch = useDispatch();
  const token = getCookie("staffToken");
  const { isShowed, isError, type, inputValue, volunteerData } = useSelector(
    (state: RootState) => state.dashboardVolunteer
  );
  const type_str = type === "create" ? "新增" : "修改";
  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedFormInput({ name, value }));
  };
  const handleFormShowed = () => {
    dispatch(updatedModalShowed());
  };
  const handleFormCancel = () => {
    dispatch(resetForm());
  };

  const curr_date = dayjs().format("YYYY-MM-DD");
  const day_start = new Date(`${curr_date}T00:00`);
  const day_end = new Date(`${curr_date}T23:59`);
  const start_time = convertMinToTime(inputValue.startTime);
  const end_time = convertMinToTime(inputValue.endTime);
  const start = new Date(`${curr_date}T${start_time}`);
  const end = new Date(`${curr_date}T${end_time}`);
  const select_date = inputValue.date ? new Date(inputValue.date) : null;

  const inputErrorChecked = (inputValue: VolunteerInputType) => {
    const { startTime, endTime, perPerson, minHour, intro, location } =
      inputValue;
    let error = { status: false, message: "" };

    switch (true) {
      case !location.value:
        error = {
          status: true,
          message: "請確實填寫以下資訊: 毛孩之家",
        };
        break;
      case startTime >= endTime:
        error = {
          status: true,
          message: `營業時間錯誤: ${startTime}不可大於${endTime}`,
        };
        break;
      case perPerson < 1:
        error = {
          status: true,
          message: "所需人數需大於1",
        };
        break;
      case minHour < 1:
        error = {
          status: true,
          message: "最低時數需大於1",
        };
        break;
      case intro.length > 300:
        error = {
          status: true,
          message: "簡介字數需介於0-300之間",
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
    if (inputErrorChecked(inputValue)) {
      return;
    }
    const method = type === "create" ? "POST" : "PUT";
    const url =
      type === "create"
        ? "/admin/volunteers"
        : `/admin/volunteers/${inputValue.volunteerId}`;

    const body = {
      userId: inputValue.location.value,
      perPerson: inputValue.perPerson,
      date: inputValue.date,
      startTime: inputValue.startTime,
      endTime: inputValue.endTime,
      minHour: inputValue.minHour,
      introduction: inputValue.intro,
    };

    try {
      const response = await clientFetch(url, {
        method,
        token,
        body,
      });
      if (!response.success) {
        toast.error(`${type_str}需求志工失敗，請再試一次`);
        return;
      }

      const partner = partners.find(
        (partner) => partner.value === Number(response.data.userId)
      );
      const { id, perPerson, introduction, date, startTime, endTime, minHour } =
        response.data;
      const data = {
        id,
        perPerson,
        introduction,
        minHour,
        partner: {
          id: partner?.value,
          name: partner?.label,
        },
        time: {
          date: date ? date : "每天",
          startTime: convertMinToTime(startTime),
          endTime: convertMinToTime(endTime),
        },
      };

      const updatedData =
        type === "create"
          ? [...volunteerData, data]
          : volunteerData.map((item) =>
              item.id === inputValue.volunteerId ? data : item
            );
      toast.success(`${type_str}需求志工成功`);
      dispatch(getVolunteerData({ data: updatedData }));
      handleFormCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleFormShowed}
        className="flex justify-center items-center gap-1 w-full lg:w-1/5 lg:max-w-[140px] py-2 bg-heart text-white lg:text-lg rounded-lg"
      >
        <div className="">{type_str}志工招募</div>
        <div className={`${isShowed && "rotate-180"} transition`}>
          <IoIosArrowDown />
        </div>
      </button>
      {isShowed && (
        <form
          className="bg-white rounded-lg drop-shadow-lg p-4 flex flex-col gap-8"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:grid lg:grid-cols-[3fr_2fr] gap-4">
              <DefaultSelect
                title="毛孩之家"
                name="location"
                inputValue={inputValue.location}
                onSelectChange={handleInputChange}
                options={partners}
                placeholder="請選擇毛孩之家"
              />
              <div className="grid grid-cols-2 gap-4">
                <DefaultInput
                  type="number"
                  id="perPerson"
                  name="perPerson"
                  label="需求人數"
                  placeholder="請輸入需求人數"
                  inputValue={inputValue.perPerson}
                  onInputChange={handleInputChange}
                />
                <div className="flex items-end gap-2">
                  <DefaultInput
                    type="number"
                    id="minHour"
                    name="minHour"
                    label="最低時數"
                    placeholder="請輸入最低時數"
                    inputValue={inputValue.minHour}
                    onInputChange={handleInputChange}
                  />
                  <div className="h-10 flex justify-center items-center">
                    時
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h5 className="font-medium">工作時間</h5>
              <div className="grid grid-cols-[1fr_3fr] gap-2">
                <DefaultCheckbox
                  label="每天"
                  id="date"
                  name="date"
                  inputValue={inputValue.date === null}
                  onCheckboxChange={(name, value) => {
                    if (value) {
                      handleInputChange(name, null);
                    } else {
                      handleInputChange(name, dayjs().format("YYYY-MM-DD"));
                    }
                  }}
                  customClass="border-r-[0.5px] border-taro"
                />
                <DatePicker
                  showDateSelect
                  dateFormat="YYYY-MM-dd"
                  minDate={new Date()}
                  className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs disabled:bg-gray-200 disabled:text-gray-400"
                  selected={select_date}
                  disabled={inputValue.date === null}
                  placeholderText="請選擇工作日期"
                  onChange={(date) => {
                    if (date) {
                      const updated_date = dayjs(date).format("YYYY-MM-DD");
                      handleInputChange("date", updated_date);
                    } else {
                      handleInputChange("date", null);
                    }
                  }}
                />
              </div>
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
                maxTime={end}
                className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
                selected={start}
                onChange={(time) => {
                  const hours = dayjs(time).format("HH");
                  const mins = dayjs(time).format("mm");
                  const start = Number(hours) * 60 + Number(mins);
                  // console.log(opening);
                  handleInputChange("startTime", start);
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
                minTime={start}
                maxTime={day_end}
                className="w-full h-10 leading-10 px-4 rounded-lg border-0 bg-skin-60 text-wine placeholder:text-dark-40 placeholder:text-xs"
                selected={end}
                onChange={(time) => {
                  const hours = dayjs(time).format("HH");
                  const mins = dayjs(time).format("mm");
                  const end = Number(hours) * 60 + Number(mins);
                  handleInputChange("endTime", end);
                }}
              />
            </div>
            <DefaultTextarea
              id="intro"
              name="intro"
              label="志工介紹"
              placeholder="請輸入志工介紹"
              inputValue={inputValue.intro}
              onInputChange={handleInputChange}
            />
          </div>
          {isError.status && <p className="text-heart">{isError.message}</p>}
          <div className="w-full flex justify-end">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleFormCancel}
                className="font-medium py-1 px-6 bg-dark-40 text-white rounded-lg hover:drop-shadow-lg"
              >
                取消
              </button>
              <button className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg">
                {type_str}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default VolunteerForm;
