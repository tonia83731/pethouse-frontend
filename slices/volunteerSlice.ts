import dayjs from "dayjs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputErrorType, ButtonType, ModalToggleType } from "@/types/default";
import {
  VolunteerApplyInputType,
  VolunteerInputType,
  VolunteersProps,
} from "@/types/volunteer";

interface VolunteerState {
  type: ButtonType;
  isShowed: ModalToggleType;
  isError: InputErrorType;
  inputValue: VolunteerInputType;
  applyValue: VolunteerApplyInputType;
  volunteerData: VolunteersProps[];
}

const initialState: VolunteerState = {
  type: "create",
  isShowed: false,
  isError: {
    status: false,
    message: "",
  },
  applyValue: {
    findVolunteerId: null,
    name: "",
    phone: "",
    email: "",
    date: new Date(),
    startTime: "",
    hours: 8,
    needProven: false,
  },
  volunteerData: [],
};

const volunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {
    resetForm(state) {
      state.type = "create";
      state.isShowed = false;
      state.inputValue = initialState.inputValue;
    },
    updatedModalShowed(state) {
      state.type = "create";
      if (state.isShowed) state.inputValue = initialState.inputValue;
      state.isShowed = !state.isShowed;
    },
    updatedModalCanceled(state) {
      state.type = "create";
      state.isShowed = false;
      state.inputValue = initialState.inputValue;
    },
    updatedFormInput(
      state: VolunteerState,
      action: PayloadAction<{ name: string; value: any }>
    ) {
      const { name, value } = action.payload;
      state.inputValue[name] = value;
    },
    updatedEditClick(state, action) {
      const { formData } = action.payload;
      state.inputValue = formData;
      state.isShowed = true;
      state.type = "edit";
    },
    updatedErrorStatus(state, action) {
      state.isError = action.payload;
    },
  },
});

export const {
  resetForm,
  updatedFormInput,
  updatedModalShowed,
  updatedModalCanceled,
  updatedEditClick,
  updatedErrorStatus,
} = volunteerSlice.actions;
export default volunteerSlice.reducer;
