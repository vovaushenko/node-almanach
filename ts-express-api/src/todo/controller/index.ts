import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TodoIntance } from '../model';

class TodoController {
	async getAllTodos(req: Request, res: Response) {
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

	async getTodoById(req: Request, res: Response) {
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

	async createTodo(req: Request, res: Response) {
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

	async updateTodoStatus(req: Request, res: Response) {
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

	async updateTodoTitle(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { title } = req.body;
			const foundRecord = await TodoIntance.findOne({ where: { id } });
			if (!foundRecord) {
				return res.status(404).json({ msg: `Todo with ${id} not found` });
			}

			const updatedRecord = await foundRecord.update({
				title,
			});

			return res
				.status(201)
				.json({ msg: 'successfully updated', updatedRecord });
		} catch (error) {
			return res
				.status(500)
				.json({
					err: 'failed to update',
					route: '/todos/:id/title',
					method: 'put',
				});
		}
	}

	async deleteTodo(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const foundRecord = await TodoIntance.findOne({ where: { id } });
			if (!foundRecord) {
				return res.status(404).json({ msg: `Todo with ${id} not found` });
			}

			const updatedRecord = await foundRecord.destroy();

			return res.status(201).json({ msg: 'successfully deleted' });
		} catch (error) {
			return res.status(500).json({
				err: 'failed to update',
				route: '/todos/:id',
				method: 'delete',
			});
		}
	}
}

export default new TodoController();
