import { createSlice } from "@reduxjs/toolkit";

import {
  createNumberToQuarterMap,
  getYearlyQuarters,
} from "../utils/getYearsQuarterly";

const initialState = {
  quarterlyRange: ["2009K1", "2009K2", "2009K3", "2009K4"],
  housingType: "00",
};

export const housingSlice = createSlice({
  name: "housing",
  initialState,
  reducers: {
    setQuarterlyRange: (state, action) => {
      const newQuarterlyRange = action.payload;
      const quarterValuesRange = createNumberToQuarterMap(newQuarterlyRange);

      state.quarterlyRange = getYearlyQuarters(
        quarterValuesRange[0],
        quarterValuesRange[1],
      );
    },
  },
});

export const { setQuarterlyRange } = housingSlice.actions;
export default housingSlice.reducer;
