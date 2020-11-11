'use strict';
const resolve = require('../resolve');
const getConfig = require('../getConfig');

/**
 * @param {string} key - the label key
 * @param {Object} replacement - the replacement object
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getLabel(key, replacement, { _getConfig }) {
	const config = _getConfig();

	if (!config || !config.labels || !config.labels[key]) {
		return `Label with key "${key}" not found!`;
	}

	let label = config.labels[key];

	Object.keys(replacement).forEach((replacementKey) => {
		label = label.replace(new RegExp(`{${replacementKey}}`, 'g'), replacement[replacementKey]);
	});

	return label;
}

module.exports = resolve(getLabel, { getConfig });
module.exports.getLabel = getLabel;
