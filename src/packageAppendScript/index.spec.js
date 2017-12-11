const resolve = require('../resolve');
const { packageAppendScript } = require('./index');

const getPackage = () => ({
	scripts: {
		prestart: 'do-something',
	},
});

describe('packageAppendScript', () => {
	it('script exist already', done => {
		const _packageAppendScript = resolve(packageAppendScript, {
			getPackage,
			getPackageFilePath: () => '/package.json',
			fs: {
				writeFileSync(packageFilePath, data) {
					expect(JSON.parse(data)).toEqual({
						scripts: {
							prestart: 'do-something && contribute-buddy run',
						},
					});
					done();
				},
			},
		});
		_packageAppendScript('prestart', 'contribute-buddy run');
	});
	it("script don't exist yet", done => {
		const _packageAppendScript = resolve(packageAppendScript, {
			getPackage: () => ({}),
			getPackageFilePath: () => '/package.json',
			fs: {
				writeFileSync(packageFilePath, data) {
					expect(JSON.parse(data)).toEqual({
						scripts: {
							prestart: 'contribute-buddy run',
						},
					});
					done();
				},
			},
		});
		_packageAppendScript('prestart', 'contribute-buddy run');
	});
	it("scriptName don't exist yet", done => {
		const _packageAppendScript = resolve(packageAppendScript, {
			getPackage: () => ({ scripts: {} }),
			getPackageFilePath: () => '/package.json',
			fs: {
				writeFileSync(packageFilePath, data) {
					expect(JSON.parse(data)).toEqual({
						scripts: {
							prestart: 'contribute-buddy run',
						},
					});
					done();
				},
			},
		});
		_packageAppendScript('prestart', 'contribute-buddy run');
	});
	it('same scriptName exist already', done => {
		const _packageAppendScript = resolve(packageAppendScript, {
			getPackage: () => ({ scripts: { prestart: 'contribute-buddy run' } }),
			getPackageFilePath: () => '/package.json',
			fs: {
				writeFileSync(packageFilePath, data) {
					expect(JSON.parse(data)).toEqual({
						scripts: {
							prestart: 'contribute-buddy run',
						},
					});
					done();
				},
			},
		});
		_packageAppendScript('prestart', 'contribute-buddy run');
	});
});
