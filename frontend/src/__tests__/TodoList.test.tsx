import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";
import RawTodoItem from "../models/RawTodoItem";

// Deux tests unitaires pour le composant TodoList
// 1. Vérifier que tous les todos passés en props sont affichés
// 2. Vérifier que rien n'est affiché si la liste est vide
describe("TodoList component test", () => {
  test("affiche tous les todos passés en props", () => {
    const exempleTodos: RawTodoItem[] = [
      { id: "1", title: "title1" },
      { id: "2", title: "title2" },
      { id: "3", title: "title3" },
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
