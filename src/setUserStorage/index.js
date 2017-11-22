'use strict';
const fs = require('fs');
const makeDir = require('make-dir');
const path = require('path');
const resolve = require('../resolve');
const getUserStorageFilePath = require('../getUserStorageFilePath');

/**
 * @param {Object} userStorage - the user storage object
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function setUserStorage(userStorage, { _makeDir, _fs, _path, _getUserStorageFilePath }) {
	const filePath = _getUserStorageFilePath();
	_makeDir.sync(filePath.replace(_path.basename(filePath), ''));
	_fs.writeFileSync(filePath, JSON.stringify(userStorage, null, 2));
}

module.exports = resolve(setUserStorage, { makeDir, fs, path, getUserStorageFilePath });
module.exports.setUserStorage = setUserStorage;
