'use strict';
const path = require('path');
const resolve = require('../resolve');
const getCwd = require('../getCwd');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getPackageFilePath({ _path, _getCwd }) {
	return _path.join(_getCwd(), 'package.json');
}

module.exports = resolve(getPackageFilePath, { path, getCwd });
module.exports.getPackageFilePath = getPackageFilePath;
