'use strict';
const fs = require('fs');
const resolve = require('../resolve');
const getConfigFilePath = require('../getConfigFilePath');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getConfig({ _fs, _getConfigFilePath }) {
	return JSON.parse(_fs.readFileSync(_getConfigFilePath(), 'utf8'));
}

module.exports = resolve(getConfig, { fs, getConfigFilePath });
module.exports.getConfig = getConfig;
