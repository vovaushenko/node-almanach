'use strict';

const http = require('http');

const url = 'http://jsonplaceholder.typicode.com/todos/1';

http.get(url, (res) => {
	console.log({ reqHeader: res.req._header });
	console.dir({ resHeaders: res.headers });
	if (res.statusCode !== 200) {
		const { statusCode, statusMessage } = res;
		console.log(`Status Code: ${statusCode} ${statusMessage}`);
		return;
	}
	res.setEncoding('utf8');
	const buffer = [];
	res.on('data', (chunk) => {
		buffer.push(chunk);
	});
	res.on('end', () => {
		console.log({ buffer: buffer.join('') });
	});
});
