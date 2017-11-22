'use strict';
const fs = require('fs');
const resolve = require('../resolve');
const getPackageFilePath = require('../getPackageFilePath');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getPackage({ _fs, _getPackageFilePath }) {
	return JSON.parse(_fs.readFileSync(_getPackageFilePath(), 'utf8'));
}

module.exports = resolve(getPackage, { fs, getPackageFilePath });
module.exports.getPackage = getPackage;
