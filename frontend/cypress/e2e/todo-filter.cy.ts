describe("Todo App - Filter Todos", () => {
  beforeEach(() => {
    cy.visit("/");

    // Setup test data: mark some todos as completed
    cy.get("[data-cy=todo-item]")
      .first()
      .within(() => {
        cy.get("[data-cy=todo-checkbox]").check();
      });

    cy.addTodo("Nouvelle tâche active");
  });

  it("should show all todos by default", () => {
    cy.get("[data-cy=filter-all]").should(($el) => {
      const classList = $el[0].className;
      expect(classList).to.include("activeFilter");
    });
    cy.get("[data-cy=todo-item]").should("have.length", 4); // 3 initial + 1 new
  });

  it("should filter to show only active todos", () => {
    cy.get("[data-cy=filter-active]").click();

    cy.get("[data-cy=filter-active]").should(($el) => {
      const classList = $el[0].className;
      expect(classList).to.include("activeFilter");
    });
    cy.get("[data-cy=todo-item]").should("have.length", 3); // 2 initial active + 1 new

    cy.get("[data-cy=todo-item]").each(($el) => {
      cy.wrap($el).within(() => {
        cy.get("[data-cy=todo-checkbox]").should("not.be.checked");
      });
    });
  });

  it("should filter to show only completed todos", () => {
    cy.get("[data-cy=filter-completed]").click();

    cy.get("[data-cy=filter-completed]").should(($el) => {
      const classList = $el[0].className;
      expect(classList).to.include("activeFilter");
    });
    cy.get("[data-cy=todo-item]").should("have.length", 1); // Only 1 completed

    cy.get("[data-cy=todo-item]").within(() => {
      cy.get("[data-cy=todo-checkbox]").should("be.checked");
    });
  });

  it("should update filters when todo status changes", () => {
    cy.get("[data-cy=filter-active]").click();
    cy.get("[data-cy=todo-item]").should("have.length", 3);

    cy.get("[data-cy=todo-item]")
      .first()
      .within(() => {
        cy.get("[data-cy=todo-checkbox]").check();
      });

    cy.get("[data-cy=todo-item]").should("have.length", 2);
  });

  it("should show empty state when no todos match filter", () => {
    // Mark all remaining todos as completed
    cy.get("[data-cy=todo-item]").each(($el) => {
      cy.wrap($el).within(() => {
        cy.get("[data-cy=todo-checkbox]").check({ force: true });
      });
    });

    cy.get("[data-cy=filter-active]").click();
    cy.get("[data-cy=empty-state]").should("be.visible");
  });

  it("should maintain filter state when adding new todos", () => {
    cy.get("[data-cy=filter-active]").click();

    cy.addTodo("Encore une nouvelle tâche");

    cy.get("[data-cy=filter-active]").should(($el) => {
      const classList = $el[0].className;
      expect(classList).to.include("activeFilter");
    });
    cy.get("[data-cy=todo-list]").should(
      "contain",
      "Encore une nouvelle tâche",
    );
  });

  it("should switch between filters correctly", () => {
    cy.get("[data-cy=filter-completed]").click();
    cy.get("[data-cy=todo-item]").should("have.length", 1);

    cy.get("[data-cy=filter-all]").click();
    cy.get("[data-cy=todo-item]").should("have.length", 4);

    cy.get("[data-cy=filter-active]").click();
    cy.get("[data-cy=todo-item]").should("have.length", 3);
  });
});
