import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from './config/database.config';
import Middleware from './middleware';
import { TodoIntance } from './model';
import TodoValidator from './validator';

db.sync().then(() => {
	console.log('🐬 Connected with DB 🐬');
});

const app = express();
const PORT = 5000;

app.use(express.json());

app.post(
	'/todos',
	TodoValidator.validateNewTodo(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		const id = uuidv4();
		const newTodo = { ...req.body, id };
		try {
			const record = await TodoIntance.create(newTodo);
			return res.status(200).json({ msg: 'successfully created', record });
		} catch (err) {
			return res
				.status(500)
				.json({ err: 'something went wrong', route: '/todos', method: 'post' });
		}
	}
);

app.get(
	'/todos/:id',
	TodoValidator.validateIdParam(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const record = await TodoIntance.findOne({ where: { id } });

			if (!record) {
				return res.status(404).json({ msg: `Todo with ${id} not found` });
			}

			return res.status(200).json(record);
		} catch (error) {
			return res
				.status(500)
				.json({ err: 'failed to read', route: '/todos/:id', method: 'get' });
		}
	}
);
app.get(
	'/todos',
	TodoValidator.validateTodoQuery(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		try {
			const limit = req.query?.limit as number | undefined;
			const offset = req.query?.offset as number | undefined;

			const records = await TodoIntance.findAll({ where: {}, limit, offset });
			res.status(200).json({ count: records.length, records });
		} catch (error) {
			return res
				.status(500)
				.json({ err: 'failed to read', route: '/todos', method: 'get' });
		}
	}
);

app.put(
	'/todos/:id',
	TodoValidator.validateIdParam(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const foundRecord = await TodoIntance.findOne({ where: { id } });
			if (!foundRecord) {
				return res.status(404).json({ msg: `Todo with ${id} not found` });
			}

			const updatedRecord = await foundRecord.update({
				completed: !foundRecord.getDataValue('completed'),
			});

			return res
				.status(201)
				.json({ msg: 'successfully updated', updatedRecord });
		} catch (error) {
			return res
				.status(500)
				.json({ err: 'failed to update', route: '/todos', method: 'put' });
		}
	}
);

app.delete(
	'/todos/:id',
	TodoValidator.validateIdParam(),
	Middleware.handleValidationError,
	async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const foundRecord = await TodoIntance.findOne({ where: { id } });
			if (!foundRecord) {
				return res.status(404).json({ msg: `Todo with ${id} not found` });
			}

			const updatedRecord = await foundRecord.destroy();

			return res.status(201).json({ msg: 'successfully deleted' });
		} catch (error) {
			return res
				.status(500)
				.json({
					err: 'failed to update',
					route: '/todos/:id',
					method: 'delete',
				});
		}
	}
);

app.listen(PORT, () => {
	console.log(`💻 Server is running on port ${PORT} 💻`);
});
