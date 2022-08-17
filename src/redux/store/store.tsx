import { configureStore } from "@reduxjs/toolkit";

import userAuthReducer from "../slice/userAuthenticationSlice";
import userDataReducer from "../slice/userDataSlice";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
