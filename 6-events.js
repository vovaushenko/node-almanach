const EventEmitter = require('events');
const dotenv = require('dotenv');
dotenv.config();

const emitter = new EventEmitter();

const cb = (data, second, third) => {
	console.log(`You've sent the message ${data}`);
	if (second) console.log(`Second arg : ${second}`);
	if (third) console.log(`third arg : ${second}`);
};

emitter.on('message', cb);

const MESSAGE = process.env.IMPORTANT_MESSAGE || '';

if (MESSAGE) {
	emitter.emit('message', MESSAGE, 'foo', 'bar');
} else {
	emitter.emit('message', 'There was no message');
}

emitter.emit('message');

emitter.once('message');

// emitter.removeAllListeners();
emitter.removeListener('message', cb);
