const resolve = require('../resolve');
const { getNpmrc } = require('./index');

const _process = { platform: '' };
const execa = {
	shellSync() {
		return {
			stdout: '\nsave-exact=true\ninit-licence=MIT',
		};
	},
};

describe('getNpmrc', () => {
	it('default', () => {
		const _getNpmrc = resolve(getNpmrc, {
			process: _process,
			execa,
		});
		expect(_getNpmrc()).toEqual({ 'init-licence': 'MIT', 'save-exact': 'true' });
	});
	it('win32', () => {
		const _getNpmrc = resolve(getNpmrc, {
			process: { platform: 'win32' },
			execa,
		});
		expect(_getNpmrc()).toEqual({ 'init-licence': 'MIT', 'save-exact': 'true' });
	});
	it('invalid stdout', () => {
		const _getNpmrc = resolve(getNpmrc, {
			process: _process,
			execa: {
				shellSync() {
					return {
						stdout: '\nsave-exact=true=false\ninit-licence=MIT',
					};
				},
			},
		});
		expect(_getNpmrc()).toEqual({ 'init-licence': 'MIT' });
	});
	it('catch error', () => {
		const _getNpmrc = resolve(getNpmrc, {
			process: _process,
			execa: {
				shellSync() {
					return undefined;
				},
			},
		});
		expect(_getNpmrc()).toEqual(undefined);
	});
});
