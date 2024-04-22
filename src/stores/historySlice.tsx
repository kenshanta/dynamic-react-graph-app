import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  history: string[] | never[];
}

const initialState: InitialStateProps = {
  history: JSON.parse(localStorage.getItem("historyUrl") || "[]"),
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    createHistoryEntry(state, action) {
      state.history = [...state.history, action.payload];
    },
    addHistoryEntry(state) {
      localStorage.setItem("historyUrl", JSON.stringify([...state.history]));
    },
    removeHistoryEntry(state) {
      state.history.pop();
    },
    clearHistoryEntry(state) {
      localStorage.clear();
      state.history = [];
      // window.location.reload();
    },
  },
});

export const {
  addHistoryEntry,
  createHistoryEntry,
  clearHistoryEntry,
  removeHistoryEntry,
} = historySlice.actions;
export default historySlice.reducer;
