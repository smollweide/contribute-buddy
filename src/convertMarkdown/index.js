'use strict';
const chalk = require('chalk');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const resolve = require('../resolve');
/*
readmeData

# Title
## Topic Title
** Bold Title **
Text
[link label](url)
# Title 2
## Topic 2 Title
*/

// ----- to -----
// const readmeDTO = {
// 	sections: {
// 		"Title": {
// 			name: 'Title',
// 			topics: {
// 				'Topic Title': {
// 					name: 'Topic Title',
// 					text: '<bold>Bold Title</bold>\nText <underlined>link lable</underlined>',
// 					links: [{ 'link label': 'url' }],
// 				},
// 			},
// 		},
// 		'Title 2': {
// 			name: 'Title 2',
// 			topics: {
// 				'Topic Title 2': {
// 					name: 'Topic Title 2',
// 					text: '',
// 					links: [],
// 				},
// 			},
// 		},
// 	},
// };

const stripMarkdownSimpleImage = data => {
	// prettier-ignore
	// eslint-disable-next-line
	return data.replace(/![^\n]*/g, '').trim();
};

const stripMarkdownImage = data => {
	// prettier-ignore
	// eslint-disable-next-line
	return stripMarkdownSimpleImage(data.replace(/\[!\[[^\]]*\]\([^\)]*\)\]\([^\)]*\)/g, '').trim());
};

const stripMarkdownLink = data => {
	// prettier-ignore
	// eslint-disable-next-line
	return data.replace(/\[[^\]]*\]\([^\)]*\)/g, '').trim();
};

const getNameFromReadme = data => {
	const spl = data.split('\n');
	return stripMarkdownLink(stripMarkdownImage(spl[0].trim()));
};
const getTextFromReadme = data => {
	const spl = data.split('\n');
	if (spl.length < 2) {
		return '';
	}
	return spl.slice(1, spl.length).join('\n');
};
const extractLinksFromReadme = readmeData => {
	// eslint-disable-next-line
	const reg = /\[([^\]]*)\]\(([^\)]*)\)/g;
	let results;
	let text = readmeData;
	const links = [];

	// eslint-disable-next-line
	while ((results = reg.exec(readmeData)) !== null) {
		links.push({ [results[1].replace(/^!\[/g, '')]: results[2] });
		// eslint-disable-next-line
		text = text.replace(`[${results[1]}](${results[2]})`, chalk.underline(results[1]));
	}

	marked.setOptions({
		// Define custom renderer
		renderer: new TerminalRenderer(),
	});
	return {
		text: marked(stripMarkdownImage(text)),
		links,
	};
};

const getTopicDTOFromReadme = topic => {
	return {
		[getNameFromReadme(topic)]: extractLinksFromReadme(getTextFromReadme(topic)),
	};
};

const getTopicDTOsFromReadme = topics => {
	const out = {};
	topics.forEach(topic => {
		Object.assign(out, getTopicDTOFromReadme(topic));
	});
	return out;
};

/**
 * @param {string} readmeData - the readme files data
 * @param {Object} di - dependency injection
 * @returns {Object} config - returns the contributebuddy config
 **/
function convertMarkdown(readmeData) {
	const sections = readmeData.split('\n# ');
	const out = { sections: {} };
	sections.forEach(section => {
		if (section === '') {
			return;
		}
		const topcisSpl = section.split('\n## ');
		out.sections[getNameFromReadme(topcisSpl[0])] = Object.assign(
			extractLinksFromReadme(getTextFromReadme(topcisSpl[0])),
			{
				topics: getTopicDTOsFromReadme(topcisSpl.slice(1, topcisSpl.length)),
			}
		);
	});
	return out;
}

module.exports = resolve(convertMarkdown, {});
module.exports.convertMarkdown = convertMarkdown;
module.exports.stripMarkdownImage = stripMarkdownImage;
module.exports.stripMarkdownLink = stripMarkdownLink;
module.exports.extractLinksFromReadme = extractLinksFromReadme;
