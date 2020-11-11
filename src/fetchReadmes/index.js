'use strict';
const resolve = require('../resolve');
const getReadmeFiles = require('../getReadmeFiles');
const fetchSections = require('../fetchSections');

/**
 * @param {Object} oldResults - the results object
 * @param {Object} di - dependency injection
 * @returns {void}
 **/
function fetchReadmes(oldResults, { _getReadmeFiles, _fetchSections }) {
	const readmeFilesDTOs = _getReadmeFiles();

	if (!readmeFilesDTOs || !readmeFilesDTOs.sections || Object.keys(readmeFilesDTOs.sections).length < 1) {
		return new Promise((pResolve) => {
			pResolve({});
		});
	}

	return new Promise((pResolve) => {
		_fetchSections(readmeFilesDTOs.sections).then((results) => {
			pResolve({ readmes: results });
		});
	});
}

module.exports = resolve(fetchReadmes, { getReadmeFiles, fetchSections });
module.exports.fetchReadmes = fetchReadmes;
