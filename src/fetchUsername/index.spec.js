const resolve = require('../resolve');
const { fetchUsername } = require('./index');

const inquirer = {
	prompt() {
		return inquirer;
	},
	then(cb) {
		cb({ username: 'test username' });
	},
};
const getUserStorage = () => ({
	username: 'username',
});
const setUserStorage = () => {};
const _console = { log() {} };
const props = {};

describe('fetchUsername', () => {
	it('username already defined', done => {
		const _fetchUsername = resolve(fetchUsername, {
			inquirer,
			console: _console,
			getUserStorage,
			setUserStorage,
		});
		_fetchUsername(props).then(results => {
			expect(results).toEqual({});
			done();
		});
	});
	it('username not defined yet', done => {
		const _fetchUsername = resolve(fetchUsername, {
			inquirer,
			console: _console,
			getUserStorage: () => ({}),
			setUserStorage,
		});
		_fetchUsername(props).then(results => {
			expect(results).toEqual({ username: 'test username' });
			done();
		});
	});
});
