import { TodoService } from "../../src/services/todo.service";

describe("TodoService", () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  it("devrait créer un todo", async () => {
    const todo = await service.createTodo({ title: "Test Todo" });
    expect(todo.title).toBe("Test Todo");
    expect(todo.completed).toBe(false);
  });

  it("devrait retourner tous les todos", async () => {
    await service.createTodo({ title: "Todo 1" });
    const todos = await service.getAllTodos();
    expect(todos.length).toBe(1);
  });

  it("devrait mettre à jour un todo", async () => {
    const todo = await service.createTodo({ title: "Initial" });
    const updated = await service.updateTodo(todo.id, { completed: true });
    expect(updated.completed).toBe(true);
  });

  it("devrait supprimer un todo", async () => {
    const todo = await service.createTodo({ title: "To Delete" });
    await service.deleteTodo(todo.id);
    const todos = await service.getAllTodos();
    expect(todos).toHaveLength(0);
  });

  it("devrait lancer une erreur si le todo est introuvable à la suppression", async () => {
    await expect(service.deleteTodo("inexistant")).rejects.toThrow(
      "Todo not found"
    );
  });
});
