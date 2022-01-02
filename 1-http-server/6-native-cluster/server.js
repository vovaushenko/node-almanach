// Run server in a multiple processes
'use strict';

const http = require('http');
const cluster = require('cluster');
const os = require('os');

const PORT = 2000;

const user = { name: 'jura', age: 22 };
const pid = process.pid;

const routing = {
	'/': 'welcome to homepage',
	'/user': user,
	'/user/name': () => user.name,
	'/user/age': () => user.age,
};

const types = {
	object: JSON.stringify,
	string: (s) => s,
	number: (n) => n.toString(),
	undefined: () => 'not found',
	function: (fn, par, client) => JSON.stringify(fn(client, par)),
};

/**
 *@CLUSTER is for forking | copying processes
 *@FIRST process will be a master process, other will be workers
 *@Server's socket will be open on master process, then workers will connect with master,
 *and then when requests are received on Master, it will use Round-Robin algorithm it will concurrently
 *give tasks to workers
 */
if (cluster.isMaster) {
	const count = os.cpus().length;
	console.log(`Master pid: ${pid}`);
	console.log(`Starting ${count} forks`);
	for (let i = 0; i < count; i++) cluster.fork();
} else {
	const id = cluster.worker.id;
	console.log(`Worker: ${id}, pid: ${pid}, port: ${PORT}`);
	http
		.createServer((req, res) => {
			const data = routing[req.url];
			const type = typeof data;
			const serializer = types[type];
			res.setHeader('Process-Id', pid);
			res.end(serializer(data, req, res));
		})
		.listen(PORT);
}
