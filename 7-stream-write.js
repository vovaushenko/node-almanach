const fs = require('fs');
const path = require('path');

const writableStream = fs.createWriteStream(
	path.resolve(__dirname, 'test2.txt')
);

for (let i = 0; i < 100; i++) {
	writableStream.write('🍊'.repeat(i) + '\n');
}

// writableStream.end();
// writableStream.close();
// writableStream.destroy();
// writableStream.on('close');
// writableStream.on('error');
