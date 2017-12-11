const resolve = require('../resolve');
const { fetchComplete } = require('./index');

const inquirer = {
	prompt() {
		return inquirer;
	},
	then(cb) {
		cb({});
	},
};
const renderClear = () => {};
const links = [
	{
		title: 'Open contribute-buddy on github',
		href: 'https://github.com/smollweide/contribute-buddy',
	},
	{
		title: 'Report improvment or issue on github',
		href: 'https://github.com/smollweide/contribute-buddy/issues',
	},
];
const getConfig = () => ({ links });
const props = {
	username: 'username',
	readmes: {},
};
const open = () => {};

describe('fetchComplete', () => {
	it('fetch', done => {
		const _fetchComplete = resolve(fetchComplete, {
			inquirer,
			renderClear,
			getConfig,
			open,
		});
		_fetchComplete(props, undefined, undefined).then(() => {
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
		const _fetchComplete = resolve(fetchComplete, {
			inquirer: _inquirer,
			renderClear,
			getConfig,
			open,
		});
		_fetchComplete(props, undefined, undefined);
	});
	it('with originResolve', () => {
		const _fetchComplete = resolve(fetchComplete, {
			inquirer,
			renderClear,
			getConfig,
			open,
		});
		_fetchComplete(props, () => {}, undefined);
	});
	it('nothing completed', done => {
		const _fetchComplete = resolve(fetchComplete, {
			inquirer,
			renderClear,
			getConfig,
			open,
		});
		_fetchComplete({ readmes: {} }, undefined, undefined).then(() => {
			done();
		});
	});
	it('no links defined in config', done => {
		const _fetchComplete = resolve(fetchComplete, {
			inquirer,
			renderClear,
			getConfig: () => ({}),
			open,
		});
		_fetchComplete(props, undefined, undefined).then(() => {
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
					cb({ completed: links[0].title });
				} else {
					cb({ completed: 'Continue' });
				}
			},
		};
		const _fetchComplete = resolve(fetchComplete, {
			inquirer: _inquirer,
			renderClear,
			getConfig,
			open() {
				done();
			},
		});
		_fetchComplete(props, undefined, undefined);
	});
});
