// cypress/support/commands.ts

declare global {
  namespace Cypress {
    interface Chainable {
      addTodo(title: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('addTodo', (title: string) => {
  cy.get('[data-cy=todo-title-input]').type(title)
  cy.get('[data-cy=submit-todo-button]').click()
})

export {}