import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../pages/HomePage";

// Mock du modèle RawTodoItem
// Pour éviter les dépendances externes, nous mockons le modèle RawTodoItem
// Le mock permet de simuler le comportement du modèle sans avoir besoin de la base de données ou d'une API réelle
jest.mock("../models/RawTodoItem", () => {
  return function MockedRawTodoItem(id: string, title: string) {
    return { id, title};
  };
});

// Mock global de fetch
// Nous mockons la fonction fetch pour simuler les appels API
// Cela permet de tester les interactions avec l'API sans effectuer de requêtes réelles
global.fetch = jest.fn();

// deux tests unitaires pour la page HomePage
// 1. Vérifier que les todos initiaux sont affichés
// 2. Vérifier que l'ajout d'un todo envoie une requête API et met à jour l'affichage
describe("HomePage test", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("ajoute un todo et envoie une requête API", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({ ok: true });

    render(<HomePage />);

    // Remplir les champs
    fireEvent.change(screen.getByPlaceholderText(/titre/i), {
      target: { value: "Nouvelle tâche" },
    });

    // Soumettre
    fireEvent.click(screen.getByRole("button", { name: /ajouter la tâche/i }));

    // Vérifie que le todo a été ajouté à l'écran
    await waitFor(() => {
      expect(screen.getByText("Nouvelle tâche")).toBeInTheDocument();
    });

    // Vérifie que fetch a été appelé avec les bons arguments
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(2, "http://localhost:3001/todos/", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ title: "Nouvelle tâche" }),
    });
  });
});
