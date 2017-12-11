const resolve = require('../resolve');
const { getPwd } = require('./index');

const _process = {
	mainModule: {
		filename: '/package/dir',
	},
};
const path = {
	join(...args) {
		return args.join('/').replace(/\/\//g, '');
	},
};

describe('getPwd', () => {
	it('default', () => {
		const _getPwd = resolve(getPwd, {
			path,
			process: _process,
		});
		expect(_getPwd()).toEqual('/package/dir/../..');
	});
});
