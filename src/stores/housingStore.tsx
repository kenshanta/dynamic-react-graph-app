import { configureStore } from "@reduxjs/toolkit";
import historyUrlReducer from "./historySlice";

const housingStore = configureStore({
  reducer: { history: historyUrlReducer },
});

export default housingStore;
