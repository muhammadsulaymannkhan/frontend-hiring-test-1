import { createSlice } from "@reduxjs/toolkit";
import {
  signInUser,
  getNewToken,
  getCalls,
  getMe,
  getCallById,
} from "./appThunks";

const initialState = {
  isInitialized: false,
  calls: null,
  user: null,
  currentCallId: null,
  currentCallData: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    initializeApp: (state) => {
      state.isInitialized = true;
    },
    setCurrentCallId: (state, action) => {
      localStorage.setItem("currentCallId", action.payload);
    },
  },
  extraReducers: {
    [signInUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("refresh_token", action.payload.refresh_token);
    },
    [getNewToken.fulfilled]: (state, action) => {
      localStorage.setItem("access_token", action.payload.access_token);
      state.user = action.payload.user;
    },
    [getCalls.fulfilled]: (state, action) => {
      state.calls = action.payload;
    },
    [getMe.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [getCallById.fulfilled]: (state, action) => {
      state.currentCallData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initializeApp, setCalls, setCurrentCallId } = appSlice.actions;

export default appSlice.reducer;
