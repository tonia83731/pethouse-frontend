import { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";
import validator from "validator";
import Select from "react-select";
import { toast } from "react-toastify";
import { clientFetch, serverFetch } from "@/lib/fetch";
import { SELECTSTYLES } from "@/constants/select-style";
import { SelectOptionType } from "@/types/default";
import FrontLayout from "@/components/common/layout/FrontLayout";
import ModalLayout from "@/components/common/layout/ModalLayout";
import VolunteerApplyForm from "@/components/volunteer-page/VolunteerApplyForm";
import VolunteerDetail from "@/components/volunteer-page/VolunteerDetail";
import VolunteerTable from "@/components/volunteer-page/VolunteerTable";
import { convertMinToTime, convertTimeToMin } from "@/helpers/time-helpers";
import { VolunteerApplyInputType, VolunteersProps } from "@/types/volunteer";

export const possible_weekday = [
  "週日",
  "週一",
  "週二",
  "週三",
  "週四",
  "週五",
  "週六",
];

interface VolunteerPageProps {
  volunteers: VolunteerApplyInputType[];
  partners: SelectOptionType[];
}

const VolunteerPage = ({ volunteers, partners }: VolunteerPageProps) => {
  const [modalToggle, setModalToggle] = useState({
    detail: false,
    apply: false,
  });
  const [modalDetail, setModalDetail] = useState<VolunteersProps | null>(null);
  const [category, setCategory] = useState(partners[0]);
  const [volunteerData, setVolunteerData] = useState(volunteers);
  const [applyInput, setApplyInput] = useState<VolunteerApplyInputType>({
    findVolunteerId: null,
    name: "",
    phone: "",
    email: "",
    date: new Date(),
    startTime: "",
    hours: 8,
    needProven: false,
  });
  const [applyAvailableTime, setApplyAvailableTime] = useState<number | null>(
    null
  );
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });

  const initializedData = () => {
    setModalToggle({
      detail: false,
      apply: false,
    });
    setModalDetail(null);
    setApplyInput({
      findVolunteerId: null,
      name: "",
      phone: "",
      email: "",
      date: new Date(),
      startTime: "",
      hours: 8,
      needProven: false,
    });
    setApplyAvailableTime(null);
    setIsError({
      status: false,
      message: "",
    });
  };

  // const handleApplyClick = (id: number) => {
  //   setApplyInput((prev) => ({ ...prev, findVolunteerId: id }));
  //   setModalToggle((prev) => ({ ...prev, apply: true }));
  //   const volunteer = volunteers.find((v) => v.id === id);
  //   if (volunteer) {
  //     setApplyAvailableTime(volunteer?.time.weekday);
  //     const startTime = convertMinToTime(volunteer.time.startTime);
  //     setApplyInput((prev) => ({
  //       ...prev,
  //       hours: volunteer.minHour,
  //       startTime,
  //     }));
  //   } else {
  //     setApplyAvailableTime(null);
  //   }
  // };

  // const handleDetailClick = (id: number) => {
  //   setModalToggle((prev) => ({ ...prev, detail: true }));
  //   const detail = volunteerData.find((item) => item.id === id);
  //   if (detail) {
  //     setModalDetail(detail);
  //   }
  // };

  // const errorHandleing = (volunteerId: number | null, inputValue: any) => {
  //   // initialized error
  //   setIsError({
  //     status: false,
  //     message: "",
  //   });

  //   const volunteer = volunteers.find((item) => item.id === volunteerId);

  //   const { name, phone, email, date, startTime, hours } = inputValue;
  //   if (!name || !email || !phone) {
  //     setIsError({
  //       status: true,
  //       message: "姓名、電子郵件、電話不可為空白!",
  //     });
  //     return;
  //   }
  //   if (!validator.isEmail(email)) {
  //     setIsError({
  //       status: true,
  //       message: "電子郵件格式錯誤!",
  //     });
  //     return;
  //   }

  //   if (!date) {
  //     setIsError({
  //       status: true,
  //       message: "日期不可為空白!",
  //     });
  //     return;
  //   }

  //   if (volunteer && hours < volunteer?.minHour) {
  //     setIsError({
  //       status: true,
  //       message: `最低時數為${volunteer?.minHour}小時`,
  //     });
  //     return;
  //   }

  //   const start = convertTimeToMin(startTime);

  //   if (volunteer && start + hours > volunteer?.time.endTime) {
  //     setIsError({
  //       status: true,
  //       message: `工作時間超出結束時間${convertMinToTime(
  //         volunteer?.time.endTime
  //       )}`,
  //     });
  //     return;
  //   }
  // };

  // const handleApplySubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   const volunteerId = applyInput.findVolunteerId;
  //   const { name, phone, email, date, startTime, hours, needProven } =
  //     applyInput;

  //   errorHandleing(volunteerId, applyInput);

  //   const body = {
  //     name,
  //     phone,
  //     email,
  //     date,
  //     startTime: convertTimeToMin(startTime),
  //     hours,
  //     needProven,
  //   };

  // console.log(body);

  //   try {
  //     const response = await clientFetch(`/volunteers/${volunteerId}/apply`, {
  //       method: "POST",
  //       body,
  //     });

  //     console.log(response);
  //     if (!response.success) {
  //       toast.error("志工表單填寫失敗，請在試一次!");
  //       return;
  //     }

  //     setVolunteerData((prevData) =>
  //       prevData
  //         .map((volunteer) =>
  //           volunteer.id === volunteerId
  //             ? { ...volunteer, perPerson: volunteer.perPerson - 1 }
  //             : volunteer
  //         )
  //         .filter((volunteer) => volunteer.perPerson > 0)
  //     );
  //     initializedData();
  //     toast.success("志工表單填寫成功!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <FrontLayout
      includeTitle={true}
      title="成為志工"
      description="加入我們的志工團隊，成為流浪動物的守護者。無論是參與救援行動、協助安置，還是支持後勤工作，我們都需要您的熱情與支持。成為志工，不僅能改變動物的生命，也能讓您感受到無比的成就與溫暖。"
    >
      <div className="flex flex-col gap-4">
        <div className="w-full md:w-1/3">
          <Select
            options={partners}
            defaultValue={category}
            styles={SELECTSTYLES}
            onChange={async (newValue) => {
              const userId = newValue?.value;
              if (category.value === userId) return;
              if (!userId) {
                setVolunteerData(volunteers);
                return;
              }
              try {
                const response = await clientFetch(
                  `/volunteers?&userId=${userId}`
                );
                if (!response.success) {
                  setVolunteerData([]);
                  return;
                }
                if (response.success) {
                  const data = response.data;
                  setVolunteerData(data);
                  setCategory(newValue || partners[0]);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </div>
        {/* <VolunteerTable
          tableData={volunteerData}
          onApplyClick={handleApplyClick}
          onDetailClick={handleDetailClick}
        /> */}
      </div>
      <ModalLayout
        title="詳細資料"
        isOpen={modalToggle.detail}
        onClose={initializedData}
      >
        <VolunteerDetail
          modalDetail={modalDetail}
          onApplyClick={() => {
            setModalDetail(null);
            setModalToggle((prev) => ({
              ...prev,
              detail: false,
              apply: true,
            }));
          }}
        />
      </ModalLayout>
      {/* <ModalLayout
        title="志工申請"
        isOpen={modalToggle.apply}
        onClose={initializedData}
      >
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleApplySubmit}
        >
          <VolunteerApplyForm
            isError={isError}
            applyInput={applyInput}
            applyAvailableTime={applyAvailableTime}
            onInputChange={(e) =>
              setApplyInput((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            onCheckboxChange={(e) =>
              setApplyInput((prev) => ({
                ...prev,
                [e.target.name]: e.target.checked,
              }))
            }
            onDateChange={(date) =>
              setApplyInput((prev) => ({ ...prev, date }))
            }
            onTimeChange={(type, time) => {
              setApplyInput((prev) => ({ ...prev, [type]: time }));
            }}
          />
          <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_2fr]">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-1 rounded-lg hover:shadow-md"
              onClick={initializedData}
            >
              取消
            </button>
            <button
              type="submit"
              className="bg-wine text-white px-4 py-1 rounded-lg hover:shadow-md"
            >
              提交
            </button>
          </div>
        </form>
      </ModalLayout> */}
    </FrontLayout>
  );
};

export default VolunteerPage;
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [volunteer_res, partner_res] = await Promise.all([
      serverFetch("/volunteers"),
      serverFetch("/partners"),
    ]);
    if (!volunteer_res.success || !partner_res.success) {
      return {
        props: {
          volunteers: [],
          partners: [],
        },
      };
    }

    const partners = partner_res?.data.map((item: any) => ({
      value: item.id,
      label: item.name.split(" ")[1],
    }));

    return {
      props: {
        volunteers: volunteer_res.data,
        partners: [
          {
            value: null,
            label: "全部分店",
          },
          ...partners,
        ],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        volunteers: [],
        partners: [],
      },
    };
  }
};
