const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
//! Ready made promises
/*

const fsPromise = require('fs/promise');
fsPromise.mkdir('/').then().catch();
fsPromise.readFile('/').then().catch();
fsPromise.writeFile('/').then().catch();
fsPromise.appendFile('/').then().catch();
fsPromise.rm('/').then().catch();
fsPromise.rmdir('/').then().catch();

*/
// =================================================================
//* Promisification of WRITE AND APPEND
// =================================================================
const writeFileAsync = async (path, data) => {
	return new Promise((resolve, reject) =>
		fs.writeFile(path, data, (err) => {
			if (err) {
				reject(err);
			}
			resolve(`File has been created at ${path}`);
		})
	);
};
const appendFileAsync = async (path, appendedData) => {
	return new Promise((resolve, reject) =>
		fs.appendFile(path, appendedData, (err) => {
			if (err) {
				return reject(err);
			}
			resolve(`File has been updated at ${path}`);
		})
	);
};

const handleError = (err) => console.log(err);

writeFileAsync(path.resolve(__dirname, 'foobar.txt'), 'NEW VARIANT')
	.then(() => appendFileAsync('foobar.txt', '\n' + `UDPATE - 1`))
	.then(() => appendFileAsync('foobar.txt', '\n' + `UDPATE - 2`))
	.then(() => appendFileAsync('foobar.txt', '\n' + `UDPATE - 3`))
	.catch((err) => handleError(err));
// =================================================================

// =================================================================
//* Promisification of READ FILE
// =================================================================
const readFileAsync = async (path) => {
	return new Promise((resolve, reject) =>
		fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
			if (err) {
				return reject(err);
			}
			resolve(data);
		})
	);
};

// IF we remove encoding, we will ge BUFFER
writeFileAsync(path.resolve(__dirname, 'test.txt'), 'NEW VARIANT')
	.then(() =>
		appendFileAsync(path.resolve(__dirname, 'test.txt'), '\n' + `UDPATE - 1`)
	)
	.then(() =>
		appendFileAsync(path.resolve(__dirname, 'test.txt'), '\n' + `UDPATE - 2`)
	)
	.then(() =>
		appendFileAsync(path.resolve(__dirname, 'test.txt'), '\n' + `UDPATE - 3`)
	)
	.then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
	.then((data) => console.log(data))
	.catch((err) => handleError(err));

// =================================================================
//* Promisification of READ FILE
// =================================================================

const removeFileAsync = async (path) => {
	return new Promise((resolve, reject) =>
		fs.rm(path, (err) => {
			if (err) {
				return reject(err);
			}
			resolve('File has been deleted');
		})
	);
};

removeFileAsync(path.resolve(__dirname, 'test.txt')).then((msg) =>
	console.log(msg)
);

//! TASK
// 1) Through env var => we get string
// 2) Write this file in a file
// 3) Read this file, and count the number of words
// 4) Write this count in a new file count.txt, and then remove the first file

console.log(process.env.SECRET_STRING);
const getWordCount = (str) => str.split(' ').length;

writeFileAsync(
	path.resolve(__dirname, 'secret-string.txt'),
	process.env.SECRET_STRING
)
	.then(() => readFileAsync(path.resolve(__dirname, 'secret-string.txt')))
	.then((str) =>
		writeFileAsync(
			path.resolve(__dirname, 'count.txt'),
			String(getWordCount(str))
		)
	)
	.then(() => removeFileAsync(path.resolve(__dirname, 'secret-string.txt')));
