/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null,
  status: "",
  error: "",
};

export const fetchSearchId = createAsyncThunk("sessionId/fetchSearchId", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://aviasales-test-api.kata.academy/search");
    if (!res.ok) {
      throw new Error("Failed to fetch search");
    }
    const data = await res.json();
    return await data.searchId;
  } catch (e) {
    return rejectWithValue(e.message);
  }
});

const sessionIdSlice = createSlice({
  name: "sessionId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.sessionId = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.stop = false;
      });
  },
});

export default sessionIdSlice.reducer;
