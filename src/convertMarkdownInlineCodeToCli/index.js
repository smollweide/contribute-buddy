const symbols = require('../symbols');

/**
 * @param {string} markdown - the readme files data
 * @param {Object} di - dependency injection
 * @returns {string} markdown - replaced readme file data
 **/
function convertMarkdownInlineCodeToCli(markdown) {
	const reg = /(`)([^`]*)(`)/g;
	let results;

	// eslint-disable-next-line
	while ((results = reg.exec(markdown)) !== null) {
		if (results[0] !== '``' && results[0].indexOf('\n') < 0) {
			markdown = markdown.replace(results[0], symbols.codeInline.msg(results[2]));
		}
	}

	return markdown;
}

module.exports = convertMarkdownInlineCodeToCli;
