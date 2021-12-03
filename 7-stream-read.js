/*
! There are 4 types of streams 
* 1)Readable
* 2)Writable
* 3)Duplex - read + write
* 4)Transform - like duplex but data can be changed while processing
*/

const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve(__dirname, 'test-file.txt'), (err, data) => {
// 	if (err) {
// 		throw new Error(err);
// 	}
// 	console.log(data);
// });

//! Read with streams and
const stream = fs.createReadStream(path.resolve(__dirname, 'test-file.txt'));

//* by default chunk === 64kb
stream.on('data', (chunk) => {
	console.log(chunk);
});

stream.on('end', () => {
	console.log('Finish reading file');
});
stream.on('open', () => {
	console.log('Start reading file');
});
