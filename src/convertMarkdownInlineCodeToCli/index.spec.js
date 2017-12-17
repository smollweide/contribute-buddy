/* eslint quote-props: 0*/
const fs = require('fs');
const convertMarkdownInlineCodeToCli = require('./index');

describe('convertMarkdownInlineCodeToCli', () => {
	it('default', () => {
		const data = fs.readFileSync('./src/convertMarkdownInlineCodeToCli/__mocks__/default.md', 'utf8');
		expect(typeof convertMarkdownInlineCodeToCli(data)).toBe('string');
	});
});
