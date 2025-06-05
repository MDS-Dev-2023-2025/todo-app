import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import RawTodoItem from "../models/RawTodoItem";

// Deux tests unitaires pour le composant TodoList
// 1. Vérifier que tous les todos passés en props sont affichés
// 2. Vérifier que rien n'est affiché si la liste est vide
describe("TodoList component test", () => {
  test("affiche tous les todos passés en props", () => {
    const exempleTodos: RawTodoItem[] = [
      new RawTodoItem("1", "title1"),
      new RawTodoItem("2", "title2"),
      new RawTodoItem("3", "title3"),
    ];

    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();

    render(<TodoList todos={exempleTodos} onToggleTodo={mockOnToggle} onDeleteTodo={mockOnDelete} />);

    // Vérifier que chaque titre est affiché
    exempleTodos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });
  });

  test("n'affiche rien si la liste est vide", () => {
    const mockOnToggle = jest.fn();
    const mockOnDelete = jest.fn();

    render(<TodoList todos={[]} onToggleTodo={mockOnToggle} onDeleteTodo={mockOnDelete} />);
    
    expect(screen.getByText("Aucune tâche pour le moment")).toBeInTheDocument();
  });
});
