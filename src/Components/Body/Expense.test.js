import { render, screen } from "@testing-library/react";
import Expense from "./Expense";
test("Present Item", () => {
  render(<Expense />);

  const headerText = screen.getByText("Welcome To Expense Tracker!!!w", {
    exact: false,
  });
  expect(headerText.toBeInTheDocument());
});
