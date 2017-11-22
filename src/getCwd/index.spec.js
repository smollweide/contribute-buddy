const resolve = require('../resolve');
const { getCwd } = require('./index');

const _process = { cwd: () => 'cwd' };
const fs = {
	realpathSync(path) {
		return path;
	},
};

describe('getCwd', () => {
	it('default', () => {
		const _getCwd = resolve(getCwd, {
			process: _process,
			fs,
		});
		expect(_getCwd()).toEqual('cwd');
	});
});
