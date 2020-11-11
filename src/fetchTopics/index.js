'use strict';
const pSeries = require('p-series');
const resolve = require('../resolve');
const fetchTopic = require('../fetchTopic');

/**
 * @param {Object} sectionsObject - the sections object including selected key and index
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function fetchTopics({ sections, sectionKey, sectionIndex }, { _fetchTopic }) {
	return new Promise((pResolve) => {
		// in case of there are no topics in this section
		if (Object.keys(sections[sectionKey].topics).length <= 0) {
			pResolve({});
			return;
		}

		pSeries(
			Object.keys(sections[sectionKey].topics).map((topicKey, topicIndex) =>
				_fetchTopic.bind(null, { sections, sectionKey, sectionIndex }, { topicKey, topicIndex })
			)
		).then((topicsResults) => pResolve(Object.assign(...topicsResults)));
	});
}

module.exports = resolve(fetchTopics, { fetchTopic });
module.exports.fetchTopics = fetchTopics;
