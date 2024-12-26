import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { authFetch } from "@/lib/fetch";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/components/common/layout/DashboardLayout";
import VolunteerForm from "@/components/dashbord-forms/VolunteerForm";
import { OptionType } from "@/components/common/input/DefaultSelect";
import VolunteerDashboardTable from "@/components/dashboard-table/VolunteerTable";
import { RootState } from "@/store";
import { getVolunteerData } from "@/slices/dashboarVolunteerSlice";
import { convertMinToTime } from "@/helpers/time-helpers";
import { VolunteerTableProps, VolunteersProps } from "@/types/volunteer";
import { PartnerProps } from "@/types/partner";

const VolunteerPage = ({
  volunteers,
  partners,
}: {
  volunteers: VolunteerTableProps[];
  partners: OptionType[];
}) => {
  const dispatch = useDispatch();
  const { volunteerData } = useSelector(
    (state: RootState) => state.dashboardVolunteer
  );

  useEffect(() => {
    if (volunteers.length === 0) return;
    dispatch(getVolunteerData({ data: volunteers }));
  }, [volunteers]);

  return (
    <DashboardLayout title="尋找志工">
      <VolunteerForm partners={partners} />
      <VolunteerDashboardTable tableData={volunteerData} />
    </DashboardLayout>
  );
};

export default VolunteerPage;
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const [volunteers_res, partner_res] = await Promise.all([
      authFetch(context, "/admin/volunteers", "GET"),
      authFetch(context, "/admin/partners", "GET"),
    ]);

    if (!volunteers_res.success || !partner_res.success) {
      return {
        props: {
          volunteers: [],
          partners: [],
        },
      };
    }

    const partners = partner_res.data
      .filter((partner: PartnerProps) => !partner.isAdmin)
      .map((partner: PartnerProps) => ({
        label: partner.name,
        value: partner.id,
      }));

    const volunteers = volunteers_res.data.map((volunteer: VolunteersProps) => {
      return {
        id: volunteer.id,
        partner: volunteer.partner,
        time: {
          date: volunteer.date ? volunteer.date : "每天",
          startTime: convertMinToTime(volunteer.startTime),
          endTime: convertMinToTime(volunteer.endTime),
        },
        minHour: volunteer.minHour,
        perPerson: volunteer.perPerson,
        introduction: volunteer.introduction,
      };
    });

    return {
      props: {
        volunteers,
        partners,
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
