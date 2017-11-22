'use strict';
const path = require('path');
const resolve = require('../resolve');
const getCwd = require('../getCwd');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getConfigFilePath({ _path, _getCwd }) {
	return _path.join(_getCwd(), '.contributebuddy/config.json');
}

module.exports = resolve(getConfigFilePath, { path, getCwd });
module.exports.getConfigFilePath = getConfigFilePath;
