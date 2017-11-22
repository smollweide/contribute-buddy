'use strict';
const path = require('path');
const userHome = require('os-homedir');
const resolve = require('../resolve');
const getPackage = require('../getPackage');
const getLabel = require('../getLabel');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getUserStorageFilePath({ _userHome, _path, _getPackage, _process, _console }) {
	const packageData = _getPackage();
	if (!packageData || !packageData.name) {
		_console.error(getLabel('package.name.missing', {}));
		_process.exit();
		return undefined;
	}
	return _path.join(_userHome(), '.contributebuddy', packageData.name, 'store.json');
}

module.exports = resolve(getUserStorageFilePath, { userHome, path, getPackage, process, console });
module.exports.getUserStorageFilePath = getUserStorageFilePath;
