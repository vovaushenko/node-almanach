'use strict';

const events = require('events');

const emitter = () => {
	const ee = new events.EventEmitter();

	const { emit } = ee;

	ee.emit = (...args) => {
		if (args[0] !== '*') emit.apply(ee, args);
		args.unshift('*');
		emit.apply(ee, args);
	};
	return ee;
};

module.exports = emitter;
