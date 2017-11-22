const resolve = require('../resolve');
const { getPackageFilePath } = require('./index');

const getCwd = () => '';
const path = {
	join(...args) {
		return args.join('/');
	},
};

describe('getPackageFilePath', () => {
	it('default', () => {
		const _getPackageFilePath = resolve(getPackageFilePath, {
			getCwd,
			path,
		});
		expect(_getPackageFilePath()).toEqual('/package.json');
	});
});
