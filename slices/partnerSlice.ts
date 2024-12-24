import { createSlice } from "@reduxjs/toolkit";

type PartnerInputType = {
  partnerId: number | null;
  name: string;
  account: string;
  email: string;
  phone: string | null;
  address: string | null;
  password: string;
  weekStart: number;
  weekEnd: number;
  openingTime: number;
  closingTime: number;
};

interface PartnerState {
  type: "create" | "edit";
  modalToggle: boolean;
  inputValue: PartnerInputType;
}

const initialState: PartnerState = {
  type: "create",
  modalToggle: false,
  inputValue: {
    partnerId: null,
    name: "",
    account: "",
    email: "",
    phone: null,
    address: null,
    password: "",
    weekStart: 0,
    weekEnd: 6,
    openingTime: 0,
    closingTime: 1439,
  },
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
});

export const {} = partnerSlice.actions;
export default partnerSlice.reducer;
