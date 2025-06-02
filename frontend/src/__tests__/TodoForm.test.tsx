import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "../components/TodoForm";

describe("TodoForm component test", () => {
  test("affiche les champs titre et description", () => {
    render(<TodoForm onAddTodo={() => {}} />);

    expect(screen.getByLabelText(/Titre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ajouter la tâche/i })).toBeDisabled();
  });
/*
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
    const descInput = screen.getByPlaceholderText(/description/i);
    const button = screen.getByRole("button", { name: /ajouter la tâche/i });

    fireEvent.change(titleInput, { target: { value: "Tâche test" } });
    fireEvent.change(descInput, { target: { value: "Ceci est une description" } });
    fireEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    expect(mockAddTodo).toHaveBeenCalledWith("Tâche test", "Ceci est une description");
  });

  test("réinitialise les champs après soumission", () => {
    render(<TodoForm onAddTodo={() => {}} />);

    const titleInput = screen.getByPlaceholderText(/titre de la tâche/i);
    const descInput = screen.getByPlaceholderText(/description/i);
    const button = screen.getByRole("button", { name: /ajouter la tâche/i });

    fireEvent.change(titleInput, { target: { value: "À faire" } });
    fireEvent.change(descInput, { target: { value: "Détails" } });
    fireEvent.click(button);

    expect(titleInput).toHaveValue("");
    expect(descInput).toHaveValue("");
  });*/
});
