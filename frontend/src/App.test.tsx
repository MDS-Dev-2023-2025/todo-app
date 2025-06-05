import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>,
}));

test("renders todo app", () => {
  render(<App />);
  const titleElement = screen.getByText(/todo app/i);
  expect(titleElement).toBeInTheDocument();
});
