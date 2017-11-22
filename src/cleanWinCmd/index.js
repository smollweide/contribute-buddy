'use strict';

/**

 * @param {string} value - the cmd value
 * @returns {void}
**/
function cleanWinCmd(value) {
	return value.replace(/^.*\\/, '');
}

module.exports = cleanWinCmd;
