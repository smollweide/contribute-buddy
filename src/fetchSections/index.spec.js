const resolve = require('../resolve');
const { fetchSections } = require('./index');

describe('fetchSections', () => {
	it('fetch', done => {
		const _fetchSections = resolve(fetchSections, {
			fetchSection: () => {
				return new Promise(pResolve => {
					pResolve({});
				});
			},
		});
		_fetchSections({
			a: {},
		}).then(results => {
			expect(results).toEqual({});
			done();
		});
	});
});
