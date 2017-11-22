const getTopicsList = require('./index');

describe('getTopicsList', () => {
	it('default', () => {
		expect(
			getTopicsList(
				{
					topics: {
						topicA: 'topicA href',
						topicB: 'topicB href',
					},
				},
				0
			)
				.replace(/\n/g, '')
				.trim()
		).toBe('Topics of this chapter:1.1 topicA1.2 topicB');
	});
	it('no topics', () => {
		expect(
			getTopicsList(
				{
					topics: undefined,
				},
				0
			)
				.replace(/\n/g, '')
				.trim()
		).toBe('');
	});
	it('empty topics', () => {
		expect(
			getTopicsList(
				{
					topics: [],
				},
				0
			)
				.replace(/\n/g, '')
				.trim()
		).toBe('');
	});
});
