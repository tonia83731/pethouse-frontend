export type GenderType = "M" | "F" | "unknown";
export type SizeType = "S" | "M" | "L";
export type AgeType = "Child" | "Adult";
export type AnimalType = "Dog" | "Cat" | "Rabbit" | "Bird";

// export type InnterPartnerProps =
//   | {
//       name: string;
//       phone: string;
//       address: string;
//     }
//   | {
//       id: number;
//       name: string;
//     };

export type InnterPartnerDetail = {
  name: string;
  phone: string;
  address: string;
};

export type InnterPartnerOption = {
  id: number;
  name: string;
};

export type FurkidProps = {
  id: number;
  name: string;
  gender: GenderType;
  animal: AnimalType;
  size: SizeType;
  age: AgeType;
  userId: number;
  isNeutured: boolean;
  isVaccinated: boolean;
  avatar: string;
  partner: InnterPartnerDetail;
};

export type FurkidInputType = {
  furkidId: null;
  name: string;
  gender: "F" | "M" | "unknown";
  animal: "Dog" | "Cat" | "Rabbit" | "Bird";
  size: "S" | "M" | "L";
  age: "Child" | "Adult";
  isNeutured: boolean;
  isVaccinated: boolean;
  location: {
    label: string;
    value: any;
  };
  avatar: File | string | null;
};

export type DashboardFurkidProps = FurkidProps & {
  adoptionNumber: number;
};
