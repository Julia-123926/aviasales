/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  status: "",
  stop: false,
  filters: {
    all: true,
    noStops: true,
    oneStop: true,
    twoStops: true,
    threeStops: true,
  },
  sorting: "САМЫЙ ДЕШЕВЫЙ",
  numberOfTickets: 5,
};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (searchId, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
      if (!response.ok) {
        const err = new Error("Failed to fetch tickets");
        err.code = response.status;
        throw err;
      }
      const data = await response.json();
      if (!data.stop) {
        dispatch(fetchTickets(searchId));
      }
      return { tickets: data.tickets, stop: data.stop };
    } catch (error) {
      return rejectWithValue({ message: error.message, code: error.code || 404 });
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    toggleAll(state, action) {
      state.filters.all = action.payload;
      state.filters.noStops = action.payload;
      state.filters.oneStop = action.payload;
      state.filters.twoStops = action.payload;
      state.filters.threeStops = action.payload;
    },
    toggleFilter(state, action) {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
      const { noStops, oneStop, twoStops, threeStops } = state.filters;
      const allFiltersSelected = noStops && oneStop && twoStops && threeStops;
      state.filters.all = allFiltersSelected;
    },
    setSorting(state, action) {
      state.sorting = action.payload.tab;
    },
    handleLoadMore(state) {
      state.numberOfTickets += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        const { tickets, stop } = action.payload;
        state.status = "fulfilled";
        state.tickets = [...state.tickets, ...tickets];
        state.stop = stop;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        const { code, message } = action.payload;
        state.stop = code !== 500;
        state.status = "failed";
        state.error = message;
      });
  },
});

export const { setItems, toggleAll, toggleFilter, handleLoadMore, setSorting } = ticketsSlice.actions;
export default ticketsSlice.reducer;
