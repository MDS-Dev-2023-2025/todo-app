describe('Todo App - Complete Todo', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.addTodo('Première tâche')
    cy.addTodo('Deuxième tâche')
  })

  it('should mark a todo as completed', () => {
    cy.get('[data-cy=todo-item]').first().within(() => {
      cy.get('[data-cy=todo-checkbox]').should('not.be.checked')
      cy.get('[data-cy=todo-checkbox]').check()
      cy.get('[data-cy=todo-checkbox]').should('be.checked')
    })
  })

  it('should mark a todo as uncompleted', () => {
    cy.get('[data-cy=todo-item]').first().within(() => {
      cy.get('[data-cy=todo-checkbox]').check()
      cy.get('[data-cy=todo-checkbox]').should('be.checked')
      cy.get('[data-cy=todo-checkbox]').uncheck()
      cy.get('[data-cy=todo-checkbox]').should('not.be.checked')
    })
  })

  it('should apply completed styling to completed todos', () => {
    cy.get('[data-cy=todo-item]').first().within(() => {
      cy.get('[data-cy=todo-checkbox]').check()
      
      // Vérifier que le CSS completed est appliqué en vérifiant les styles calculés
      cy.get('[data-cy=todo-title]').should(($el) => {
        const classList = $el[0].className
        expect(classList).to.include('completed')
      })
    })
  })

  it('should maintain completed state when adding new todos', () => {
    cy.get('[data-cy=todo-item]').first().within(() => {
      cy.get('[data-cy=todo-checkbox]').check()
    })

    cy.addTodo('Nouvelle tâche')

    cy.get('[data-cy=todo-item]').first().within(() => {
      cy.get('[data-cy=todo-checkbox]').should('be.checked')
    })
  })
})