'use strict';
const inquirer = require('inquirer');
const chalk = require('chalk');
const resolve = require('../resolve');
const getLabel = require('../getLabel');
const getPackage = require('../getPackage');
const getUserStorage = require('../getUserStorage');
const setUserStorage = require('../setUserStorage');
const renderClear = require('../renderClear');

/**
 * @param {Object} results - the results object
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function fetchWelcome(results, { _getPackage, _getUserStorage, _setUserStorage, _renderClear, _inquirer, _process }) {
	const userStorage = _getUserStorage();
	const packageData = _getPackage();

	return new Promise(pResolve => {
		if (!userStorage.welcome) {
			const lableOptions = {
				name: userStorage.username,
				packageName: packageData.name,
			};
			const labelTitle = chalk.inverse.bold(getLabel('welcome.first.visit.title', lableOptions));
			const labelText = getLabel('welcome.first.visit', lableOptions);
			_renderClear();
			_inquirer
				.prompt([
					{
						type: 'list',
						choices: ['Continue', 'Leave'],
						name: 'welcome',
						message: `${labelTitle}${labelText}`,
						default: 'Continue',
						prefix: '',
					},
				])
				.then(({ welcome }) => {
					if (welcome !== 'Continue') {
						_process.exit();
					}
					userStorage.welcome = true;
					_setUserStorage(userStorage);
					pResolve({ welcome: true });
				});
		} else {
			pResolve({});
		}
	});
}

module.exports = resolve(fetchWelcome, { getPackage, getUserStorage, setUserStorage, renderClear, inquirer, process });
module.exports.fetchWelcome = fetchWelcome;
