import { render, screen } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import RawTodoItem from "../models/RawTodoItem";

// deux tests unitaire pour le composant TodoItem
// 1. Vérifier que le titre est affiché correctement
// 2. Vérifier que la case à cocher est présente
// ce test ne dépend pas des autres composants de l'application
describe("test TodoItem component", () => {
  test("affiche le titre passé en prop", () => {
    const title = "test todo item";
    const todo = new RawTodoItem("1", title);

    const handleToggleTodo = jest.fn();
    const handleDeleteTodo = jest.fn();

    render(<TodoItem todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test("affiche une case à cocher", () => {
    const todo = new RawTodoItem("1", "Test");
    const handleToggleTodo = jest.fn();
    const handleDeleteTodo = jest.fn();

    render(<TodoItem todo={todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });
});
