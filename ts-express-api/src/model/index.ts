import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface TodoAttributes {
	id: string;
	title: string;
	completed: boolean;
}

class TodoIntance extends Model<TodoAttributes> {}

TodoIntance.init(
	{
		id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
		title: { type: DataTypes.STRING, allowNull: false },
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		sequelize: db,
		tableName: 'todos',
	}
);
