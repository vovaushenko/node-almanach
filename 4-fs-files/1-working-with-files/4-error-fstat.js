'use strict';

const fs = require('fs');

const files = ['1-readFileSync.txt', 'n-untitled.js', '3-async.txt'];

const stats = new Array(files.length);

let rest = files.length;

const printResult = () => {
	console.dir({ stats });
	fs.writeFile(
		'4-fstat.txt',
		stats.map((i) => JSON.stringify(i)).join('\n'),
		(err) => {
			if (err) throw err;
		}
	);
};

files.forEach((file, i) => {
	console.dir({ file, i });
	fs.lstat(file, (err, stat) => {
		if (err) {
			console.log(`File ${file} not found`);
		} else {
			stats[i] = stat;
		}
		if (--rest) return;
		printResult();
	});
});
