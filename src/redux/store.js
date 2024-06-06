import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./slices/ticketSlice";
import sessionIdReducer from "./slices/sessionIdSlice";

const store = configureStore({
  reducer: {
    ticketsReducer,
    sessionIdReducer,
  },
});

export default store;
