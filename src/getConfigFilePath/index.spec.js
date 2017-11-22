const resolve = require('../resolve');
const { getConfigFilePath } = require('./index');

const getCwd = () => '';
const path = {
	join(...args) {
		return args.join('/');
	},
};

describe('getConfigFilePath', () => {
	it('default', () => {
		const _getConfigFilePath = resolve(getConfigFilePath, {
			getCwd,
			path,
		});
		expect(_getConfigFilePath()).toEqual('/.contributebuddy/config.json');
	});
});
