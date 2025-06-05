import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../../src/app";

describe("Todo Routes", () => {
  let createdTodoId: string;

  it("POST /todos - creates a todo", async () => {
    const response = await request(app)
      .post("/todos")
      .send({ title: "Test route" });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toMatchInlineSnapshot(`"Test route"`);
    createdTodoId = response.body.id;
  });

  it("GET /todos - retrieves all todos", async () => {
    const response = await request(app).get("/todos");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("PUT /todos/:id - updates a todo", async () => {
    const response = await request(app)
      .put(`/todos/${createdTodoId}`)
      .send({ completed: true });
    expect(response.statusCode).toBe(200);
    expect(response.body.completed).toMatchInlineSnapshot(`true`);
  });

  it("DELETE /todos/:id - deletes a todo", async () => {
    const response = await request(app).delete(`/todos/${createdTodoId}`);
    expect(response.statusCode).toBe(204);
  });

  it("DELETE /todos/:id - todo not found", async () => {
    const response = await request(app).delete("/todos/123");
    expect(response.statusCode).toBe(400);
  });
});
