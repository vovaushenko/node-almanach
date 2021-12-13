import { body } from 'express-validator';

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
}

export default new TodoValidator();
