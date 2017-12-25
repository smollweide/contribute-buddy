/* eslint quote-props: 0*/
const fs = require('fs');
const resolve = require('../resolve');
const { convertMarkdownTableToCli, calculateMaxCellsWidth } = require('./index');

const _process = {
	stdout: {
		columns: 50,
	},
};

describe('convertMarkdownTableToCli', () => {
	it('default', () => {
		const mock = fs.readFileSync('./src/convertMarkdownTableToCli/__mocks__/default.md', 'utf8');
		// const snapshot = fs.readFileSync('./src/convertMarkdownTableToCli/__snapshots__/default', 'utf8');
		const _convertMarkdownTableToCli = resolve(convertMarkdownTableToCli, {
			process: _process,
		});
		// fs.writeFileSync('./src/convertMarkdownTableToCli/__snapshots__/default', _convertMarkdownTableToCli(mock));
		expect(typeof _convertMarkdownTableToCli(mock)).toBe('string');
	});
	it('calculateMaxCellsWidth', () => {
		expect(calculateMaxCellsWidth([2, 8], 10)).toEqual([2, 8]);
		expect(calculateMaxCellsWidth([2, 12], 10)).toEqual([2, 8]);
		expect(calculateMaxCellsWidth([20, 12], 10)).toEqual([5, 5]);
		expect(calculateMaxCellsWidth([1, 100], 10)).toEqual([1, 9]);
		expect(calculateMaxCellsWidth([10, 10], 50)).toEqual([25, 25]);
		expect(calculateMaxCellsWidth([3, 10], 50)).toEqual([22, 28]);
	});
});
