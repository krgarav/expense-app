import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = { isLoggedIn: false, bearer_token: "" };
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.bearer_token = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.bearer_token = "";
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
