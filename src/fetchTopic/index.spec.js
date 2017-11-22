const resolve = require('../resolve');
const { fetchTopic } = require('./index');

const inquirer = {
	prompt() {
		return inquirer;
	},
	then(cb) {
		cb({});
	},
};
const _process = {
	exit() {},
};
const renderClear = () => {};
const fetchTopics = () => {
	return new Promise(pResolve => {
		pResolve({ a: {} });
	});
};
const getTopicsList = () => 'getTopicsList';
const getUserStorage = () => ({
	readmes: { sectionA: { oldValue: 'old' } },
});
const props = {
	sections: {
		sectionA: {
			text: 'text',
			topics: {
				topic1: {
					links: [{ linkA: 'linkAHref' }],
				},
			},
		},
	},
	sectionKey: 'sectionA',
	sectionIndex: 0,
};
const propsTopic = {
	topicKey: 'topic1',
	sectionIndex: 0,
};
const open = () => {};

describe('fetchTopic', () => {
	it('fetch', done => {
		const _fetchTopic = resolve(fetchTopic, {
			process: _process,
			inquirer,
			renderClear,
			fetchTopics,
			getTopicsList,
			getUserStorage,
			open,
		});
		_fetchTopic(props, propsTopic, undefined).then(results => {
			expect(results['sectionA/topic1'].completed).toBe(true);
			expect(typeof results['sectionA/topic1'].date).toBe('string');
			expect(results['sectionA/topic1'].oldValue).toBe('{"links":[{"linkA":"linkAHref"}]}');
			done();
		});
	});
	it('with originResolve', () => {
		const _fetchTopic = resolve(fetchTopic, {
			process: _process,
			inquirer,
			renderClear,
			fetchTopics,
			getTopicsList,
			getUserStorage,
			open,
		});
		_fetchTopic(props, propsTopic, () => {});
	});
	it("prompt topic just in case contributer didn't read it yet", done => {
		const _fetchTopic = resolve(fetchTopic, {
			process: _process,
			inquirer,
			renderClear,
			fetchTopics,
			getTopicsList,
			getUserStorage: () => ({
				readmes: {
					'sectionA/topic1': { oldValue: JSON.stringify(props.sections[props.sectionKey].topics.topic1) },
				},
			}),
			open,
		});
		_fetchTopic(props, propsTopic, undefined).then(results => {
			expect(results).toEqual({});
			done();
		});
	});
	it('empty links', done => {
		const _props = {
			sections: {
				sectionA: {
					text: 'text',
					topics: {
						topic1: {},
					},
				},
			},
			sectionKey: 'sectionA',
			sectionIndex: 0,
		};
		const _fetchTopic = resolve(fetchTopic, {
			process: _process,
			inquirer,
			renderClear,
			fetchTopics,
			getTopicsList,
			getUserStorage: () => ({
				readmes: {
					'sectionA/topic1': { oldValue: JSON.stringify(props.sections[props.sectionKey].topics.topic1) },
				},
			}),
			open,
		});
		_fetchTopic(_props, propsTopic, undefined).then(results => {
			expect(results['sectionA/topic1'].completed).toBe(true);
			expect(typeof results['sectionA/topic1'].date).toBe('string');
			expect(results['sectionA/topic1'].oldValue).toBe('{}');
			done();
		});
	});
	it('select leave => process.exit', done => {
		const _inquirer = {
			prompt() {
				return _inquirer;
			},
			then(cb) {
				// cb({});
				cb({ [propsTopic.topicKey]: 'Leave' });
			},
		};
		const _fetchTopic = resolve(fetchTopic, {
			process: {
				exit() {
					done();
				},
			},
			inquirer: _inquirer,
			renderClear,
			fetchTopics,
			getTopicsList,
			getUserStorage,
			open,
		});
		_fetchTopic(props, propsTopic, undefined);
	});
	it('select link => open', done => {
		const _inquirer = {
			prompt() {
				return _inquirer;
			},
			then(cb) {
				// cb({});
				cb({ [propsTopic.topicKey]: 'Open "linkA" in browser' });
			},
		};
		const _fetchTopic = resolve(fetchTopic, {
			process: _process,
			inquirer: _inquirer,
			renderClear,
			fetchTopics,
			getTopicsList,
			getUserStorage,
			open(href) {
				expect(href).toBe('linkAHref');
				done();
			},
		});
		_fetchTopic(props, propsTopic, undefined);
	});
});
