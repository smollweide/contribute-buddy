const resolve = require('../resolve');
const { fetchInitComplete } = require('./index');

const inquirer = {
	prompt() {
		return inquirer;
	},
	then(cb) {
		cb({});
	},
};
const renderClear = () => {};
const getConfigFilePath = () => '/.contributebuddy/config.json';
const props = {};
const open = () => {};

describe('fetchInitComplete', () => {
	it('fetch', done => {
		const _fetchInitComplete = resolve(fetchInitComplete, {
			inquirer,
			renderClear,
			getConfigFilePath,
			open,
		});
		_fetchInitComplete(props, undefined, undefined).then(() => {
			done();
		});
	});
	it('prompt', done => {
		const _inquirer = {
			prompt() {
				done();
				return _inquirer;
			},
			then(cb) {
				cb({});
			},
		};
		const _fetchInitComplete = resolve(fetchInitComplete, {
			inquirer: _inquirer,
			renderClear,
			getConfigFilePath,
			open,
		});
		_fetchInitComplete(props, undefined, undefined);
	});
	it('with originResolve', () => {
		const _fetchInitComplete = resolve(fetchInitComplete, {
			inquirer,
			renderClear,
			getConfigFilePath,
			open,
		});
		_fetchInitComplete(props, () => {}, undefined);
	});
	it('nothing completed', done => {
		const _fetchInitComplete = resolve(fetchInitComplete, {
			inquirer,
			renderClear,
			getConfigFilePath,
			open,
		});
		_fetchInitComplete({ readmes: {} }, undefined, undefined).then(() => {
			done();
		});
	});
	it('select link', done => {
		let counter = 0;
		const _inquirer = {
			prompt() {
				return _inquirer;
			},
			then(cb) {
				counter += 1;
				if (counter === 1) {
					cb({ completed: 'Open contribute-buddy on github' });
				} else {
					cb({ completed: 'Continue' });
				}
			},
		};
		const _fetchInitComplete = resolve(fetchInitComplete, {
			inquirer: _inquirer,
			renderClear,
			getConfigFilePath,
			open() {
				done();
			},
		});
		_fetchInitComplete(props, undefined, undefined);
	});
	it('select "open config"', done => {
		let counter = 0;
		const _inquirer = {
			prompt() {
				return _inquirer;
			},
			then(cb) {
				counter += 1;
				if (counter === 1) {
					cb({ completed: 'Open config file' });
				} else {
					cb({ completed: 'Continue' });
				}
			},
		};
		const _fetchInitComplete = resolve(fetchInitComplete, {
			inquirer: _inquirer,
			renderClear,
			getConfigFilePath,
			open(value) {
				expect(value).toBe('/.contributebuddy/config.json');
				done();
			},
		});
		_fetchInitComplete(props, undefined, undefined);
	});
});
