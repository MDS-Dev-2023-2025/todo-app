"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const router = (0, express_1.Router)();
const todoController = new todo_controller_1.TodoController();
/**
 * @openapi
 * /todos:
 *   get:
 *     summary: Récupère toutes les tâches
 *     responses:
 *       200:
 *         description: Liste des todos
 */
router.get("/", todoController.getAllTodos);
/**
 * @openapi
 * /todos:
 *   post:
 *     summary: Crée une nouvelle tâche
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 */
router.post("/", todoController.createTodo);
/**
 * @openapi
 * /todos/{id}:
 *   put:
 *     summary: Met à jour une tâche existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tâche mise à jour avec succès
 */
router.put("/:id", todoController.updateTodo);
/**
 * @openapi
 * /todos/{id}:
 *   delete:
 *     summary: Supprime une tâche existante
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tâche supprimée avec succès
 */
router.delete("/:id", todoController.deleteTodo);
exports.default = router;
