import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchId = createAsyncThunk(
  "tickets/fetchSearchId",
  async () => {
    const response = await fetch(
      "https://aviasales-test-api.kata.academy/search"
    );
    const data = await response.json();
    return data.searchId;
  }
);

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );
      const data = await response.json();
      console.log(data);

      return { tickets: data.tickets, stop: data.stop };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    searchId: null,
    status: "loading",
    stop: false,
  },
  reducers: {
    setItems(state, action) {
      state.tickets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchSearchId.pending, (state) => {
        state.status = "loading";
        state.tickets = [];
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        const { tickets, stop } = action.payload;
        state.tickets = [...state.tickets, ...tickets];
        state.stop = stop;
        state.status = "succeeded";
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.status = "failed";
        state.tickets = [];
      });
  },
});

export const { setItems } = ticketsSlice.actions;
export default ticketsSlice.reducer;
