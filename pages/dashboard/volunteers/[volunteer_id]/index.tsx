import { GetServerSideProps } from "next";
import Link from "next/link";
import { authFetch } from "@/lib/fetch";
import { VolunteersProps } from "@/types/volunteer";
import DashboardLayout from "@/components/common/layout/DashboardLayout";
import DashboardVolunteerDetailCard from "@/components/dashboard-card/DashboardVolunteerDetailCard";
import { IoIosArrowBack } from "react-icons/io";
import { MdPhoneAndroid } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { convertMinToTime } from "@/helpers/time-helpers";
const FindVolunteerListPage = ({
  volunteers,
}: {
  volunteers: VolunteersProps;
}) => {
  //   console.log(volunteers);
  return (
    <DashboardLayout title="志工申請資料">
      <Link
        href="/dashboard/volunteers"
        className="flex items-center gap-0.5 text-dark-40 underline underline-offset-2 hover:font-bold hover:italic"
      >
        <IoIosArrowBack />
        <p>回上一頁</p>
      </Link>
      <DashboardVolunteerDetailCard {...volunteers} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {volunteers.Volunteers.map(
          ({ id, name, email, phone, date, startTime, hours, needProven }) => {
            return (
              <div
                className="flex flex-col gap-2 bg-light rounded-lg py-2 px-4"
                key={id}
              >
                <h5 className="font-medium text-lg">{name}</h5>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <MdPhoneAndroid />
                    <a href={`tel:${phone}`} className="">
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineMailOpen />
                    <a href={`mailto:${email}`} className="">
                      {email}
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <IoTimeOutline />
                      <div className="">
                        {date}, {convertMinToTime(startTime)}, {hours}小時
                      </div>
                    </div>
                  </div>
                  {needProven && (
                    <div className="flex items-center gap-2">
                      <FaCheck className="text-neutral" />
                      <p>需要志工證明</p>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </DashboardLayout>
  );
};

export default FindVolunteerListPage;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const { volunteer_id } = context.params;
    const response = await authFetch(
      context,
      `/admin/volunteers/${volunteer_id}`,
      "GET"
    );

    if (!response.success) {
      return {
        props: {
          volunteer: [],
        },
      };
    }

    return {
      props: {
        volunteers: response.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        volunteers: [],
      },
    };
  }
};
