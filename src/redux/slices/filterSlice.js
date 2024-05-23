import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    all: false,
    noStops: false,
    oneStop: false,
    twoStops: false,
    threeStops: false,
  },
};

const filterSlice = createSlice({
  name: "filters",
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
  },
});

export const { toggleAll, toggleFilter } = filterSlice.actions;
export default filterSlice.reducer;
