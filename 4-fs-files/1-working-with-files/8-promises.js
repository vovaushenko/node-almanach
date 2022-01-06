'use strict';

const fs = require('fs');

const main = async () => {
	const stream = fs.createReadStream('./text.txt', 'utf8');
	let count = 0;
	for await (const chunk of stream) {
		console.log({ count, chunk });
		count++;
	}

	const data = await fs.promises.readFile('./text.txt', 'utf8');
	console.log(data);
};

main().catch(console.error);
