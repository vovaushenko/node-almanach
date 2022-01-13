'use strict';
/**
 *@NOTE prefix node:
 *can specify that this is a core node lib
 ** this protects aganst the situation when someone will put 'events' in node_modules and we could use a changed lib
 */
const fs = require('fs');
const events = require('node:events'); // > 16
const timers1 = require('timers/promises');
//* we can get submodules!
const timers2 = require('node:timers/promises');
// const ws = require('ws');
const exp = require('./1-export.js');

console.log(Object.keys(fs));
console.log(Object.keys(events));
console.log(Object.keys(timers1));
console.log(Object.keys(timers2));
// console.log(Object.keys(ws));
console.log(Object.keys(exp));
