const resolve = require('../resolve');
const { fetchReadmes } = require('./index');

describe('fetchReadmes', () => {
	it('fetch', (done) => {
		const _fetchReadmes = resolve(fetchReadmes, {
			getReadmeFiles: () => ({
				sections: {
					a: {},
					b: {},
				},
			}),
			fetchSections: () => {
				return new Promise((pResolve) => {
					pResolve({});
				});
			},
		});
		_fetchReadmes({}).then((results) => {
			expect(results).toEqual({ readmes: {} });
			done();
		});
	});
	it('no readme files', (done) => {
		const _fetchReadmes = resolve(fetchReadmes, {
			getReadmeFiles: () => ({}),
			fetchSections: () => {
				return new Promise((pResolve) => {
					pResolve({});
				});
			},
		});
		_fetchReadmes({}).then((results) => {
			expect(results).toEqual({});
			done();
		});
	});
});
