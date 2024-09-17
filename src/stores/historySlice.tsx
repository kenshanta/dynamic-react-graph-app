import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  history: string[] | never[];
}

const initialState: InitialStateProps = {
  history: JSON.parse(sessionStorage.getItem("historyUrl") || "[]"),
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    createHistoryEntry(state, action) {
      state.history = [...state.history, action.payload];
    },
    addHistoryEntry(state) {
      sessionStorage.setItem("historyUrl", JSON.stringify([...state.history]));
    },
    addAgreementEntry() {
      sessionStorage.setItem("agreed", "true");
    },
    addDisagreementEntry() {
      sessionStorage.setItem("agreed", "false");
    },
    removeHistoryEntry(state) {
      state.history.pop();
    },
    clearHistoryEntry(state) {
      sessionStorage.removeItem("historyUrl");
      sessionStorage.removeItem("agreed");
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
  addAgreementEntry,
  addDisagreementEntry,
} = historySlice.actions;
export default historySlice.reducer;
