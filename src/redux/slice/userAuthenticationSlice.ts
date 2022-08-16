import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { authStatusInterface } from "../interface/authenticationInterface";
import { checkUserAuthentication } from "../../cookie/authCookie";

const initialState = (): authStatusInterface => {
  return { isAuthenticated: checkUserAuthentication() };
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
