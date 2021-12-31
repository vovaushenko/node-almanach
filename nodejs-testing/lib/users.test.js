const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
chai.use(chaiAsPromised);
chai.use(sinonChai);

var mongoose = require('mongoose');

var users = rewire('./users');
var User = require('./models/user');
var mailer = require('./mailer');

var sandbox = sinon.createSandbox();

const { expect } = chai;

describe('users', () => {
	let findStub;
	let deleteStub;
	let sampleArgs;
	let sampleUser;
	let mailerStub;

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
		mailerStub = sandbox
			.stub(mailer, 'sendWelcomeEmail')
			.resolves('fake_email');
	});
	/**
	 *@AFTER each test we cleanup sandbox
	 */
	afterEach(() => {
		sandbox.restore();
		// reset rewire changes
		users = rewire('./users');
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
				.then((_res) => {
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

	/**
	 *@CREATE user tests
	 */
	context('create', () => {
		let FakeUserClass, saveStub, result;

		beforeEach(async () => {
			saveStub = sandbox.stub().resolves(sampleUser);
			FakeUserClass = sandbox.stub().returns({ save: saveStub });

			users.__set__('User', FakeUserClass);
			result = await users.create(sampleUser);
		});

		it('should reject invalid arguments', async () => {
			await expect(users.create()).to.eventually.be.rejectedWith(
				'Invalid arguments'
			);
			await expect(users.create({ name: 'foo' })).to.eventually.be.rejectedWith(
				'Invalid arguments'
			);
			await expect(
				users.create({ email: 'foo@bar.com' })
			).to.eventually.be.rejectedWith('Invalid arguments');
		});

		it('should call user with new', () => {
			expect(FakeUserClass).to.have.been.calledWithNew;
			expect(FakeUserClass).to.have.been.calledWith(sampleUser);
		});

		it('should save the user', () => {
			expect(saveStub).to.have.been.called;
		});
		it('should call mailer iwth email and name', () => {
			expect(mailerStub).to.have.been.calledWith(
				sampleUser.email,
				sampleUser.name
			);
		});

		it('should reject errors', async () => {
			saveStub.rejects(new Error('fake err'));

			await expect(users.create(sampleUser)).to.eventually.be.rejectedWith(
				'fake err'
			);
		});
	});
});
