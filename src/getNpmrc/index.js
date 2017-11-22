'use strict';
const execa = require('execa');
const resolve = require('../resolve');
const cleanWinCmd = require('../cleanWinCmd');

/**
 * @param {Object} di - dependency injection
 * @returns {string|undefined} username - returns the npm username or undefined
 **/
function getNpmrc({ _process, _execa }) {
	try {
		const rc = {};
		let rcraw = _execa.shellSync('npm config list').stdout;
		if (_process.platform === 'win32') {
			rcraw = cleanWinCmd(rcraw);
		}

		rcraw.split('\n').forEach(value => {
			const valueSpl = value.split('=');
			if (valueSpl.length === 2) {
				rc[valueSpl[0].trim()] = valueSpl[1].trim();
			}
		});
		return rc;
	} catch (err) {
		return undefined;
	}
}

module.exports = resolve(getNpmrc, { process, execa });
module.exports.getNpmrc = getNpmrc;
