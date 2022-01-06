'use strict';

const fs = require('fs');

/**
 * @path {str} path to file to be loaded
 * */
const load = (path) => {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) throw err;
		console.log('\x1Bc'); // esc-sequence clear screen
		console.log(`Data length: ${data.length}`);
		console.log(data);
	});
};
/**
 * @path {str} path to file to be loaded
 * */
const watch = (path) => {
	fs.watch(path, () => {
		load(path);
	});
};

const path = './1-readFileSync.txt';
load(path);
watch(path);

// See: https://github.com/HowProgrammingWorks/FilesystemWatch
