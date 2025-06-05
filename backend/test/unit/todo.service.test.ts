import { TodoService } from "../../src/services/todo.service";

describe("TodoService", () => {
  let service: TodoService;

  // Create a new instance before each test to avoid state leaks
  beforeEach(() => {
    service = new TodoService();
  });

  // Test for creating a new todo item
  it("should create a todo", async () => {
    const todo = await service.createTodo({ title: "Test" });
    expect(todo).toMatchObject({ title: "Test", completed: false });
  });

  // Test for retrieving all todos
  it("should return all todos", async () => {
    await service.createTodo({ title: "One" });
    await service.createTodo({ title: "Two" });
    const todos = await service.getAllTodos();
    expect(todos).toHaveLength(2);
  });

  // Test for updating an existing todo
  it("should update a todo", async () => {
    const { id } = await service.createTodo({ title: "Update me" });
    const updated = await service.updateTodo(id, {
      title: "Updated",
      completed: true
    });
    expect(updated.title).toBe("Updated");
    expect(updated.completed).toBe(true);
  });

  // Test for throwing an error when updating a non-existent todo
  it("should throw if todo to update not found", async () => {
    await expect(
      service.updateTodo("invalid", { title: "Test" })
    ).rejects.toThrow("Todo not found");
  });

  // Test for deleting a todo
  it("should delete a todo", async () => {
    const { id } = await service.createTodo({ title: "Delete me" });
    await service.deleteTodo(id);
    const todos = await service.getAllTodos();
    expect(todos).toHaveLength(0);
  });

  // Test for throwing an error when deleting a non-existent todo
  it("should throw if todo to delete not found", async () => {
    await expect(service.deleteTodo("invalid")).rejects.toThrow(
      "Todo not found"
    );
  });
});
