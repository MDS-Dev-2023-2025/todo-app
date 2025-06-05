describe('Todo App - Add Todo', () => {
  beforeEach(() => {
    cy.clearAllTodos()
    cy.visit('/')
  })

  it('should add a new todo with title only', () => {
    const todoTitle = 'Nouvelle tâche de test'
    
    cy.addTodo(todoTitle)
    
    cy.get('[data-cy=todo-list]').should('contain', todoTitle)
    cy.get('[data-cy=todo-item]').should('have.length', 1) // 1 new todo
  })

  it('should add multiple todos', () => {
    const todoTitle1 = 'Première tâche'
    const todoTitle2 = 'Deuxième tâche'
    
    cy.addTodo(todoTitle1)
    cy.addTodo(todoTitle2)
    
    cy.get('[data-cy=todo-list]').should('contain', todoTitle1)
    cy.get('[data-cy=todo-list]').should('contain', todoTitle2)
    cy.get('[data-cy=todo-item]').should('have.length', 2)
  })

  it('should not add todo with empty title', () => {
    cy.get('[data-cy=submit-todo-button]').should('be.disabled')
    
    cy.get('[data-cy=todo-title-input]').type('   ') // spaces only
    cy.get('[data-cy=submit-todo-button]').should('be.disabled')
    
    cy.get('[data-cy=todo-item]').should('have.length', 0) // No todos added
  })

  it('should clear form after adding todo', () => {
    const todoTitle = 'Test clear form'
    
    cy.addTodo(todoTitle)
    
    cy.get('[data-cy=todo-title-input]').should('have.value', '')
  })
})