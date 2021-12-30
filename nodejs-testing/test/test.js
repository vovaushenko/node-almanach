const assert = require('assert');

describe('file to be tested', () => {
	context('function to be tested', () => {
		it('shoud do something', () => {
			assert.equal(1, 1);
		});

		it('shoud do something else', () => {
			assert.deepEqual({ foo: 'bar' }, { foo: 'bar' });
		});
		//*pending test
		it('this is a penging test');
	});
});
