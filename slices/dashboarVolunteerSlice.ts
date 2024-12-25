import dayjs from "dayjs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputErrorType, ButtonType, ModalToggleType } from "@/types/default";
import { VolunteerInputType, VolunteersProps } from "@/types/volunteer";

interface DashboardVolunteerState {
  type: ButtonType;
  isShowed: ModalToggleType;
  isError: InputErrorType;
  inputValue: VolunteerInputType;
  volunteerData: VolunteersProps[];
}

const initialState: DashboardVolunteerState = {
  type: "create",
  isShowed: false,
  isError: {
    status: false,
    message: "",
  },
  inputValue: {
    volunteerId: null,
    startTime: 0,
    endTime: 1439,
    date: dayjs().format("YYYY-MM-DD"),
    perPerson: 1,
    minHour: 4,
    intro: "",
    location: {
      label: "",
      value: null,
    },
  },
  volunteerData: [],
};

const dashboardVolunteerSlice = createSlice({
  name: "dashboardVolunteer",
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
      state: DashboardVolunteerState,
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
} = dashboardVolunteerSlice.actions;
export default dashboardVolunteerSlice.reducer;
