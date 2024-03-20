import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Comments header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Comments/i);
  expect(headerElement).toBeInTheDocument();
});
