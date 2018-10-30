'use strict';
const inquirer = require('inquirer');
const open = require('opn');
const chalk = require('chalk');
const resolve = require('../resolve');
const getLabel = require('../getLabel');
const getConfig = require('../getConfig');
const renderClear = require('../renderClear');

/**
 * @param {Object} results - the results object
 * @param {Function} originResolve - the origin resolve callback
 * @param {Object} oldResults - the pSeries results
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function fetchComplete(results, originResolve, oldResults, { _getConfig, _renderClear, _inquirer, _open }) {
	const config = _getConfig();
	const lableOptions = {};
	const labelTitle = chalk.inverse.bold(getLabel('completed.title', lableOptions));
	const labelText = getLabel('completed', lableOptions);

	const linksTitles = [];
	const linksValues = [];
	(config.links || []).forEach(({ title, href }) => {
		linksTitles.push(title);
		linksValues.push(href);
	});

	const prompt = pResolve => {
		if (Object.keys(results).length <= 1 && Object.keys(results.readmes).length < 1) {
			pResolve();
			return;
		}

		_renderClear();
		_inquirer
			.prompt([
				{
					type: 'list',
					choices: linksTitles.concat(['Continue']),
					name: 'completed',
					message: `${labelTitle}${labelText}`,
					default: 'Continue',
					prefix: '',
				},
			])
			.then(({ completed }) => {
				const index = linksTitles.indexOf(completed);
				if (index >= 0) {
					_open(linksValues[index]);
					prompt(originResolve || pResolve);
				} else {
					pResolve();
				}
			});
	};

	if (originResolve) {
		return;
	}

	return new Promise(prompt);
}

module.exports = resolve(fetchComplete, { getConfig, renderClear, inquirer, open });
module.exports.fetchComplete = fetchComplete;
