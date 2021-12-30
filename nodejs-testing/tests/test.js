const assert = require('assert');

describe('file to be tested', () => {
	context('function to be tested', () => {
		before(() => {
			console.log('====== before ======');
		});

		after(() => {
			console.log('====== after ======');
		});

		beforeEach(() => {
			console.log('🔥');
		});
		afterEach(() => {
			console.log('🍌');
		});

		it('shoud do something', () => {
			assert.equal(1, 1);
		});

		it('shoud do something else', () => {
			assert.deepEqual({ foo: 'bar' }, { foo: 'bar' });
		});
		//*pending test
		it('this is a penging test');
	});

	context('another function', () => {
		before(() => {
			console.log('\n' + '====== Context # 2 ======');
		});
		it('should be pending');
	});
});
