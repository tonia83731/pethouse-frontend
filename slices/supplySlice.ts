import { createSlice } from "@reduxjs/toolkit";

export type SelectOptionType = {
  label: string;
  value: any;
};

export type SupplyInputType = {
  supplyId: null;
  name: string;
  number: number;
  intro: string;
  location: SelectOptionType;
};

interface SupplyState {
  type: "create" | "edit";
  modalToggle: boolean;
  inputValue: SupplyInputType;
}

const initialState: SupplyState = {
  type: "create",
  modalToggle: false,
  inputValue: {
    supplyId: null,
    name: "",
    number: 1,
    intro: "",
    location: {
      label: "",
      value: null,
    },
  },
};

const supplySlice = createSlice({
  name: "supply",
  initialState,
  reducers: {},
});

export const {} = supplySlice.actions;
export default supplySlice.reducer;
