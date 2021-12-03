const fs = require('fs');
const path = require('path');

/**
 *@CREATE FOLDER - mkdir 
 1st arg is the path to dir where folder will be created
 */

// fs.mkdirSync(path.resolve(__dirname, 'dir'));
// fs.mkdirSync(path.resolve(__dirname, 'dir1', 'dir2', 'dir3'), {
// 	recursive: true,
// });   => creates dir1/dir2/dir3

// //* async variant of fs.mkdir
// console.log('start');
// fs.mkdir(path.resolve(__dirname, 'dir4'), (err, result) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log('Folder has been created');
// });
// console.log('end');

/**
 *@DELETE FOLDER - rmdir 
 1st arg is the path 
 */
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
// 	if (err) {
// 		throw err;
// 	}
// });

/**
 *@CREATE FILE - writeFile
 */

// write file will re-write file if it has some content
fs.writeFile(
	path.resolve(__dirname, 'test1.tsx'),
	'<h1>FOO BAR</h1>',
	(err) => {
		if (err) {
			throw err;
		}
		console.log('File has been created');
	}
);
//! in order to add data to already existing file
fs.appendFile(
	path.resolve(__dirname, 'test1.tsx'),
	'<p>Hello World</p>',
	(err) => {
		if (err) {
			throw err;
		}
		console.log('File has been created');
	}
);
