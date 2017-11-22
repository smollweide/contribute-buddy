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
function fetchEmail(results, { _getUserStorage, _setUserStorage, _console, _inquirer }) {
	const userStorage = _getUserStorage();

	return new Promise(pResolve => {
		if (!userStorage.email) {
			// TODO validate answer
			_inquirer
				.prompt([
					{
						type: 'input',
						name: 'email',
						message: getLabel('email.missing', {}),
					},
				])
				.then(({ email }) => {
					userStorage.email = email;
					_setUserStorage(userStorage);
					_console.log(getLabel('email.stored', { email }));
					pResolve({ email });
				});
		} else {
			pResolve({ email: userStorage.email });
		}
	});
}

module.exports = resolve(fetchEmail, { getUserStorage, setUserStorage, console, inquirer });
module.exports.fetchEmail = fetchEmail;
