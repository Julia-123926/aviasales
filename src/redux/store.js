import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import ticketsReducer from "./slices/ticketSlice";

export const store = configureStore({
  reducer: {
    filterReducer,
    ticketsReducer,
  },
});

export default store;
