const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
var demo = rewire('./demo.js');

const { add, addCallback, addPromise, foo } = demo;

const { expect } = chai;
/**
 *@PLUGINS
 */
chai.use(chaiAsPromised);
chai.use(sinonChai);
describe('demo', () => {
	context('pure function', () => {
		it('should add two numbers', () => {
			expect(add(1, 2)).to.equal(3);
		});
	});

	context('callback function', () => {
		it('should test callback', (done) => {
			addCallback(1, 2, (err, result) => {
				expect(result).to.equal(3);
				expect(err).to.be.null;
				done();
			});
		});
	});

	context('test promise', () => {
		it('should add in promise', (done) => {
			addPromise(1, 2)
				.then((res) => {
					expect(res).to.equal(3);
					done();
				})
				.catch((err) => {
					done(err);
				});
		});

		it('should test a promise with return', () => {
			return addPromise(2, 3).then((res) => {
				expect(res).to.equal(5);
			});
		});

		it('should test async/await promise', async () => {
			const res = await addPromise(5, 2);
			expect(res).to.equal(7);
		});

		it('should test promise with chai-as-promised', async () => {
			await expect(addPromise(2, 3)).to.eventually.equal(5);
		});
	});

	context('test doubles', () => {
		it('should spy on console.log', () => {
			const spy = sinon.spy(console, 'log');
			foo();

			expect(spy.calledOnce).to.be.true;

			expect(spy).to.have.been.calledOnce;

			// reset spy
			spy.restore();
		});
	});

	context('should stub console.warn', () => {
		const stub = sinon.stub(console, 'warn').callsFake(() => {
			console.log('🍌🍌🍌🍌🍌bananas are nutritious🍌🍌🍌🍌🍌');
		});
		foo();
		expect(stub).to.have.been.calledOnce;
		expect(stub).to.have.been.calledWith('console.warn was called');
		stub.restore();
	});

	context('stub private functions', () => {
		it('should stub create file function', async () => {
			let createStub = sinon.stub(demo, 'createFile').resolves('create_stub');
			let callDbStub = sinon.stub().resolves('calldb_stub');

			// change original callDb with calldb_stub
			demo.__set__('callDb', callDbStub);

			let result = await demo.bar('test.txt');

			expect(result).to.equal('calldb_stub');

			expect(createStub).to.have.been.calledOnce;
			expect(createStub).to.have.been.calledWith('test.txt');

			expect(callDbStub).to.have.been.calledOnce;
		});
	});
});
