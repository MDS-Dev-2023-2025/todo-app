import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  test("Test composant principale", () => {
    render(<App />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
