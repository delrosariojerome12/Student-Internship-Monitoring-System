import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./features/globalReducer";

export const store = configureStore({
  reducer: {globalReducer},
});
