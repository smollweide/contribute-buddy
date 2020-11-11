'use strict';
const program = require('commander');
const resolve = require('../resolve');
const packageData = require('../../package.json');

/**
 * @param {Function} runInit - Callback function for init
 * @param {Function} runCheck - Callback function for check
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function runCommander(runInit, runCheck, { _program, _process, _packageData }) {
	_program.version(_packageData.version);

	_program.command('init').description('Init contribute buddy on your project').action(runInit);

	_program.command('run').description('Runs contribute buddys guided tour').action(runCheck);

	_program.parse(_process.argv);
}

module.exports = {
	runCommander: resolve(runCommander, { program, process, packageData }),
	program,
	_runCommander: runCommander,
};
