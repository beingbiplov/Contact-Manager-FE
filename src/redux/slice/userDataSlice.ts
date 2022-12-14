import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { userDataInterface } from "../interface/userInterface";
import { getUserDataFromCookie } from "../../cookie/authCookie";

const initialState = (): userDataInterface => {
  return getUserDataFromCookie();
};

export const userDataSlice = createSlice({
  name: "userAuthentication",
  initialState: initialState(),
  reducers: {
    setUserData: (state, action: PayloadAction<userDataInterface>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setUserData, setUserName } = userDataSlice.actions;
export default userDataSlice.reducer;
