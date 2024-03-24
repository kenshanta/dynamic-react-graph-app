import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [""],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistoryEntry(state, action) {
      state.history.push(action.payload);
    },
  },
});

export const { addHistoryEntry } = historySlice.actions;
export default historySlice.reducer;
