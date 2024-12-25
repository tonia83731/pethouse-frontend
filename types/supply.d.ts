import { SelectOptionType } from "./default";
import { InnterPartnerDetail } from "./furkid";

export type SupplyInputType = {
  supplyId: number | null;
  name: string;
  number: number;
  intro: string;
  location: SelectOptionType;
};

export type SupplyProps = {
  id: number;
  supplyName: string;
  introduction: string;
  number: number;
  partner: InnterPartnerDetail;
};
