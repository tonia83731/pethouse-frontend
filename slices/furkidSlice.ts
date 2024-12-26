import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardFurkidProps, FurkidInputType } from "../types/furkid";
import { InputErrorType, ButtonType, ModalToggleType } from "@/types/default";

interface FurkidState {
  type: ButtonType;
  isShowed: ModalToggleType;
  isError: InputErrorType;
  inputValue: FurkidInputType;
  furkidData: DashboardFurkidProps[];
}

const initialState: FurkidState = {
  type: "create",
  isShowed: false,
  isError: {
    status: false,
    message: "",
  },
  inputValue: {
    furkidId: null,
    name: "",
    gender: "unknown",
    animal: "Dog",
    size: "S",
    age: "Child",
    isNeutured: false,
    isVaccinated: false,
    location: {
      label: "",
      value: null,
    },
    avatar: "https://i.imgur.com/UZ1sYRu.jpeg",
  },
  furkidData: [],
};

const furkidSlice = createSlice({
  name: "furkid",
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
      state: FurkidState,
      action: PayloadAction<{ name: string; value: any }>
    ) {
      const { name, value } = action.payload;
      if (name in state.inputValue) {
        (state.inputValue as Record<string, any>)[name] = value;
      } else {
        console.warn(`Invalid input field: ${name}`);
      }
    },
    updatedImageInput(state: FurkidState, action: PayloadAction<File>) {
      state.inputValue.avatar = action.payload;
    },
    updatedEditClick(state, action) {
      const { formData } = action.payload;
      state.inputValue = formData;
      state.isShowed = true;
      state.type = "edit";
    },
    getFurkidData(state, action) {
      const { data } = action.payload;
      state.furkidData = data;
    },
    updatedErrorStatus(state, action) {
      state.isError = action.payload;
    },
  },
});

export const {
  resetForm,
  updatedFormInput,
  updatedImageInput,
  updatedModalShowed,
  updatedModalCanceled,
  updatedEditClick,
  getFurkidData,
  updatedErrorStatus,
} = furkidSlice.actions;
export default furkidSlice.reducer;
