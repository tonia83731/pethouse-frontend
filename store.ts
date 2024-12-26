import { configureStore } from "@reduxjs/toolkit";
import adoptionReducer from "@/slices/adoptionSlice";
import furkidReducer from "@/slices/furkidSlice";
import supplyReducer from "@/slices/supplySlice";
import partnerReducer from "@/slices/partnerSlice";
import volunteerReducer from "@/slices/volunteerSlice";
import dashboardVolunteerReducer from "./slices/dashboarVolunteerSlice";
import MoneyReducer from "@/slices/moneySlice";

export const store = configureStore({
  reducer: {
    adoption: adoptionReducer,
    furkid: furkidReducer,
    supply: supplyReducer,
    partner: partnerReducer,
    volunteer: volunteerReducer,
    dashboardVolunteer: dashboardVolunteerReducer,
    money: MoneyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
