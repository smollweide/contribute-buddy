const resolve = require('../resolve');
const { getUserStorage } = require('./index');

const getUserStorageFilePath = () => '/~/.contributebuddy/contribute-buddy/store.json';
const fs = {
	readFileSync() {
		return JSON.stringify({ test: 'test' });
	},
};

describe('getUserStorage', () => {
	it('default', () => {
		const _getUserStorage = resolve(getUserStorage, {
			getUserStorageFilePath,
			fs,
		});
		expect(_getUserStorage()).toEqual({ test: 'test' });
	});
	it('catch err', () => {
		const _getUserStorage = resolve(getUserStorage, {
			getUserStorageFilePath,
			fs: {
				readFileSync() {
					return 'hallo';
				},
			},
		});
		expect(_getUserStorage()).toEqual({});
	});
});
