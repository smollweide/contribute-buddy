'use strict';
const fs = require('fs');
const resolve = require('../resolve');
const getUserStorageFilePath = require('../getUserStorageFilePath');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getUserStorage({ _fs, _getUserStorageFilePath }) {
	try {
		return JSON.parse(_fs.readFileSync(_getUserStorageFilePath(), 'utf8'));
	} catch (err) {
		return {};
	}
}

module.exports = resolve(getUserStorage, { fs, getUserStorageFilePath });
module.exports.getUserStorage = getUserStorage;
