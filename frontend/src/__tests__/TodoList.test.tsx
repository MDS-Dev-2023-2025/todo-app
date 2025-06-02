import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import RawTodoItem from "../models/RawTodoItem";

describe("TodoList component test", () => {
  test("affiche tous les todos passés en props", () => {
    const exempleTodos: RawTodoItem[] = [
      { id: "1", title: "title1", description: "desc1" },
      { id: "2", title: "title2", description: "desc2" },
      { id: "3", title: "title3", description: "desc3" },
    ];

    render(<TodoList todos={exempleTodos} />);

    // Vérifier que chaque titre est affiché
    exempleTodos.forEach((todo) => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
    });
  });

  test("n'affiche rien si la liste est vide", () => {
    render(<TodoList todos={[]} />);
  });
});
