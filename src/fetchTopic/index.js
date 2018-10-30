'use strict';
const chalk = require('chalk');
const inquirer = require('inquirer');
const open = require('opn');
const resolve = require('../resolve');
const getLabel = require('../getLabel');
const getCompleteObject = require('../getCompleteObject');
const renderClear = require('../renderClear');
const getUserStorage = require('../getUserStorage');

/**
 * @param {Object} sectionsObject - the sections object including selected key and index
 * @param {Object} topicObject - the topic object including index
 * @param {Function} originResolve - the origin resolve callback
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function fetchTopic(
	{ sections, sectionKey, sectionIndex },
	{ topicKey, topicIndex },
	originResolve,
	{ _inquirer, _process, _open, _renderClear, _getUserStorage, _console }
) {
	const store = _getUserStorage();
	const storeFiledName = `${sectionKey}/${topicKey}`;

	// prompt topic just in case contributer didn't read it yet
	if (
		store.readmes &&
		store.readmes[storeFiledName] &&
		store.readmes[storeFiledName].oldValue === JSON.stringify(sections[sectionKey].topics[topicKey])
	) {
		return new Promise(pResolve => {
			pResolve({});
		});
	}

	const prompt = pResolve => {
		_renderClear();
		const linksTitles = [];
		const linksValues = [];
		(sections[sectionKey].topics[topicKey].links || []).forEach(link => {
			const key = Object.keys(link)[0];
			linksTitles.push(getLabel('link', { label: key }));
			linksValues.push(link[key]);
		});
		const title = chalk.inverse.bold(`${sectionIndex + 1}.${topicIndex + 1}: ${topicKey}`);
		_console.log(`${title}\n\n${sections[sectionKey].topics[topicKey].text}`);
		_inquirer
			.prompt([
				{
					type: 'list',
					choices: linksTitles.concat(['Continue', 'Leave']),
					name: topicKey,
					message: 'Please select',
					default: 'Continue',
					prefix: '',
				},
			])
			.then(answers => {
				if (answers[topicKey] === 'Leave') {
					_process.exit();
				}
				const index = linksTitles.indexOf(answers[topicKey]);
				if (index >= 0) {
					_open(linksValues[index]);
					prompt(originResolve || pResolve);
					return;
				}

				(originResolve || pResolve)({
					[storeFiledName]: getCompleteObject(sections[sectionKey].topics[topicKey]),
				});
			});
	};

	if (originResolve) {
		return new Promise(pResolve => {
			pResolve({});
		});
	}

	return new Promise(prompt);
}

module.exports = resolve(fetchTopic, { inquirer, process, open, renderClear, getUserStorage, console });
module.exports.fetchTopic = fetchTopic;
