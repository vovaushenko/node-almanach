const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
chai.use(chaiAsPromised);
chai.use(sinonChai);

var mongoose = require('mongoose');
var users = require('./users');
var Users = require('./models/user');

var sandbox = sinon.createSandbox();

const { expect } = chai;

describe('users', () => {
	let findStub;
	let deleteStub;
	let sampleArgs;
	let sampleUser;

	/**
	 *@BEFORE each test we create sandbox
	 */
	beforeEach(() => {
		sampleUser = {
			id: 123,
			name: 'foo',
			email: 'foo@bar.com',
		};
		findStub = sandbox.stub(mongoose.Model, 'findById').resolves(sampleUser);
		deleteStub = sandbox
			.stub(mongoose.Model, 'remove')
			.resolves('fake_remove_result');
	});
	/**
	 *@AFTER each test we cleanup sandbox
	 */
	afterEach(() => {
		sandbox.restore();
	});

	/**
	 *@GET user by id tests
	 */
	context('get', () => {
		it('should throw an error if id is not specified', (done) => {
			users.get(null, (err, _res) => {
				expect(err).to.exist;
				expect(err.message).to.equal('Invalid user id');

				done();
			});
		});

		it('should call findUserById with an id and return result', (done) => {
			sandbox.restore();
			let stub = sandbox
				.stub(mongoose.Model, 'findById')
				.yields(null, { name: 'foo' });

			users.get(123, (err, res) => {
				expect(err).to.not.exist;
				expect(stub).to.have.been.calledOnce;
				expect(stub).to.have.been.calledWith(123);
				expect(res).to.be.a('object');
				expect(res).to.have.property('name').to.equal('foo');

				done();
			});
		});

		it('should catch errors if they exist', () => {
			sandbox.restore();
			let stub = sandbox
				.stub(mongoose.Model, 'findById')
				.yields(new Error('fake error'));

			users.get(123, (err, res) => {
				expect(res).to.not.exist;
				``;
				expect(err).to.exist;
				expect(err).to.be.instanceOf(Error);
				expect(err).to.have.property('message').to.equal('fake error');
			});
		});
	});

	/**
	 *@DELETE user by id tests
	 */

	context('delete user', () => {
		it('should check for error using return', () => {
			return users
				.delete()
				.then((res) => {
					throw new Error('unexpected success, will not reach this block');
				})
				.catch((err) => {
					expect(err).to.be.instanceOf(Error);
					expect(err).to.have.property('message').to.equal('Invalid id');
				});
		});

		it('should check for error using eventually', () => {
			return expect(users.delete()).to.eventually.be.rejectedWith('Invalid id');
		});

		it('should call User.remove', async () => {
			let result = await users.delete(123);

			expect(deleteStub).to.have.been.calledWith({ _id: 123 });
			expect(result).to.equal('fake_remove_result');
		});
	});
});
