'use strict';
const fs = require('fs');
const path = require('path');
const resolve = require('../resolve');
const getConfig = require('../getConfig');
const getConfigFilePath = require('../getConfigFilePath');
const getCwd = require('../getCwd');
const getLabel = require('../getLabel');
const convertMarkdown = require('../convertMarkdown');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getReadmeFiles({ _getConfig, _getConfigFilePath, _getCwd, _convertMarkdown, _path, _fs, _console }) {
	const config = _getConfig();
	const configFilePath = _getConfigFilePath();
	const cwd = _getCwd();
	const readmeFilesData = [];

	if (!config || !config.files || !Array.isArray(config.files)) {
		_console.error(getLabel('topics.config.files.missing', { path: configFilePath.replace(cwd, '') }));
		return {};
	}

	config.files.forEach((fileObj) => {
		// add leading empty line to make sure split will work as expected
		readmeFilesData.push(`\n${_fs.readFileSync(_path.join(cwd, fileObj.path), 'utf8')}`);
	});

	return _convertMarkdown(readmeFilesData.join(''));
}

module.exports = resolve(getReadmeFiles, {
	getConfig,
	getConfigFilePath,
	getCwd,
	convertMarkdown,
	fs,
	path,
	console,
});
module.exports.getReadmeFiles = getReadmeFiles;
