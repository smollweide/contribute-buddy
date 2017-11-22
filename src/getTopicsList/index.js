'use strict';
const getLabel = require('../getLabel');

/**
 * @param {Object} section - a section from readmeDTO
 * @param {number} sectionIndex - the array index of the section
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function getTopicsList(section, sectionIndex) {
	if (!section || !section.topics || Object.keys(section.topics).length < 1) {
		return '';
	}

	const out = [getLabel('section.topics.title', {})];

	Object.keys(section.topics).forEach((topicKey, topicIndex) => {
		out.push(`${sectionIndex + 1}.${topicIndex + 1} ${topicKey}`);
	});

	out.push('\n');

	return out.join('\n');
}

module.exports = getTopicsList;
