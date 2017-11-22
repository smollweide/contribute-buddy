const resolve = require('../resolve');
const { getPackage } = require('./index');

const getPackageFilePath = () => '/package.json';
const fs = {
	readFileSync() {
		return JSON.stringify({ test: 'test' });
	},
};

describe('getPackage', () => {
	it('default', () => {
		const _getPackage = resolve(getPackage, {
			getPackageFilePath,
			fs,
		});
		expect(_getPackage()).toEqual({ test: 'test' });
	});
});
