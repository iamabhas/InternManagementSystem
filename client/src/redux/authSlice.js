import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: null,
  token: null,
  userId: null,
  userName: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload.user_role;
      state.token = action.payload.access_token;
      state.userId = action.payload.user_id;
      state.userName = action.payload.user_Name;
    },
    logoutReducer: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.token = null;
      state.userId = null;
      state.userName = null;
    },
  },
});
export const { loginReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
