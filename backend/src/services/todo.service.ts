import { Todo } from "../models/todo.model";

export class TodoService {
  private todos: Todo[] = [];

  async getAllTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async createTodo(todoData: Pick<Todo, "title">): Promise<Todo> {
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...todoData,
      completed: false
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  async updateTodo(id: string, todoData: Partial<Todo>): Promise<Todo> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error("Todo not found");
    }
    this.todos[todoIndex] = { ...this.todos[todoIndex], ...todoData };
    return this.todos[todoIndex];
  }

  async deleteTodo(id: string): Promise<void> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new Error("Todo not found");
    }
    this.todos.splice(todoIndex, 1);
  }

  async deleteAllTodos(): Promise<void> {
    this.todos = [];
  }
}
