import request from "supertest";
import express from "express";
import todoRoutes from "../../src/routes/todo.routes";

const app = express();
app.use(express.json());
app.use("/todos", todoRoutes);

describe("Todo Routes", () => {
  let createdId: string;

  it("POST /todos - should create a todo", async () => {
    const res = await request(app).post("/todos").send({ title: "New Task" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: "New Task", completed: false });
    createdId = res.body.id;
  });

  it("GET /todos - should get all todos", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /todos/:id - should update a todo", async () => {
    const res = await request(app)
      .put(`/todos/${createdId}`)
      .send({ title: "Updated", completed: true });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated");
    expect(res.body.completed).toBe(true);
  });

  it("PUT /todos/:id - should fail on invalid id", async () => {
    const res = await request(app).put("/todos/invalid").send({ title: "Fail" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/error/i);
  });

  it("DELETE /todos/:id - should delete a todo", async () => {
    const res = await request(app).delete(`/todos/${createdId}`);
    expect(res.status).toBe(204);
  });

  it("DELETE /todos/:id - should fail on invalid id", async () => {
    const res = await request(app).delete("/todos/nonexistent");
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/error/i);
  });
});
