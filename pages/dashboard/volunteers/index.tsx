import { GetServerSideProps } from "next";
import { useState } from "react";
import { authFetch } from "@/lib/fetch";

import DashboardLayout from "@/components/common/layout/DashboardLayout";
import VolunteerForm from "@/components/dashbord-forms/VolunteerForm";
import { VolunteersProps } from "@/pages/volunteer";
import { PartnerProps } from "@/components/home-section/PartnerSection";
import { OptionType } from "@/components/common/input/DefaultSelect";
import { weekday_data } from "../../../components/dashbord-forms/VolunteerForm";
import VolunteerDashboardTable, {
  VolunteerTableProps,
} from "@/components/dashboard-table/VolunteerTable";
import dayjs from "dayjs";
export type VolunteerInput = {
  perPerson: number;
  startTime: string;
  endTime: string;
  minHour: number;
  intro: string;
  location: OptionType;
  weekday: OptionType;
};

const VolunteerPage = ({
  volunteers,
  partners,
}: {
  volunteers: VolunteerTableProps[];
  partners: OptionType[];
}) => {
  const [volunteerData, setVolunteerData] = useState(volunteers);
  const [isShowed, setIsShowed] = useState(false);
  const [inputValue, setInputValue] = useState<VolunteerInput>({
    perPerson: 1,
    startTime: dayjs(`1970-01-01T00:00`).format("HH:mm"),
    endTime: dayjs(`1970-01-01T23:59`).format("HH:mm"),
    minHour: 4,
    intro: "",
    location: {
      label: "",
      value: null,
    },
    weekday: {
      label: "每日",
      value: null,
    },
  });
  const [type, setType] = useState<"create" | "edit" | null>(null);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });

  const initializedData = () => {
    setInputValue({
      perPerson: 1,
      startTime: dayjs(`1970-01-01T00:00`).format("HH:mm"),
      endTime: dayjs(`1970-01-01T23:590`).format("HH:mm"),
      minHour: 4,
      intro: "",
      location: {
        label: "",
        value: null,
      },
      weekday: {
        label: "",
        value: null,
      },
    });
    setType(null);
    setIsError({
      status: false,
      message: "",
    });
  };

  const handleEditClick = (id: number | null) => {
    const volunteer = volunteerData.find((item) => item.id === id);

    if (volunteer) {
      const { partnerId, time, minHour, perPerson, introduction } = volunteer;

      const partner_option = partners.find(
        (partner) => partner.value === partnerId
      );
      setInputValue({
        perPerson,
        intro: introduction,
        minHour,
        location: partner_option
          ? partner_option
          : {
              label: "",
              value: null,
            },
        startTime: dayjs(`1970-01-01T${time.startTime}`).format("HH:mm"),
        endTime: dayjs(`1970-01-01T${time.endTime}`).format("HH:mm"),
        weekday: {
          label: time.weekday,
          value: time.weekday === "每日" ? null : time.weekday,
        },
      });
      setIsShowed(true);
      setType("edit");
    }
  };
  const handleDeleteClick = (id: number | null) => {};
  return (
    <DashboardLayout title="尋找志工">
      <VolunteerForm
        partners={partners}
        type={type}
        isShowed={isShowed}
        isError={isError}
        inputValue={inputValue}
        onShowClick={() => {
          if (isShowed) {
            initializedData();
          } else {
            setType("create");
          }
          setIsShowed(!isShowed);
        }}
        onFormCancel={() => {
          setIsShowed(false);
          initializedData();
        }}
        onInputChange={(e) =>
          setInputValue((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        onSelectChange={(option, type) => {
          setInputValue((prev) => ({ ...prev, [type]: option }));
        }}
      />
      <VolunteerDashboardTable
        tableData={volunteerData}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
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

    // console.log(partner_res);

    if (!volunteers_res.success || !partner_res.success) {
      return {
        props: {
          volunteers: [],
          partners: [],
        },
      };
    }

    const partners = partner_res.data.map((partner: PartnerProps) => ({
      label: partner.name,
      value: partner.id,
    }));

    const converTime = (time: string) => {
      const date = new Date(`1970-01-01T${time}Z`);
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };
    const volunteers = volunteers_res.data.map((volunteer: any) => {
      return {
        id: volunteer.id,
        partnerId: volunteer.partnerId,
        partner: volunteer.partnerName.split(" ")[1],
        time: {
          weekday: volunteer.weekday ? `每${volunteer.weekday}` : "每日",
          startTime: converTime(volunteer.startTime),
          endTime: converTime(volunteer.endTime),
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
