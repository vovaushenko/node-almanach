import { body, query } from 'express-validator';

class TodoValidator {
	validateNewTodo() {
		return [
			body('id')
				.optional()
				.isUUID()
				.withMessage('Id should be in UUIDV4 format'),
			body('title').notEmpty().withMessage('Todo missing title'),
			body('completed')
				.optional()
				.isBoolean()
				.withMessage('Completed value should be boolean')
				.isIn([0, false])
				.withMessage('The value should be false or 0'),
		];
	}

	validateTodoQuery() {
		return [
			query('limit')
				.notEmpty()
				.withMessage('The query should contain limit')
				.isInt({ min: 1, max: 10 })
				.withMessage('Value should be in range 1-10'),
			query('offset')
				.notEmpty()
				.optional()
				.isNumeric()
				.withMessage('The offset should be a number'),
		];
	}
}

export default new TodoValidator();
