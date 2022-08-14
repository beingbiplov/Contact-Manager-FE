import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { authStatusInterface } from "../interface/authenticationInterface";

const initialState = (): authStatusInterface => {
  return { isAuthenticated: false };
};

export const userAuthenticationSlice = createSlice({
  name: "userAuthentication",
  initialState: initialState(),
  reducers: {
    setUserAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUserAuthState } = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;
