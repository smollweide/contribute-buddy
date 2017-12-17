'use strict';
const chalk = require('chalk');
const inquirer = require('inquirer');
const renderClear = require('../renderClear');
const resolve = require('../resolve');
const fetchTopics = require('../fetchTopics');
const getTopicsList = require('../getTopicsList');
const getCompleteObject = require('../getCompleteObject');
const getUserStorage = require('../getUserStorage');

/**
 * @param {Object} sectionsObject - the sections object including selected key and index
 * @param {Object} results - the pSeries results
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function fetchSection(
	{ sections, sectionKey, sectionIndex },
	results,
	{ _process, _inquirer, _renderClear, _fetchTopics, _getTopicsList, _getUserStorage, _console }
) {
	const store = _getUserStorage();

	// prompt section just in case contributer didn't read it yet
	if (
		store.readmes &&
		store.readmes[sectionKey] &&
		store.readmes[sectionKey].oldValue === JSON.stringify(sections[sectionKey])
	) {
		return new Promise(pResolve => {
			pResolve({});
		});
	}

	return new Promise(pResolve => {
		_renderClear();
		const title = chalk.inverse.bold(`${sectionIndex + 1}: ${sectionKey}`);
		_console.log(`${title}\n${sections[sectionKey].text}\n${_getTopicsList(sections[sectionKey], sectionIndex)}`);
		_inquirer
			.prompt([
				{
					type: 'list',
					choices: ['Continue', 'Leave'],
					name: sectionKey,
					message: 'Please select',
					default: 'Continue',
					prefix: '',
				},
			])
			.then(answers => {
				if (answers[sectionKey] !== 'Continue') {
					_process.exit();
				}
				_fetchTopics({ sections, sectionKey, sectionIndex })
					.then(topicsAnswers =>
						pResolve(
							Object.assign({ [sectionKey]: getCompleteObject(sections[sectionKey]) }, topicsAnswers)
						)
					)
					.catch(_process.exit);
			});
	});
}

module.exports = resolve(fetchSection, {
	process,
	inquirer,
	renderClear,
	fetchTopics,
	getTopicsList,
	getUserStorage,
	console,
});
module.exports.fetchSection = fetchSection;
