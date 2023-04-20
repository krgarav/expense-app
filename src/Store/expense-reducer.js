import { createSlice } from "@reduxjs/toolkit";
const initialExpenseState = { expense: [], totalAmount: 0 };

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      if (state.expense.length === 0) {
        const expense = state.expense.concat(action.payload);
        const postData = async () => {
          const response = await fetch(
            "https://expense-app-e491d-default-rtdb.firebaseio.com/items.json",
            {
              method: "POST",
              body: JSON.stringify({ expense }),
              headers: {
                "Content-Text": "application/json",
              },
            }
          );
          const data = await response.json();

          localStorage.setItem("id", data.name);
        };
        postData();

        state.expense = expense;
        const length = state.expense.length;
        let amount = 0;
        for (let i = 0; i <= length - 1; i++) {
          amount += Number(state.expense[i].amount);
        }
        state.totalAmount = amount;
      } else {
        const expense = state.expense.concat(action.payload);
        const postData = async () => {
          const id = localStorage.getItem("id");
          const response = await fetch(
            "https://expense-app-e491d-default-rtdb.firebaseio.com/items/" +
              id +
              ".json",
            {
              method: "PUT",
              body: JSON.stringify({ expense }),
              headers: {
                "Content-Text": "application/json",
              },
            }
          );
          const data = await response.json();
        };
        postData();
        state.expense = expense;
        const length = state.expense.length;
        let amount=0;
        for (let i = 0; i <= length - 1; i++) {
          amount += Number(state.expense[i].amount);
        }
        state.totalAmount = amount;
      }
    },
    removeExpense(state, action) {
      if (state.expense.length === 0) {
        const id = localStorage.getItem("id");
        const response = fetch(
          "https://expense-app-e491d-default-rtdb.firebaseio.com/" +
            id +
            ".json",
          {
            method: "DELETE",
          }
        );
      } else {
        const expense = state.expense.filter(
          (item) => item.description !== action.payload
        );
        const id = localStorage.getItem("id");
        const response = fetch(
          "https://expense-app-e491d-default-rtdb.firebaseio.com/items/" +
            id +
            ".json",
          {
            method: "PUT",
            body: JSON.stringify({ expense }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        state.expense = expense;
      }
    },
  },
});

export const expenseAction = expenseSlice.actions;
export default expenseSlice.reducer;
