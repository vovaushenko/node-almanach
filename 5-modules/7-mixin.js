'use strict';

const fs = require('fs');
const { readFile } = fs;

fs.readFile = (...args) => {
	const path = args.shift();
	const callback = args.pop();
	const options = args.pop() || {};
	console.log(`Intercepted call: fs.readFile('${path}')`);
	return readFile(path, options, (err, data) => {
		if (err) console.error(err);
		else console.log(`Data received: ${data.length}`);
		callback(err, data);
	});
};
// ** WE've been able to "patch" readFile
// ** and it will be patched not only in this file, but everywhere
fs.readFile('./7-mixin.js', (err, data) => {
	console.log({ err, data });
});
