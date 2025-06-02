import { Request, Response } from "express";
import { TodoService } from "../services/todo.service";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  getAllTodos = async (req: Request, res: Response) => {
    try {
      const todos = await this.todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: "Error fetching todos" });
    }
  };

  createTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.todoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (error) {
      res.status(400).json({ message: "Error creating todo" });
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.todoService.updateTodo(req.params.id, req.body);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ message: "Error updating todo" });
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    try {
      await this.todoService.deleteTodo(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Error deleting todo" });
    }
  };
} 