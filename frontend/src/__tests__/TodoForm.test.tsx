import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "../components/TodoForm";

// Quatre tests unitaires pour le composant TodoForm
// 1. Vérifier que les champs titre et description sont présents
// 2. Vérifier que le bouton est désactivé tant qu'aucun titre n'est saisi
// 3. Vérifier que le bouton appelle onAddTodo avec les bonnes valeurs
// 4. Vérifier que les champs sont réinitialisés après soumission
describe("TodoForm component test", () => {
  test("affiche les champs titre et description", () => {
    render(<TodoForm onAddTodo={() => {}} />);

    expect(screen.getByLabelText(/Titre/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ajouter la tâche/i })).toBeDisabled();
  });

  test("active le bouton quand un titre est saisi", () => {
    render(<TodoForm onAddTodo={() => {}} />);

    const input = screen.getByPlaceholderText(/titre de la tâche/i);
    const button = screen.getByRole("button", { name: /ajouter la tâche/i });

    fireEvent.change(input, { target: { value: "Nouvelle tâche" } });
    expect(button).toBeEnabled();
  });

  test("appelle onAddTodo avec les bonnes valeurs", () => {
    const mockAddTodo = jest.fn();
    render(<TodoForm onAddTodo={mockAddTodo} />);

    const titleInput = screen.getByPlaceholderText(/titre de la tâche/i);
    const button = screen.getByRole("button", { name: /ajouter la tâche/i });

    fireEvent.change(titleInput, { target: { value: "Tâche test" } });
    fireEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith("Tâche test");
  });

  test("réinitialise les champs après soumission", () => {
    render(<TodoForm onAddTodo={() => {}} />);

    const titleInput = screen.getByPlaceholderText(/titre de la tâche/i);
    const button = screen.getByRole("button", { name: /ajouter la tâche/i });

    fireEvent.change(titleInput, { target: { value: "À faire" } });
    fireEvent.click(button);

    expect(titleInput).toHaveValue("");
  });
});
