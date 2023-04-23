import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import '@testing-library/jest-dom/extend-expect';

test('renders learn react link', () => {
    render(<Greeting/>);
    const linkElement = screen.getByText(/Hello/i);
    expect(linkElement).toBeInTheDocument();
  })