import { InputErrorType } from "@/types/default";
import { PartnerProps, UserInfoProps, PartnerInputType } from "@/types/partner";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PartnerState {
  type: "create" | "edit";
  modalToggle: boolean;
  isError: InputErrorType;
  inputValue: PartnerInputType;
  partnerData: PartnerProps[];
  currentUser: UserInfoProps | null;
}

const initialState: PartnerState = {
  type: "create",
  modalToggle: false,
  isError: {
    status: false,
    message: "",
  },
  inputValue: {
    partnerId: null,
    name: "",
    account: "",
    email: "",
    phone: null,
    address: null,
    password: "1234",
    weekStart: { label: "週日", value: 0 },
    weekEnd: { label: "週六", value: 6 },
    openingTime: 0,
    closingTime: 1439,
  },
  partnerData: [],
  currentUser: null,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    getUserInfo(state, action) {
      const { data } = action.payload;
      state.currentUser = data;
    },
    getPartnerData(state, action) {
      const { data } = action.payload;
      state.partnerData = data;
    },
    updatedFormInput(
      state: PartnerState,
      action: PayloadAction<{ name: string; value: any }>
    ) {
      const { name, value } = action.payload;
      if (name in state.inputValue) {
        (state.inputValue as Record<string, any>)[name] = value;
      } else {
        console.warn(`Invalid input field: ${name}`);
      }
    },
    updateEditClick(state, action) {
      const { formData } = action.payload;
      state.inputValue = formData;
      state.modalToggle = true;
      state.type = "edit";
    },
    updateModalShowed(state, action) {
      const { type } = action.payload;
      state.type = type;
      state.modalToggle = true;
    },
    updatedModalCanceled(state) {
      state.type = "create";
      state.modalToggle = false;
      state.inputValue = initialState.inputValue;
      state.isError = initialState.isError;
    },
    updatedErrorStatus(state, action) {
      state.isError = action.payload;
    },
  },
});

export const {
  getUserInfo,
  getPartnerData,
  updatedFormInput,
  updateEditClick,
  updateModalShowed,
  updatedModalCanceled,
  updatedErrorStatus,
} = partnerSlice.actions;
export default partnerSlice.reducer;
