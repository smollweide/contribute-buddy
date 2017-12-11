const resolve = require('../resolve');
const { fetchInitReadmes } = require('./index');

const renderClear = () => {};
const getCwd = () => '/cwd';
const path = {
	join(...args) {
		return args.join('/').replace(/\/\//g, '');
	},
};
const glob = {
	sync: () => ['/README.md', '/docs/guide.md'],
};
const inquirer = {
	prompt() {
		return inquirer;
	},
	then(cb) {
		cb({ selectedReadmeFiles: ['/README.md', '/docs/guide.md'] });
	},
};
const props = {};

describe('fetchInitReadmes', () => {
	it('prompt readme files', done => {
		const _fetchInitReadmes = resolve(fetchInitReadmes, {
			renderClear,
			getCwd,
			path,
			glob,
			inquirer: {
				prompt(options) {
					expect(options[0].choices).toEqual([
						{ checked: true, value: ' README.md' },
						{ checked: true, value: ' docs/guide.md' },
					]);
					done();
				},
			},
		});
		_fetchInitReadmes(props);
	});
	it('result is correct', done => {
		const _fetchInitReadmes = resolve(fetchInitReadmes, {
			renderClear,
			getCwd,
			path,
			glob,
			inquirer,
		});
		_fetchInitReadmes(props).then(result => {
			expect(result).toEqual({ selectedReadmeFiles: [{ path: '/README.md' }, { path: '/docs/guide.md' }] });
			done();
		});
	});
});
