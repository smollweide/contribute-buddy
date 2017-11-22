const resolve = require('../resolve');
const { getReadmeFiles } = require('./index');

const getConfig = () => ({
	files: [
		{
			path: 'a',
		},
		{
			path: 'b',
		},
	],
});
const getCwd = () => '/cwd/';
const getConfigFilePath = () => '/cwd/.contributebuddy/contribute-buddy';
const convertReadme2ReadmeDTO = data => data;
const fs = {
	readFileSync() {
		return '#readme\n\n##file';
	},
};
const path = {
	join(...args) {
		return args.join('/');
	},
};
const _console = {
	error() {},
};

describe('getReadmeFiles', () => {
	it('default', () => {
		const _getReadmeFiles = resolve(getReadmeFiles, {
			getConfig,
			getConfigFilePath,
			getCwd,
			convertReadme2ReadmeDTO,
			fs,
			path,
			console: _console,
		});
		expect(
			_getReadmeFiles()
				.split('\n')
				.join('<br/>')
		).toBe('<br/>#readme<br/><br/>##file<br/>#readme<br/><br/>##file');
	});
	it('no files defined in config', () => {
		const _getReadmeFiles = resolve(getReadmeFiles, {
			getConfig: () => ({}),
			getConfigFilePath,
			getCwd,
			convertReadme2ReadmeDTO,
			fs,
			path,
			console: _console,
		});
		expect(_getReadmeFiles()).toEqual({});
	});
});
