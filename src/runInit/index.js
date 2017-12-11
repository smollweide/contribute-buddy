'use strict';
const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');
const resolve = require('../resolve');
const getCwd = require('../getCwd');
const getPwd = require('../getPwd');
const packageAppendScript = require('../packageAppendScript');
const fetchInitReadmes = require('../fetchInitReadmes');
const fetchInitComplete = require('../fetchInitComplete');
const renderClear = require('../renderClear');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function runInit({
	_getCwd,
	_getPwd,
	_renderClear,
	_packageAppendScript,
	_fetchInitReadmes,
	_fetchInitComplete,
	_path,
	_fs,
	_makeDir,
}) {
	return _fetchInitReadmes({}).then(({ selectedReadmeFiles }) => {
		_renderClear();
		const originConfig = JSON.parse(
			_fs.readFileSync(_path.join(_getPwd(), '.contributebuddy', 'config.json'), 'utf8')
		);
		originConfig.files = selectedReadmeFiles;
		_makeDir.sync(_path.join(_getCwd(), '.contributebuddy'));
		_fs.writeFileSync(
			_path.join(_getCwd(), '.contributebuddy', 'config.json'),
			JSON.stringify(originConfig, null, 2)
		);
		_packageAppendScript('prestart', 'contribute-buddy run');
		_packageAppendScript('postinstall', 'contribute-buddy run');
		_fetchInitComplete({}, undefined, {});
	});
}

module.exports = resolve(runInit, {
	getCwd,
	getPwd,
	renderClear,
	packageAppendScript,
	fetchInitReadmes,
	fetchInitComplete,
	path,
	fs,
	makeDir,
});
module.exports.runInit = runInit;
