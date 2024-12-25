import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ButtonType, InputErrorType, ModalToggleType } from "@/types/default";
import { SupplyInputType, SupplyProps } from "@/types/supply";

interface SupplyState {
  type: ButtonType;
  isShowed: ModalToggleType;
  isError: InputErrorType;
  inputValue: SupplyInputType;
  supplyData: SupplyProps[];
}

const initialState: SupplyState = {
  type: "create",
  isShowed: false,
  isError: {
    status: false,
    message: "",
  },
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
  supplyData: [],
};

const supplySlice = createSlice({
  name: "supply",
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
      state: SupplyState,
      action: PayloadAction<{ name: string; value: any }>
    ) {
      const { name, value } = action.payload;
      if (name in state.inputValue) {
        (state.inputValue as Record<string, any>)[name] = value;
      } else {
        console.warn(`Invalid input field: ${name}`);
      }
    },
    getSupplyData(state, action) {
      const { data } = action.payload;
      state.supplyData = data;
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
  getSupplyData,
  updatedEditClick,
  updatedErrorStatus,
} = supplySlice.actions;
export default supplySlice.reducer;
