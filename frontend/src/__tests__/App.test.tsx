import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>,
}));

describe("App component", () => {
  test("Test composant principale", () => {
    render(<App />);
    expect(screen.getByText(/todo app/i)).toBeInTheDocument();
  });
});
