/* eslint quote-props: 0*/
const resolve = require('../resolve');
const { runInit } = require('./index');

const renderClear = () => {};
const fetchInitReadmes = () =>
	new Promise((pResolve) => pResolve({ selectedReadmeFiles: ['/README.md', '/docs/guide.md'] }));
const fetchInitComplete = () => new Promise((pResolve) => pResolve());
const getCwd = () => '/cwd';
const getPwd = () => '/pwd';
const makeDir = {
	sync: () => {},
};
const packageAppendScript = () => {};
const path = {
	join(...args) {
		return args.join('/').replace(/\/\//g, '');
	},
};
const fs = {
	readFileSync: () => '{}',
	writeFileSync: () => {},
};

describe('runInit', () => {
	it('default', (done) => {
		const _runInit = resolve(runInit, {
			getCwd,
			getPwd,
			packageAppendScript,
			fetchInitReadmes,
			fetchInitComplete,
			path,
			fs,
			makeDir,
			renderClear,
		});
		_runInit().then(() => {
			done();
		});
	});
});
