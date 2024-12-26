import { SelectOptionType } from "./default";

export type VolunteerInputType = {
  volunteerId: null | number;
  startTime: number;
  endTime: number;
  date: string | null;
  perPerson: number;
  minHour: number;
  intro: string;
  location: SelectOptionType;
};

export type VolunteerApplyInputType = {
  findVolunteerId: null | number;
  name: string;
  phone: string;
  email: string;
  date: Date;
  startTime: string;
  hours: number;
  needProven: boolean;
};

export type VolunteersProps = {
  id: number;
  userId: number;
  perPerson: number;
  date: null | string;
  startTime: number;
  endTime: number;
  minHour: number;
  introduction: string;
  partner: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  Volunteers: any[];
  createdAt: string;
  updatedAt: string;
};

export type VolunteerTableProps = {
  id: number;
  perPerson: number;
  introduction: string;
  partner: {
    id: number;
    name: string;
    // phone: string;
    // email: string;
    // address: string;
  };
  time: {
    date: string;
    startTime: string;
    endTime: string;
  };
  minHour: number;
};
