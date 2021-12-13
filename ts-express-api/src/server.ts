import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import db from './config/database.config';
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
	(req: Request, res: Response, next: NextFunction) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.json(error);
		}
		next();
	},
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

app.listen(PORT, () => {
	console.log(`💻 Server is running on port ${PORT} 💻`);
});
