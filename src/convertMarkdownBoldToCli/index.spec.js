/* eslint quote-props: 0*/
const fs = require('fs');
const resolve = require('../resolve');
const { convertMarkdownBoldToCli } = require('./index');

describe('convertMarkdownBoldToCli', () => {
	it('default', () => {
		const mock = fs.readFileSync('./src/convertMarkdownBoldToCli/__mocks__/default.md', 'utf8');
		const snapshot = fs.readFileSync('./src/convertMarkdownBoldToCli/__snapshots__/default', 'utf8');
		const _convertMarkdownBoldToCli = resolve(convertMarkdownBoldToCli, {
			msg: text => `<b>${text}</b>`,
		});
		// fs.writeFileSync('./src/convertMarkdownBoldToCli/__snapshots__/default', _convertMarkdownBoldToCli(mock));
		expect(_convertMarkdownBoldToCli(mock)).toBe(snapshot);
	});
});
