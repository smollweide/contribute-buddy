/* eslint quote-props: 0*/
const fs = require('fs');
const resolve = require('../resolve');
const { convertMarkdownCodeToCli, textRow } = require('./index');

const _process = {
	stdout: {
		columns: 50,
	},
};

describe('convertMarkdownCodeToCli', () => {
	it('default', () => {
		const data = fs.readFileSync('./src/convertMarkdownCodeToCli/__mocks__/default.md', 'utf8');
		const _convertMarkdownCodeToCli = resolve(convertMarkdownCodeToCli, { process: _process });
		// fs.writeFileSync('./src/convertMarkdownCodeToCli/__mocks__/default2.md', _convertMarkdownCodeToCli(data));
		expect(typeof _convertMarkdownCodeToCli(data)).toBe('string');
	});
	it('no title', () => {
		const data = fs.readFileSync('./src/convertMarkdownCodeToCli/__mocks__/no-title.md', 'utf8');
		const _convertMarkdownCodeToCli = resolve(convertMarkdownCodeToCli, { process: _process });
		// fs.writeFileSync('./src/convertMarkdownCodeToCli/__mocks__/default2.md', _convertMarkdownCodeToCli(data));
		expect(typeof _convertMarkdownCodeToCli(data)).toBe('string');
	});
	it('textRow', () => {
		expect(
			Array.isArray(
				textRow({
					row: '0123456789012345678901234567890123456789',
					width: 21,
					num: 1,
				})
			)
		).toBe(true);
	});
	it('textRow escaped', () => {
		// prettier-ignore
		// eslint-disable-next-line
		const row = '01234\"';
		expect(
			Array.isArray(
				textRow({
					row,
					width: 14,
					num: 1,
				})
			)
		).toBe(true);
	});
});
