import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getVolunteerData } from "@/slices/volunteerSlice";
import Select from "react-select";
import { clientFetch, serverFetch } from "@/lib/fetch";
import { SELECTSTYLES } from "@/constants/select-style";
import { SelectOptionType } from "@/types/default";
import { PartnerProps } from "@/types/partner";
import {
  VolunteerApplyInputType,
  VolunteersProps,
  VolunteerTableProps,
} from "@/types/volunteer";
import FrontLayout from "@/components/common/layout/FrontLayout";
import VolunteerTable from "@/components/volunteer-page/VolunteerTable";
import { convertMinToTime, convertTimeToMin } from "@/helpers/time-helpers";
import VolunteerDetailModal from "@/components/volunteer-page/VolunteerDetailModal";
import VolunteerApplyModal from "@/components/volunteer-page/VolunteerApplyModal";

// export const possible_weekday = [
//   "週日",
//   "週一",
//   "週二",
//   "週三",
//   "週四",
//   "週五",
//   "週六",
// ];

interface VolunteerPageProps {
  volunteers: VolunteerTableProps[];
  partners: SelectOptionType[];
}

const VolunteerPage = ({ volunteers, partners }: VolunteerPageProps) => {
  const dispatch = useDispatch();
  const { volunteerData } = useSelector((state: RootState) => state.volunteer);
  const [category, setCategory] = useState(partners[0]);

  useEffect(() => {
    if (volunteers.length === 0) return;
    dispatch(getVolunteerData({ data: volunteers }));
  }, [volunteers]);
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
                dispatch(getVolunteerData({ data: volunteers }));
                return;
              }
              try {
                const response = await clientFetch(
                  `/volunteers?&userId=${userId}`
                );
                if (!response.success) {
                  dispatch(getVolunteerData({ data: [] }));
                  return;
                }
                if (response.success) {
                  const data = response.data;
                  dispatch(getVolunteerData({ data }));
                  setCategory(newValue || partners[0]);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </div>
        <VolunteerTable tableData={volunteerData} />
      </div>
      <VolunteerDetailModal />
      <VolunteerApplyModal />
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

    const partners = partner_res?.data.map((item: PartnerProps) => ({
      value: item.id,
      label: item.name.split(" ")[1],
    }));

    const volunteers = volunteer_res.data.map(
      (volunteer: VolunteerTableProps) => ({
        ...volunteer,
        time: {
          ...volunteer.time,
          date: volunteer.time.date ? volunteer.time.date : "每天",
        },
      })
    );

    return {
      props: {
        volunteers,
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
