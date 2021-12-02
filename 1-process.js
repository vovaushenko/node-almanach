const dotenv = require('dotenv');
dotenv.config();

/**
 *@PROCESS ENV pID
 */
// Get unique id of current process, each time will be unique
console.log(process.pid);
// ps -aux

//  kill process.id => kill process

/**
 *@PROCESS ENV VARS
 */
console.log('-------env variables-------');
//list of all
// console.dir(process.env);
//ourt vars
//! in package.json => "start": "PORT=5000 NODE_ENV=development nodemon 1-process.js"

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
console.log(process.env.API_KEY);
console.log('----------------------------');

/**
 *@PROCESS ARGUMENTS
 */

console.log('-------env args-------');
console.log(process.argv);
// will catch commands or configuration after node command
// eg node 1-process.js asdsa ssa saas saaa => random jibrish will be caught

//! kill process depending on some requirement

if (Math.random() > 0.5) {
	let counter = 0;
	while (true) {
		console.log(`tick ${counter}`);
		counter++;
		if (counter > 50) {
			process.exit();
		}
	}
} else {
	console.log('Process has been closed');
	process.exit();
}
