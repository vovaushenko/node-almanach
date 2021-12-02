const path = require('path');

/**
 *@JOIN
 */
console.log(path.join('foo', 'bar', 'baz')); // foo/bar/baz
//* dirname => path to current dir
console.log(__dirname);
console.log(path.join(__dirname, 'foo', 'bar'));
//* go back in folders
console.log(path.join(__dirname, '..', '..', '..'));

/**
 *@RESOLVE
 adds absolute path __dirname__
 */
console.log('------- RESOLVE --------');
console.log(path.resolve('foo', 'bar', 'baz')); // foo/bar/baz
/**
 *@PARSE PATH
 */
console.log('------- PATH --------');
const fullpath = path.resolve(__dirname, 'x', 'y', 'z.txt');
console.log('Parsing', path.parse(fullpath));

console.log('PATH SEPARATOR', path.sep);
console.log('CHECK FOR ABSOLUTE PATH', path.isAbsolute('/foo/bar'));
console.log('FILE NAME', path.basename(fullpath));
console.log('EXT NAME', path.extname(fullpath));

/**
 * ===============
 *@URL PARSING
 */

const siteURL = 'http://localhost:8080/users?id=5123';

const url = new URL(siteURL);
console.log(url);
/*

 href: 'http://localhost:8080/users?id=5123',
  origin: 'http://localhost:8080',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:8080',
  hostname: 'localhost',
  port: '8080',
  pathname: '/users',
  search: '?id=5123',
  searchParams: URLSearchParams { 'id' => '5123' },
*/
