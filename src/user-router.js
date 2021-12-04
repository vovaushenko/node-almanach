const Router = require('../framework/router');

const router = new Router();

const users = [
	{ id: 1, username: 'John Doe' },
	{ id: 2, username: 'Joe Smith' },
	{ id: 2, username: 'Sam Harris' },
];

router.get('/users', (req, res) => {
	if (req.params.id) {
		return res.send(users.find((usr) => usr.id === Number(req.params.id)));
	}

	res.send(users);
});
router.post('/users', (req, res) => {
	const user = req.body;
	users.push(user);
	res.send(user);
});

module.exports = router;
