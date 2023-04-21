import { createSlice } from "@reduxjs/toolkit";
const initialtoken =localStorage.getItem("token")
const initialAuthState = { isLoggedIn: initialtoken?true:false, bearer_token: initialtoken?initialtoken:"",email_verified:false};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.bearer_token = action.payload;
      localStorage.setItem("token",action.payload)
    },
    logout(state) {
      state.isLoggedIn = false;
      state.bearer_token = "";
      localStorage.removeItem("token")
    },
    verify(state,action){
      state.email_verified=action.payload
    }
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
