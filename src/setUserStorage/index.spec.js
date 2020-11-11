const resolve = require('../resolve');
const { setUserStorage } = require('./index');

const makeDir = { sync() {} };
const path = {
	join(...args) {
		return args.join('/');
	},
	basename() {
		return 'path/userstorage';
	},
};
const getUserStorageFilePath = () => 'path/userstorage/user.json';

describe('setUserStorage', () => {
	it('default', (done) => {
		const _setUserStorage = resolve(setUserStorage, {
			makeDir,
			fs: {
				writeFileSync(pathToFile, data) {
					expect(pathToFile).toBe('path/userstorage/user.json');
					expect(JSON.parse(data)).toEqual({ username: 'username' });
					done();
				},
			},
			path,
			getUserStorageFilePath,
		});
		_setUserStorage({ username: 'username' });
	});
});
