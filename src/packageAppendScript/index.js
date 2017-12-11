'use strict';
const fs = require('fs');
const getPackage = require('../getPackage');
const getPackageFilePath = require('../getPackageFilePath');
const resolve = require('../resolve');

/**
 * @param {string} scriptName - name of script e.g. "prestart"
 * @param {string} append - the append command e.g. "contribute-buddy run"
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function packageAppendScript(scriptName, append, { _getPackage, _getPackageFilePath, _fs }) {
	const packageData = _getPackage();

	if (!packageData.scripts) {
		packageData.scripts = {};
	}

	if (packageData.scripts[scriptName]) {
		if (packageData.scripts[scriptName].indexOf(append) < 0) {
			packageData.scripts[scriptName] = `${packageData.scripts[scriptName]} && ${append}`;
		}
	} else {
		packageData.scripts[scriptName] = append;
	}

	_fs.writeFileSync(_getPackageFilePath(), JSON.stringify(packageData, null, 2));
}

module.exports = resolve(packageAppendScript, { getPackage, getPackageFilePath, fs });
module.exports.packageAppendScript = packageAppendScript;
