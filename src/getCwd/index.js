'use strict';
const fs = require('fs');
const resolve = require('../resolve');

/**
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getCwd({ _fs, _process }) {
	return _fs.realpathSync(_process.cwd());
}

module.exports = resolve(getCwd, { fs, process });
module.exports.getCwd = getCwd;
