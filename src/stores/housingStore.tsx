import { configureStore } from "@reduxjs/toolkit";
import housingReducer from "./slice";

const housingStore = configureStore({ reducer: { housing: housingReducer } });

export default housingStore;
