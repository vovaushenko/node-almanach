const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

var crypto = require('crypto');
var config = require('./config');
var utils = require('./utils');

var sandbox = sinon.createSandbox();

describe('utils', () => {
	let secretStub, digestStub, updateStub, createHashStub, hash;

	beforeEach(() => {
		secretStub = sandbox.stub(config, 'secret').returns('super_fake_secret');
		digestStub = sandbox.stub().returns('FOO123');
		updateStub = sandbox.stub().returns({
			digest: digestStub,
		});

		createHashStub = sandbox.stub(crypto, 'createHash').returns({
			update: updateStub,
		});

		hash = utils.getHash('foo');
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should return null if invalid string is passed', () => {
		sandbox.reset();

		let hash1 = utils.getHash(null);
		let hash2 = utils.getHash(123);
		let hash3 = utils.getHash({});
		let hash4 = utils.getHash([]);

		expect(hash1).to.be.null;
		expect(hash2).to.be.null;
		expect(hash3).to.be.null;
		expect(hash4).to.be.null;
	});

	it('should get secret from config', () => {
		expect(secretStub).to.have.been.calledOnce;
	});
	it('should call crypto with correct settings and return hash', () => {
		expect(createHashStub).to.have.been.calledWith('md5');
		expect(updateStub).to.have.been.calledWith('foo_super_fake_secret');
		expect(digestStub).to.have.been.calledWith('hex');

		expect(hash).to.equal('FOO123');
	});
});
