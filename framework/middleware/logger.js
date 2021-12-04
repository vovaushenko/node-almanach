module.exports = (req, res) => {
	const timestamp = new Date(Date.now()).toISOString();
	console.log(`${timestamp}: Method ${req.method} accessing ${req.url}`);
};
