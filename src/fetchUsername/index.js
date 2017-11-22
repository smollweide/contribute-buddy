'use strict';
const inquirer = require('inquirer');
const resolve = require('../resolve');
const getLabel = require('../getLabel');
const getUserStorage = require('../getUserStorage');
const setUserStorage = require('../setUserStorage');

/**
 * @param {Object} results - the results object
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function fetchUsername(results, { _inquirer, _getUserStorage, _setUserStorage, _console }) {
	const userStorage = _getUserStorage();

	return new Promise(pResolve => {
		if (!userStorage.username) {
			// TODO validate answer
			_inquirer
				.prompt([
					{
						type: 'input',
						name: 'username',
						message: getLabel('username.missing', {}),
					},
				])
				.then(({ username }) => {
					userStorage.username = username;
					_setUserStorage(userStorage);
					_console.log(getLabel('username.stored', { username }));
					pResolve({ username });
				});
		} else {
			pResolve({ username: userStorage.username });
		}
	});
}

module.exports = resolve(fetchUsername, { inquirer, getUserStorage, setUserStorage, console });
module.exports.fetchUsername = fetchUsername;
