const resolve = require('../resolve');
const { fetchWelcome } = require('./index');

const inquirer = {
	prompt() {
		return inquirer;
	},
	then(cb) {
		cb({ welcome: 'Continue' });
	},
};
const inquirerLeave = {
	prompt() {
		return inquirerLeave;
	},
	then(cb) {
		cb({ welcome: 'Leave' });
	},
};
const getUserStorage = () => ({
	welcome: true,
});
const getPackage = () => ({
	welcome: true,
});
const _process = () => ({
	exit() {},
});
const setUserStorage = () => {};
const renderClear = () => {};

describe('fetchWelcome', () => {
	it('welcome already defined', done => {
		const _fetchWelcome = resolve(fetchWelcome, {
			inquirer,
			process: _process,
			getUserStorage,
			setUserStorage,
			getPackage,
			renderClear,
		});
		_fetchWelcome({}).then(results => {
			expect(results).toEqual({});
			done();
		});
	});
	it('welcome not defined yet', done => {
		const _fetchWelcome = resolve(fetchWelcome, {
			inquirer,
			process: _process,
			getUserStorage: () => ({}),
			setUserStorage,
			getPackage,
			renderClear,
		});
		_fetchWelcome({}).then(results => {
			expect(results).toEqual({ welcome: true });
			done();
		});
	});
	it('select leave => process.exit', done => {
		const _fetchWelcome = resolve(fetchWelcome, {
			inquirer: inquirerLeave,
			process: {
				exit() {
					done();
				},
			},
			getUserStorage: () => ({}),
			setUserStorage,
			getPackage,
			renderClear,
		});
		_fetchWelcome({});
	});
});
