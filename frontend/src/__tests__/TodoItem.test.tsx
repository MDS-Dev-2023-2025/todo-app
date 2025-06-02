import { render, screen } from "@testing-library/react";
import TodoItem from "../components/TodoItem";

describe("test TodoItem component", () => {
  test("affiche le titre passé en prop", () => {
    const title = "test todo item";
    render(<TodoItem title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("affiche une case à cocher", () => {
    render(<TodoItem title="Test" />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });
});
