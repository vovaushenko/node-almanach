'use strict';

const fs = require('fs');

const data = fs.readFileSync('text.txt', 'utf8');
const lines = data.split('\n').filter((line) => !!line);
fs.writeFileSync('1-readFileSync.txt', lines.join(' 🍌 '));
