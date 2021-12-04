const Application = require('./framework/application');
const userRouter = require('./src/user-router');
const jsonParser = require('./framework/middleware/parse-json');
const logger = require('./framework/middleware/logger');
const urlParser = require('./framework/middleware/url-parser');

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(jsonParser, logger, urlParser('http://localhost:5000/'));

app.addRouter(userRouter);

app.listen(PORT, () => console.dir(`Server started on port ${PORT}`));
