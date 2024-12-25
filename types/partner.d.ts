import { SelectOptionType } from "./default";

export type PartnerProps = {
  id: number;
  name: string;
  email: string;
  phone: string;
  account: string;
  address: string;
  isAdmin: boolean;
  weekStart: number;
  weekEnd: number;
  openingTime: number;
  closingTime: number;
  createdAt: string;
  updatedAt: string;
};

export type PartnerInputType = {
  partnerId: number | null;
  name: string;
  account: string;
  email: string;
  phone: string | null;
  address: string | null;
  password: string;
  weekStart: SelectOptionType;
  weekEnd: SelectOptionType;
  openingTime: number;
  closingTime: number;
};

export type UserInfoProps = {
  id: number;
  name: string;
  account: string;
  email: string;
  isAdmin: boolean;
};
