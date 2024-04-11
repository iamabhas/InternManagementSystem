import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.token = action.payload.accessToken;
    },
    logoutReducer: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.token = null;
    },
  },
});
