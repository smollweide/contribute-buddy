const resolve = require('../resolve');
const symbols = require('../symbols');

/**
 * @param {string} markdown - the readme files data
 * @param {Object} di - dependency injection
 * @returns {string} markdown - replaced readme file data
 **/
function convertMarkdownBoldToCli(markdown, { _msg }) {
	// eslint-disable-next-line
	const reg = /(\*{2})([^\*]*)(\*{2})/g;
	let results;

	// eslint-disable-next-line
	while ((results = reg.exec(markdown)) !== null) {
		markdown = markdown.replace(results[0], _msg(results[2]));
	}

	return markdown;
}

module.exports = resolve(convertMarkdownBoldToCli, { msg: symbols.bold.msg });
module.exports.convertMarkdownBoldToCli = convertMarkdownBoldToCli;
