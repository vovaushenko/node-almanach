import cors from 'cors';
import express from 'express';
import db from './config/database.config';
import router from './todo/router';

db.sync().then(() => {
	console.log('🐬 Connected with DB 🐬');
});

const app = express();
app.use(cors());
const PORT = 5000;

app.use(express.json());
app.use('/api/v1', router);

app.listen(PORT, () => {
	console.log(`💻 Server is running on port ${PORT} 💻`);
});
