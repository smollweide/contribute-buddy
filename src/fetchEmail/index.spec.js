const resolve = require('../resolve');
const { fetchEmail } = require('./index');

describe('fetchEmail', () => {
	it('fetch', (done) => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ email: 'user-entered@mail.com' });
			},
		};
		const _fetchEmail = resolve(fetchEmail, {
			getUserStorage: () => ({}),
			setUserStorage() {},
			console: { log() {} },
			inquirer,
		});
		_fetchEmail({}).then((results) => {
			expect(results).toEqual({ email: 'user-entered@mail.com' });
			done();
		});
	});
	it('store result in user storage', (done) => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ email: 'user-entered@mail.com' });
			},
		};
		const _fetchEmail = resolve(fetchEmail, {
			getUserStorage: () => ({}),
			setUserStorage: () => {
				done();
			},
			console: { log() {} },
			inquirer,
		});
		_fetchEmail({});
	});
	it('log', (done) => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ email: 'user-entered@mail.com' });
			},
		};
		const _fetchEmail = resolve(fetchEmail, {
			getUserStorage: () => ({}),
			setUserStorage: () => {},
			console: {
				log(text) {
					expect(text).toBe('Stored email address "user-entered@mail.com"!');
					done();
				},
			},
			inquirer,
		});
		_fetchEmail({});
	});
	it('email already set', (done) => {
		const _fetchEmail = resolve(fetchEmail, {
			getUserStorage: () => ({
				email: 'example@mail.com',
			}),
			setUserStorage() {},
			console: { log() {} },
		});
		_fetchEmail({}).then((results) => {
			expect(results).toEqual({});
			done();
		});
	});
});
