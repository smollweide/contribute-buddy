const resolve = require('../resolve');
const { getConfig } = require('./index');

const getConfigFilePath = () => '/package.json';
const fs = {
	readFileSync() {
		return JSON.stringify({ test: 'test' });
	},
};

describe('getConfig', () => {
	it('default', () => {
		const _getConfig = resolve(getConfig, {
			getConfigFilePath,
			fs,
		});
		expect(_getConfig()).toEqual({ test: 'test' });
	});
});
