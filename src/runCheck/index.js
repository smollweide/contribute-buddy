'use strict';
const pSeries = require('p-series');
const resolve = require('../resolve');
const fetchWelcome = require('../fetchWelcome');
const fetchUsername = require('../fetchUsername');
const fetchEmail = require('../fetchEmail');
const fetchNpmSaveExact = require('../fetchNpmSaveExact');
const fetchReadmes = require('../fetchReadmes');
const getUserStorage = require('../getUserStorage');
const setUserStorage = require('../setUserStorage');
const renderClear = require('../renderClear');

/**
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function runCheck({
	_getUserStorage,
	_setUserStorage,
	_renderClear,
	_fetchWelcome,
	_fetchUsername,
	_fetchEmail,
	_fetchNpmSaveExact,
	_fetchReadmes,
}) {
	const store = _getUserStorage();

	pSeries([_fetchUsername, _fetchEmail, _fetchNpmSaveExact, _fetchWelcome, _fetchReadmes]).then(results => {
		const resultsStore = Object.assign(...results);
		const readmes = Object.assign({}, store.readmes, resultsStore.readmes);
		const newStore = Object.assign({}, store, resultsStore);
		newStore.readmes = readmes;
		_setUserStorage(newStore);
		_renderClear();
	});
}

module.exports = resolve(runCheck, {
	getUserStorage,
	setUserStorage,
	renderClear,
	fetchWelcome,
	fetchUsername,
	fetchEmail,
	fetchNpmSaveExact,
	fetchReadmes,
});
module.exports.runCheck = runCheck;
