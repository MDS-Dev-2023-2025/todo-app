import { render, screen } from "@testing-library/react";
import TodoItem from "../components/TodoItem";

// deux tests unitaire pour le composant TodoItem
// 1. Vérifier que le titre est affiché correctement
// 2. Vérifier que la case à cocher est présente
// ce test ne dépend pas des autres composants de l'application
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
