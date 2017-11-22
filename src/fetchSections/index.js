'use strict';
const pSeries = require('p-series');
const resolve = require('../resolve');
const fetchSection = require('../fetchSection');

/**
 * @param {Object} sections - the sections object
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function fetchSections(sections, { _fetchSection }) {
	return new Promise(pResolve => {
		pSeries(
			Object.keys(sections).map((sectionKey, sectionIndex) =>
				_fetchSection.bind(null, { sections, sectionKey, sectionIndex })
			)
		).then(sectionsResults => pResolve(Object.assign(...sectionsResults)));
	});
}

module.exports = resolve(fetchSections, { fetchSection });
module.exports.fetchSections = fetchSections;
