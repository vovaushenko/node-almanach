const dotenv = require('dotenv');
dotenv.config();

console.log(process.pid);
console.log(process.env.API_KEY);
