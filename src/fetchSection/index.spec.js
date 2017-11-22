const resolve = require('../resolve');
const { fetchSection } = require('./index');

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
				topic1: {},
			},
		},
	},
	sectionKey: 'sectionA',
	sectionIndex: 0,
};

describe('fetchSection', () => {
	it('fetch', done => {
		const _fetchSection = resolve(fetchSection, {
			process: _process,
			inquirer,
			renderClear,
			fetchTopics,
			getTopicsList,
			getUserStorage,
		});
		_fetchSection
			.bind(null, props, {})()
			.then(results => {
				expect(results.a).toEqual({});
				expect(results.sectionA.completed).toBe(true);
				expect(typeof results.sectionA.date).toBe('string');
				expect(results.sectionA.oldValue).toBe('{"text":"text","topics":{"topic1":{}}}');
				done();
			});
	});
	it("prompt section just in case contributer didn't read it yet", done => {
		const _fetchSection = resolve(fetchSection, {
			process: _process,
			inquirer,
			renderClear,
			fetchTopics,
			getTopicsList,
			getUserStorage: () => ({
				readmes: { sectionA: { oldValue: JSON.stringify(props.sections[props.sectionKey]) } },
			}),
		});
		_fetchSection
			.bind(null, props, {})()
			.then(results => {
				expect(results).toEqual({});
				done();
			});
	});
	it('select leave => process.exit', done => {
		const _inquirer = {
			prompt() {
				return _inquirer;
			},
			then(cb) {
				cb({ [props.sectionKey]: 'Leave' });
			},
		};
		const _fetchSection = resolve(fetchSection, {
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
		});
		_fetchSection.bind(null, props, {})();
	});
	it('select continue => fetchTopics', done => {
		const _inquirer = {
			prompt() {
				return _inquirer;
			},
			then(cb) {
				cb({ [props.sectionKey]: 'Continue' });
			},
		};
		const _fetchSection = resolve(fetchSection, {
			process: _process,
			inquirer: _inquirer,
			renderClear,
			fetchTopics() {
				done();
			},
			getTopicsList,
			getUserStorage,
		});
		_fetchSection.bind(null, props, {})();
	});
});
