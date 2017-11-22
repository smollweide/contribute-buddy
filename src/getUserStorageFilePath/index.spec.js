const resolve = require('../resolve');
const { getUserStorageFilePath } = require('./index');

const _process = { exit() {} };
const getPackage = () => ({ name: 'c-b' });
const userHome = () => '/userhome';
const path = {
	join(...args) {
		return args.join('/');
	},
};
const _console = {
	error() {},
};

describe('getUserStorageFilePath', () => {
	it('default', () => {
		const _getUserStorageFilePath = resolve(getUserStorageFilePath, {
			getPackage,
			path,
			userHome,
			process: _process,
			console: _console,
		});
		expect(_getUserStorageFilePath()).toEqual('/userhome/.contributebuddy/c-b/store.json');
	});
	it('missing package name', done => {
		const _getUserStorageFilePath = resolve(getUserStorageFilePath, {
			getPackage: () => ({}),
			path,
			userHome,
			process: {
				exit() {
					done();
				},
			},
			console: _console,
		});
		expect(_getUserStorageFilePath()).toEqual(undefined);
	});
});
