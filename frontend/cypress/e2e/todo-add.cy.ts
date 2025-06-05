describe("Todo App - Add Todo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add a new todo with title only", () => {
    const todoTitle = "Nouvelle tâche de test";

    cy.addTodo(todoTitle);

    cy.get("[data-cy=todo-list]").should("contain", todoTitle);
    cy.get("[data-cy=todo-item]").should("have.length", 4); // 3 initial + 1 new
  });

  it("should add a new todo with title and description", () => {
    const todoTitle = "Tâche avec description";
    const todoDescription = "Ceci est une description de test";

    cy.addTodo(todoTitle, todoDescription);

    cy.get("[data-cy=todo-list]").should("contain", todoTitle);
    cy.get("[data-cy=todo-item]")
      .last()
      .within(() => {
        cy.get("[data-cy=todo-title]").should("contain", todoTitle);
        cy.get("[data-cy=todo-description]").should("contain", todoDescription);
      });
  });

  it("should not add todo with empty title", () => {
    cy.get("[data-cy=submit-todo-button]").should("be.disabled");

    cy.get("[data-cy=todo-description-input]").type("Description sans titre");
    cy.get("[data-cy=submit-todo-button]").should("be.disabled");

    cy.get("[data-cy=todo-item]").should("have.length", 3); // Only initial todos
  });

  it("should clear form after adding todo", () => {
    const todoTitle = "Test clear form";
    const todoDescription = "Test description";

    cy.addTodo(todoTitle, todoDescription);

    cy.get("[data-cy=todo-title-input]").should("have.value", "");
    cy.get("[data-cy=todo-description-input]").should("have.value", "");
  });
});
