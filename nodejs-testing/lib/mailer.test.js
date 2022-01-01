const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var sandbox = sinon.createSandbox();
var mailer = rewire('./mailer');

describe('mailer', () => {
	let emailStub;

	beforeEach(() => {
		emailStub = sandbox.stub().resolves('done');
		mailer.__set__('sendEmail', emailStub);
	});

	afterEach(() => {
		sandbox.reset();
		mailer = rewire('./mailer');
	});

	context('sendWelcomeEmail', () => {
		it('should throw an error if name or email are not specified', async () => {
			await expect(mailer.sendWelcomeEmail()).to.eventually.be.rejectedWith(
				'Invalid input'
			);
			await expect(
				mailer.sendWelcomeEmail('foo@bar.com')
			).to.eventually.be.rejectedWith('Invalid input');
		});

		it('should call sendEmail with specified email and message', async () => {
			await mailer.sendWelcomeEmail('bar@foo.com', 'foo');
			expect(emailStub).to.have.been.calledWith(
				'bar@foo.com',
				'Dear foo, welcome to our family!'
			);
		});
	});

	context('sendPasswordResetEmail', () => {
		it('should throw an error ifemail is not specified', async () => {
			await expect(
				mailer.sendPasswordResetEmail()
			).to.eventually.be.rejectedWith('Invalid input');
		});

		it('should call sendEmail with specified email and message', async () => {
			await mailer.sendPasswordResetEmail('bar@foo.com');
			expect(emailStub).to.have.been.calledWith(
				'bar@foo.com',
				'Please click http://some_link to reset your password.'
			);
		});
	});

	context('sendEmail', () => {
		let sendEmail;

		beforeEach(() => {
			mailer = rewire('./mailer');
			sendEmail = mailer.__get__('sendEmail');
		});

		it('should throw an error if name or email are not specified', async () => {
			await expect(sendEmail()).to.eventually.be.rejectedWith();
			await expect(sendEmail('foo@bar.com')).to.eventually.be.rejectedWith();
		});

		it('should call sendEmail with email and message', async () => {
			// stub actual library
			let result = await sendEmail('foo@bar.com', 'foo');

			expect(result).to.equal('Email sent');
		});
	});
});
