import { render, screen } from "@testing-library/react";
import Expense from "./Expense";
import { Provider } from "react-redux";
import Store from "../../Store/index";
import { BrowserRouter } from "react-router-dom";
test("Present Item", () => {
  render(
    <BrowserRouter>
      <Provider store={Store}>
        <Expense />
      </Provider>
    </BrowserRouter>
  );

  const headerText = screen.getByText("Welcome");
  expect(headerText).toBeInTheDocument();
})

