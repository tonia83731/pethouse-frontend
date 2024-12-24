import {
  AgeType,
  AnimalType,
  GenderType,
  SizeType,
} from "@/helpers/animal-helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { SelectOptionType } from "./supplySlice";

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

export type FurkidDataType = {
  id: number;
  name: string;
  gender: GenderType;
  animal: AnimalType;
  size: SizeType;
  age: AgeType;
  partnerId: number;
  isNeutured: boolean;
  isVaccinated: boolean;
  avatar: string;
  partner: {
    name: string;
    phone: string;
    address: string;
  };
  adoptionNumber: number;
};

export type InputErrorType = {
  status: boolean;
  message: string;
};

export type ButtonType = "create" | "edit";
export type ModalToggleType = boolean;

interface FurkidState {
  type: ButtonType;
  isShowed: ModalToggleType;
  isError: InputErrorType;
  inputValue: FurkidInputType;
  furkidData: FurkidDataType[];
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
    avatar: null,
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
      state.inputValue[name] = value;
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
