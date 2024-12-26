import { InputErrorType } from "@/types/default";
import { MoneyInputProps } from "@/types/money";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MoneyState {
  isError: InputErrorType;
  donateValue: MoneyInputProps;
}

const initialState: MoneyState = {
  isError: {
    status: false,
    message: "",
  },
  donateValue: {
    name: "",
    phone: "",
    email: "",
    amount: 0,
    idNumber: "",
    invoice: false,
  },
};

const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {
    updatedFormInput(
      state: MoneyState,
      action: PayloadAction<{ name: string; value: any }>
    ) {
      const { name, value } = action.payload;
      if (name in state.donateValue) {
        (state.donateValue as Record<string, any>)[name] = value;
      } else {
        console.warn(`Invalid input field: ${name}`);
      }
    },
  },
});

export const { updatedFormInput } = moneySlice.actions;
export default moneySlice.reducer;
