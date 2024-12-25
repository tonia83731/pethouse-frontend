import { SelectOptionType } from "./default";

export type VolunteerInputType = {
  volunteerId: null | number;
  startTime: number;
  endTime: number;
  date: string;
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
  partner: {
    id: number;
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  perPerson: number;
  time: {
    date: string;
    startTime: number;
    endTime: number;
  };
  minHour: number;
  introduction: string;
  createdAt: string;
  updatedAt: string;
};
