const resolve = require('../resolve');
const { fetchTopics } = require('./index');

describe('fetchTopics', () => {
	it('fetch', done => {
		const _fetchTopics = resolve(fetchTopics, {
			fetchTopic() {
				return new Promise(pResolve => {
					pResolve({ a: {} });
				});
			},
		});
		const props = {
			sections: {
				section1: {
					topics: {
						topic1: {},
					},
				},
			},
			sectionKey: 'section1',
			sectionIndex: 0,
		};
		_fetchTopics(props).then(results => {
			expect(results).toEqual({ a: {} });
			done();
		});
	});
});
