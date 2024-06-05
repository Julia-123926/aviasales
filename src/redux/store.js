import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import ticketsReducer from "./slices/ticketSlice";
import sessionIdReducer from "./slices/sessionIdSlice";

export const store = configureStore({
  reducer: {
    filterReducer,
    ticketsReducer,
    sessionIdReducer,
  },
});

export default store;
