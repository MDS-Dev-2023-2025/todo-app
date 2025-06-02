import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import * as React from "react";

jest.mock("../models/RawTodoItem", () => {
  return function MockedRawTodoItem(id: string, title: string, description: string) {
    return { id, title, description };
  };
});

// Mock global de fetch
global.fetch = jest.fn();

describe("HomePage test", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("affiche les todos initiaux", () => {
    render(<HomePage />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  test("ajoute un todo et envoie une requête API", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<HomePage />);

    // Remplir les champs
    fireEvent.change(screen.getByPlaceholderText(/titre/i), {
      target: { value: "Nouvelle tâche" },
    });

    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: "Description test" },
    });

    // Soumettre
    fireEvent.click(screen.getByRole("button", { name: /ajouter la tâche/i }));

    // Vérifie que le todo a été ajouté à l'écran
    await waitFor(() => {
      expect(screen.getByText("Nouvelle tâche")).toBeInTheDocument();
    });

    // Vérifie que fetch a été appelé avec les bons arguments
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/api/todos/", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ title: "Nouvelle tâche" }),
    });
  });
});
