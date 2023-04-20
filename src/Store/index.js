import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import expenseReducer from "./expense-reducer";

const Store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer },
});

export default Store;
