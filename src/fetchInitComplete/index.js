'use strict';
const inquirer = require('inquirer');
const open = require('opn');
const chalk = require('chalk');
const resolve = require('../resolve');
const getConfigFilePath = require('../getConfigFilePath');
const renderClear = require('../renderClear');

/**
 * @param {Object} results - the results object
 * @param {Function} originResolve - the origin resolve callback
 * @param {Object} oldResults - the pSeries results
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function fetchInitComplete(results, originResolve, oldResults, { _renderClear, _getConfigFilePath, _inquirer, _open }) {
	const labelTitle = chalk.inverse.bold('Init complete 👏!\n\n');
	const labelText =
		'\nInit complete!\nYou can change the config by editing "./.contributebuddy/config.json"\nRun "contribute-buddy run" to start.\n\n';

	const links = [
		{
			title: 'Open config file',
		},
		{
			title: 'Open contribute-buddy on github',
			href: 'https://github.com/smollweide/contribute-buddy',
		},
		{
			title: 'Report improvment or issue on github',
			href: 'https://github.com/smollweide/contribute-buddy/issues/new',
		},
	];
	const linksTitles = [];
	const linksValues = [];
	links.forEach(({ title, href }) => {
		linksTitles.push(title);
		linksValues.push(href);
	});

	const prompt = (pResolve) => {
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
				if (completed === 'Open config file') {
					_open(_getConfigFilePath());
					prompt(originResolve || pResolve);
				} else if (index >= 0) {
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

module.exports = resolve(fetchInitComplete, { renderClear, getConfigFilePath, inquirer, open });
module.exports.fetchInitComplete = fetchInitComplete;
