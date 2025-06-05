describe("Todo App - Delete Todo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should delete a todo", () => {
    cy.get("[data-cy=todo-item]").should("have.length", 3);

    // Supprimer le premier élément (Item 1)
    cy.get("[data-cy=todo-item]")
      .first()
      .find("[data-cy=delete-todo-button]")
      .click();

    // Attendre que React re-rende
    cy.get("[data-cy=todo-item]").should("have.length", 2);

    // Vérifier que "Item 1" a été supprimé
    cy.get("[data-cy=todo-list]").should("not.contain", "Item 1");

    // Vérifier que les autres restent
    cy.get("[data-cy=todo-list]").should("contain", "Item 2");
    cy.get("[data-cy=todo-list]").should("contain", "Item 3");
  });

  it("should delete the correct todo when multiple exist", () => {
    cy.get("[data-cy=todo-item]").should("have.length", 3);

    // Capturer le titre du todo qu'on va supprimer (deuxième élément = "Item 2")
    cy.get("[data-cy=todo-item]")
      .eq(1)
      .find("[data-cy=todo-title]")
      .invoke("text")
      .as("todoToDelete");

    // Supprimer le deuxième élément
    cy.get("[data-cy=todo-item]")
      .eq(1)
      .find("[data-cy=delete-todo-button]")
      .click();

    // Attendre que React re-rende et vérifier le nombre d'éléments
    cy.get("[data-cy=todo-item]").should("have.length", 2);

    // Vérifier que "Item 2" a été supprimé
    cy.get("[data-cy=todo-list]").should("not.contain", "Item 2");

    // Vérifier que les autres restent
    cy.get("[data-cy=todo-list]").should("contain", "Item 1");
    cy.get("[data-cy=todo-list]").should("contain", "Item 3");
  });

  it("should delete completed todos", () => {
    cy.get("[data-cy=todo-item]")
      .first()
      .within(() => {
        cy.get("[data-cy=todo-checkbox]").check();
        cy.get("[data-cy=delete-todo-button]").click();
      });

    cy.get("[data-cy=todo-item]").should("have.length", 2);
  });

  it("should show empty state when all todos are deleted", () => {
    cy.get("[data-cy=todo-item]").each(($el) => {
      cy.wrap($el).within(() => {
        cy.get("[data-cy=delete-todo-button]").click();
      });
    });

    cy.get("[data-cy=empty-state]").should("be.visible");
    cy.get("[data-cy=empty-state]").should(
      "contain",
      "Aucune tâche pour le moment",
    );
  });

  it("should maintain proper todo order after deletion", () => {
    cy.get("[data-cy=todo-item]")
      .eq(0)
      .within(() => {
        cy.get("[data-cy=delete-todo-button]").click();
      });

    cy.get("[data-cy=todo-item]").should("have.length", 2);
    cy.get("[data-cy=todo-item]").first().should("contain", "Item 2");
    cy.get("[data-cy=todo-item]").last().should("contain", "Item 3");
  });
});
