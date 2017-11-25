'use strict';
const inquirer = require('inquirer');
const execa = require('execa');
const resolve = require('../resolve');
const getNpmrc = require('../getNpmrc');
const getLabel = require('../getLabel');
const getConfig = require('../getConfig');

/**

 * @param {Object} results - the results object
 * @param {Object} di - dependency injection
 * @returns {void}
**/
function fetchNpmSaveExact(results, { _inquirer, _getNpmrc, _getConfig, _execa, _console, _process }) {
	const rc = _getNpmrc();
	const config = _getConfig();

	return new Promise(pResolve => {
		if (config.npm && config.npm.useSaveExact && rc['save-exact'] !== 'true') {
			_inquirer
				.prompt([
					{
						type: 'list',
						choices: ['Confirm', 'Leave'],
						name: 'npmSaveExact',
						message: getLabel('npm.save.exact.missing', {}),
						default: 'Confirm',
					},
				])
				.then(({ npmSaveExact }) => {
					if (npmSaveExact !== 'Confirm') {
						_process.exit();
					}

					_execa.shellSync(`npm set save-exact true`);
					_console.log(getLabel('npm.save.exact.stored', {}));
					pResolve({});
				});
		} else {
			pResolve({});
		}
	});
}

module.exports = resolve(fetchNpmSaveExact, { inquirer, getNpmrc, getConfig, execa, console, process });
module.exports.fetchNpmSaveExact = fetchNpmSaveExact;
