// cypress/support/commands.ts

declare global {
  namespace Cypress {
    interface Chainable {
      addTodo(title: string, description?: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('addTodo', (title: string, description: string = '') => {
  cy.get('[data-cy=todo-title-input]').type(title)
  if (description) {
    cy.get('[data-cy=todo-description-input]').type(description)
  }
  cy.get('[data-cy=submit-todo-button]').click()
})

export {}