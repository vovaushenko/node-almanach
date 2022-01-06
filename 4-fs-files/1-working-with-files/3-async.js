'use strict';

const fs = require('fs');

fs.readFile('text.txt', 'utf8', (err, data) => {
	if (err) throw err;
	console.log(`File size: ${data.length}`);
	const lines = data.split('\n').filter((line) => !!line);

	const now = new Date(Date.now());

	lines.push(`Authored by Vova. (c):${now.toISOString()}`);

	const content = lines.join('\n');
	fs.writeFile('3-async.txt', content, (err) => {
		if (err) throw err;
		console.log(`New file size: ${content.length}`);
	});
});

console.log('Read file async example');
