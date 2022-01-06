'use strict';

const fs = require('fs');

// If something will happen it the watched file -> we will get an event
fs.watch('text.txt', (event, file) => {
	console.dir({ event, file });
});

fs.readFile('text.txt', 'utf8', (err, data) => {
	if (err) throw err;
	const lines = data.split('\n');
	const bananas = lines.join('🍌');

	fs.writeFile('text.txt', bananas, (err) => {
		if (err) throw err;
	});
});
