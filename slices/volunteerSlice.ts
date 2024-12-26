import dayjs from "dayjs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InputErrorType, ButtonType, ModalToggleType } from "@/types/default";
import {
  VolunteerApplyInputType,
  VolunteersProps,
  VolunteerTableProps,
} from "@/types/volunteer";

interface VolunteerState {
  applyToggle: ModalToggleType;
  detailToggle: ModalToggleType;
  isError: InputErrorType;
  applyValue: VolunteerApplyInputType;
  volunteerDetail: VolunteersProps | null;
  volunteerData: VolunteerTableProps[];
}

const initialState: VolunteerState = {
  applyToggle: false,
  detailToggle: false,
  isError: {
    status: false,
    message: "",
  },
  applyValue: {
    findVolunteerId: null,
    name: "",
    phone: "",
    email: "",
    date: dayjs().format("YYYY-MM-DD"),
    startTime: 0,
    hours: 8,
    needProven: false,
  },
  volunteerDetail: null,
  volunteerData: [],
};

const volunteerSlice = createSlice({
  name: "volunteer",
  initialState,
  reducers: {
    resetApplyForm(state) {
      state.applyToggle = false;
      state.applyValue = initialState.applyValue;
      state.volunteerDetail = null;
    },
    resetDetailModal(state) {
      state.detailToggle = false;
      state.volunteerDetail = null;
    },
    updatedModalShowed(state, action) {
      const { id } = action.payload;
      state.applyValue.findVolunteerId = id;
      state.applyToggle = true;
      state.detailToggle = false;
    },
    updatedFormInput(
      state: VolunteerState,
      action: PayloadAction<{ name: string; value: any }>
    ) {
      const { name, value } = action.payload;
      if (name in state.applyValue) {
        (state.applyValue as Record<string, any>)[name] = value;
      } else {
        console.warn(`Invalid input field: ${name}`);
      }
    },
    updatedErrorStatus(state, action) {
      state.isError = action.payload;
    },
    getVolunteerDetail(state, action) {
      const { data } = action.payload;
      state.volunteerDetail = data;
      state.detailToggle = true;
    },
    getVolunteerData(state, action) {
      const { data } = action.payload;
      state.volunteerData = data;
    },
  },
});

export const {
  resetApplyForm,
  resetDetailModal,
  updatedFormInput,
  updatedModalShowed,
  updatedErrorStatus,
  getVolunteerDetail,
  getVolunteerData,
} = volunteerSlice.actions;
export default volunteerSlice.reducer;
