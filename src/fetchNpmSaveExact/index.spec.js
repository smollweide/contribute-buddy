const resolve = require('../resolve');
const { fetchNpmSaveExact } = require('./index');

describe('fetchNpmSaveExact', () => {
	it('fetch', done => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ npmSaveExact: 'Confirm' });
			},
		};
		const _fetchNpmSaveExact = resolve(fetchNpmSaveExact, {
			getNpmrc: () => ({ 'save-exact': 'false' }),
			getConfig: () => ({ npm: { useSaveExact: true } }),
			getUserStorage: () => ({}),
			setUserStorage() {},
			console: { log() {} },
			execa: { shellSync() {} },
			process: { exit() {} },
			inquirer,
		});
		_fetchNpmSaveExact({}).then(results => {
			expect(results).toEqual({});
			done();
		});
	});
	it('not configured', done => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ npmSaveExact: 'Confirm' });
			},
		};
		const _fetchNpmSaveExact = resolve(fetchNpmSaveExact, {
			getNpmrc: () => ({ 'save-exact': 'false' }),
			getConfig: () => ({ npm: {} }),
			getUserStorage: () => ({}),
			setUserStorage() {},
			console: { log() {} },
			execa: { shellSync() {} },
			process: { process() {} },
			inquirer,
		});
		_fetchNpmSaveExact({}).then(results => {
			expect(results).toEqual({});
			done();
		});
	});
	it('already set', done => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ npmSaveExact: 'Confirm' });
			},
		};
		const _fetchNpmSaveExact = resolve(fetchNpmSaveExact, {
			getNpmrc: () => ({ 'save-exact': 'true' }),
			getConfig: () => ({ npm: { useSaveExact: true } }),
			getUserStorage: () => ({}),
			setUserStorage() {},
			console: { log() {} },
			execa: { shellSync() {} },
			process: { process() {} },
			inquirer,
		});
		_fetchNpmSaveExact({}).then(results => {
			expect(results).toEqual({});
			done();
		});
	});
	it('Leave => exit process', done => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ npmSaveExact: 'Leave' });
			},
		};
		const _fetchNpmSaveExact = resolve(fetchNpmSaveExact, {
			getNpmrc: () => ({ 'save-exact': 'false' }),
			getConfig: () => ({ npm: { useSaveExact: true } }),
			getUserStorage: () => ({}),
			setUserStorage() {},
			console: { log() {} },
			execa: { shellSync() {} },
			process: {
				exit() {
					done();
				},
			},
			inquirer,
		});
		_fetchNpmSaveExact({});
	});
	it('exec npm set save-exact true', done => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ npmSaveExact: 'Confirm' });
			},
		};
		const _fetchNpmSaveExact = resolve(fetchNpmSaveExact, {
			getNpmrc: () => ({ 'save-exact': 'false' }),
			getConfig: () => ({ npm: { useSaveExact: true } }),
			getUserStorage: () => ({}),
			setUserStorage() {},
			console: { log() {} },
			execa: {
				shellSync(cmd) {
					expect(cmd).toBe('npm set save-exact true');
					done();
				},
			},
			process: { exit() {} },
			inquirer,
		});
		_fetchNpmSaveExact({});
	});
	it('log', done => {
		const inquirer = {
			prompt: () => inquirer,
			then(cb) {
				cb({ npmSaveExact: 'Confirm' });
			},
		};
		const _fetchNpmSaveExact = resolve(fetchNpmSaveExact, {
			getNpmrc: () => ({ 'save-exact': 'false' }),
			getConfig: () => ({ npm: { useSaveExact: true } }),
			getUserStorage: () => ({}),
			setUserStorage() {},
			console: {
				log(text) {
					expect(text).toBe('Enabled npm save-exact!');
					done();
				},
			},
			execa: { shellSync() {} },
			process: { exit() {} },
			inquirer,
		});
		_fetchNpmSaveExact({});
	});
});
