"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
class TodoService {
    constructor() {
        this.todos = [];
    }
    async getAllTodos() {
        return this.todos;
    }
    async createTodo(todoData) {
        const newTodo = {
            id: Date.now().toString(),
            ...todoData,
            completed: false
        };
        this.todos.push(newTodo);
        return newTodo;
    }
    async updateTodo(id, todoData) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            throw new Error("Todo not found");
        }
        this.todos[todoIndex] = { ...this.todos[todoIndex], ...todoData };
        return this.todos[todoIndex];
    }
    async deleteTodo(id) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === id);
        if (todoIndex === -1) {
            throw new Error("Todo not found");
        }
        this.todos.splice(todoIndex, 1);
    }
    async deleteAllTodos() {
        this.todos = [];
    }
}
exports.TodoService = TodoService;
