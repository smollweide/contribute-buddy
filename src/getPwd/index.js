'use strict';
const path = require('path');
const resolve = require('../resolve');

/**
 * @param {Object} di - dependency injection
 * @returns {string} pwd - returns the package working diretory
 **/
function getPwd({ _path, _process }) {
	return _path.join(_process.mainModule.filename, '..', '..');
}

module.exports = resolve(getPwd, { path, process });
module.exports.getPwd = getPwd;
