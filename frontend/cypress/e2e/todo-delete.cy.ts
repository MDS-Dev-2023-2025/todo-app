describe('Todo App - Delete Todo', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.addTodo('Première tâche')
    cy.addTodo('Deuxième tâche')
    cy.addTodo('Troisième tâche')
  })

  it('should delete a todo', () => {
    cy.get('[data-cy=todo-item]').should('have.length', 3)
    
    // Supprimer le premier élément
    cy.get('[data-cy=todo-item]').first().find('[data-cy=delete-todo-button]').click()

    // Attendre que React re-rende
    cy.get('[data-cy=todo-item]').should('have.length', 2)
    
    // Vérifier que "Première tâche" a été supprimée
    cy.get('[data-cy=todo-list]').should('not.contain', 'Première tâche')
    
    // Vérifier que les autres restent
    cy.get('[data-cy=todo-list]').should('contain', 'Deuxième tâche')
    cy.get('[data-cy=todo-list]').should('contain', 'Troisième tâche')
  })

  it('should delete the correct todo when multiple exist', () => {
    cy.get('[data-cy=todo-item]').should('have.length', 3)
    
    // Supprimer le deuxième élément
    cy.get('[data-cy=todo-item]').eq(1).find('[data-cy=delete-todo-button]').click()

    // Attendre que React re-rende et vérifier le nombre d'éléments
    cy.get('[data-cy=todo-item]').should('have.length', 2)
    
    // Vérifier que "Deuxième tâche" a été supprimée
    cy.get('[data-cy=todo-list]').should('not.contain', 'Deuxième tâche')
    
    // Vérifier que les autres restent
    cy.get('[data-cy=todo-list]').should('contain', 'Première tâche')
    cy.get('[data-cy=todo-list]').should('contain', 'Troisième tâche')
  })

  it('should delete completed todos', () => {
    cy.get('[data-cy=todo-item]').first().within(() => {
      cy.get('[data-cy=todo-checkbox]').check()
      cy.get('[data-cy=delete-todo-button]').click()
    })

    cy.get('[data-cy=todo-item]').should('have.length', 2)
  })

  it('should show empty state when all todos are deleted', () => {
    // Supprimer tous les todos un par un
    cy.get('[data-cy=todo-item]').first().find('[data-cy=delete-todo-button]').click()
    cy.get('[data-cy=todo-item]').first().find('[data-cy=delete-todo-button]').click()
    cy.get('[data-cy=todo-item]').first().find('[data-cy=delete-todo-button]').click()

    cy.get('[data-cy=empty-state]').should('be.visible')
    cy.get('[data-cy=empty-state]').should('contain', 'Aucune tâche pour le moment')
  })

  it('should maintain proper todo order after deletion', () => {
    cy.get('[data-cy=todo-item]').eq(0).within(() => {
      cy.get('[data-cy=delete-todo-button]').click()
    })

    cy.get('[data-cy=todo-item]').should('have.length', 2)
    cy.get('[data-cy=todo-item]').first().should('contain', 'Deuxième tâche')
    cy.get('[data-cy=todo-item]').last().should('contain', 'Troisième tâche')
  })
})