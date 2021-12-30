import express from 'express';
import Middleware from '../../middleware';
import TodoController from '../controller';
import TodoValidator from '../validator';

const router = express.Router();

router.post(
	'/todos',
	TodoValidator.validateNewTodo(),
	Middleware.handleValidationError,
	TodoController.createTodo
);

router.get(
	'/todos/:id',
	TodoValidator.validateIdParam(),
	Middleware.handleValidationError,
	TodoController.getTodoById
);
router.get(
	'/todos',
	TodoValidator.validateTodoQuery(),
	Middleware.handleValidationError,
	TodoController.getAllTodos
);

router.put(
	'/todos/:id/status',
	TodoValidator.validateIdParam(),
	Middleware.handleValidationError,
	TodoController.updateTodoStatus
);

router.put(
	'/todos/:id/title',
	TodoValidator.validateUpdateTodoTitle(),
	Middleware.handleValidationError,
	TodoController.updateTodoTitle
);

router.delete(
	'/todos/:id',
	TodoValidator.validateIdParam(),
	Middleware.handleValidationError,
	TodoController.deleteTodo
);

export default router;
