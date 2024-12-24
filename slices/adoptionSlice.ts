// https://www.youtube.com/watch?v=ss-_S1Vyxa0
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type AdoptionInputType = {
  furkidId: number | null;
  name: string;
  age: number;
  phone: string;
  email: string;
  city: string;
  address: string;
  occupation: string;
  income: string;
  housetype: string;
  livingarea: string;
  activityarea: string[];
  familynumber: number;
  agreement: boolean;
  allergic: boolean;
  otheranimal: boolean;
  petexperience: boolean;
  skills: boolean;
  accepttraining: boolean;
  alone: number;
  reason: string;
};

interface AdoptionState {
  currStep: number;
  inputValue: AdoptionInputType;
}

const initialState: AdoptionState = {
  currStep: 1,
  inputValue: {
    furkidId: null,
    name: "",
    age: 20,
    phone: "",
    email: "",
    city: "",
    address: "",
    occupation: "",
    income: "",
    housetype: "",
    livingarea: "",
    activityarea: [],
    familynumber: 1,
    agreement: false,
    allergic: false,
    otheranimal: false,
    petexperience: false,
    skills: false,
    accepttraining: false,
    alone: 0,
    reason: "",
  },
};

const adoptionSlice = createSlice({
  name: "adoption",
  initialState,
  reducers: {
    handleSteps(state, action: PayloadAction<"prev" | "next" | number>) {
      const { payload } = action;
      if (payload === "prev") {
        state.currStep -= 1;
      } else if (payload === "next") {
        state.currStep += 1;
      } else {
        state.currStep = payload;
      }
    },
    updatedFormInput<K extends keyof AdoptionInputType>(
      state: AdoptionState,
      action: PayloadAction<{ name: K; value: AdoptionInputType[K] }>
    ) {
      const { name, value } = action.payload;
      state.inputValue[name] = value;
    },
    resetForm(state) {
      state.currStep = 1;
      state.inputValue = initialState.inputValue;
    },
  },
});

export const { handleSteps, updatedFormInput, resetForm } =
  adoptionSlice.actions;

export default adoptionSlice.reducer;
