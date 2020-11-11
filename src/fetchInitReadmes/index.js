'use strict';
const path = require('path');
const inquirer = require('inquirer');
const glob = require('glob');
const resolve = require('../resolve');
const getCwd = require('../getCwd');
const renderClear = require('../renderClear');

/**
 * @param {Object} results - the results object
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function fetchInitReadmes(results, { _renderClear, _getCwd, _path, _glob, _inquirer }) {
	const cwd = _getCwd();
	const readmeFiles = _glob
		.sync(_path.join(cwd, '**', '*.md'), {
			ignore: [_path.join(_getCwd(), 'node_modules', '**')],
		})
		.map((filePath) => filePath.replace(cwd, '').replace(/^\//, ' '));

	_renderClear();

	return new Promise((pResolve) => {
		_inquirer
			.prompt([
				{
					type: 'checkbox',
					name: 'selectedReadmeFiles',
					message: 'Select the readme files you like to use',
					choices: readmeFiles.map((value) => ({ value, checked: true })),
				},
			])
			.then(({ selectedReadmeFiles }) => {
				pResolve({
					selectedReadmeFiles: selectedReadmeFiles.map((filePath) => ({ path: filePath.replace(/^ /, '/') })),
				});
			});
	});
}

module.exports = resolve(fetchInitReadmes, { renderClear, getCwd, path, glob, inquirer });
module.exports.fetchInitReadmes = fetchInitReadmes;
