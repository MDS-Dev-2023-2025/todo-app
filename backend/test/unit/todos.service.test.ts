import { beforeEach, describe, it, expect } from "@jest/globals";
import { TodoService } from "../../src/services/todo.service";

describe("TodoService", () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  it("should create a todo", async () => {
    const todo = await service.createTodo({ title: "Test Todo" });
    expect(todo).toMatchSnapshot();
  });

  it("should return all todos", async () => {
    await service.createTodo({ title: "Todo 1" });
    const todos = await service.getAllTodos();
    expect(todos.length).toBe(1);
  });

  it("should update a todo", async () => {
    const todo = await service.createTodo({ title: "Initial" });
    const updated = await service.updateTodo(todo.id, { completed: true });
    expect(updated.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    const todo = await service.createTodo({ title: "To Delete" });
    await service.deleteTodo(todo.id);
    const todos = await service.getAllTodos();
    expect(todos).toHaveLength(0);
  });

  it("should throw an error if the todo to delete is not found", async () => {
    await expect(service.deleteTodo("nonexistent")).rejects.toThrow(
      "Todo not found"
    );
  });
});
