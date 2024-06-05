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
  // error: "",
  numberOfTickets: 5,
};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (searchId, { dispatch, rejectWithValue }) => {
    console.log("fetch tickets");
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      const data = await response.json();
      if (!data.stop) {
        dispatch(fetchTickets(searchId));
      }
      console.log(data.tickets);
      return { tickets: data.tickets, stop: data.stop };
    } catch (error) {
      console.log("aaaaaaaa");
      return rejectWithValue(error.message);
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
    // setActiveSortingTab(state, action) {
    //   state.sorting = action.payload;
    // },
    setSorting(state, action) {
      state.sorting = action.payload.tab;
    },
    handleLoadMore(state) {
      state.numberOfTickets += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state, action) => {
        state.tickets = [];
        state.status = "loading";
        // state.stop = true;
        // state.error = action.payload;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        const { tickets, stop } = action.payload;
        state.status = "fulfilled";
        state.tickets = [...state.tickets, ...tickets];
        state.stop = stop;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = "failed";
        state.stop = false;
        state.error = action.payload;
      });
  },
});

export const { setItems, toggleAll, toggleFilter, handleLoadMore, setSorting } =
  ticketsSlice.actions;
export default ticketsSlice.reducer;
