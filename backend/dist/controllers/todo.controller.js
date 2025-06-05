"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = require("../services/todo.service");
class TodoController {
    constructor() {
        this.getAllTodos = async (req, res) => {
            try {
                const todos = await this.todoService.getAllTodos();
                res.json(todos);
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching todos" });
            }
        };
        this.createTodo = async (req, res) => {
            try {
                const todo = await this.todoService.createTodo(req.body);
                res.status(201).json(todo);
            }
            catch (error) {
                res.status(400).json({ message: "Error creating todo" });
            }
        };
        this.updateTodo = async (req, res) => {
            try {
                const todo = await this.todoService.updateTodo(req.params.id, req.body);
                res.json(todo);
            }
            catch (error) {
                res.status(400).json({ message: "Error updating todo" });
            }
        };
        this.deleteTodo = async (req, res) => {
            try {
                await this.todoService.deleteTodo(req.params.id);
                res.status(204).send();
            }
            catch (error) {
                res.status(400).json({ message: "Error deleting todo" });
            }
        };
        this.deleteAllTodos = async (req, res) => {
            try {
                await this.todoService.deleteAllTodos();
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting all todos" });
            }
        };
        this.todoService = new todo_service_1.TodoService();
    }
}
exports.TodoController = TodoController;
