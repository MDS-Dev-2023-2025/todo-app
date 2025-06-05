import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';

const router = Router();
const todoController = new TodoController();

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router; 