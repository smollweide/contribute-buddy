const resolve = require('../resolve');
const symbols = require('../symbols');
const getFilledArray = require('../getFilledArray');
const stringLength = require('string-length');

const calculateMaxCellsWidth = (colsMaxWidth, maxWidth) => {
	let maxWidthCols = 0;
	colsMaxWidth.forEach(width => (maxWidthCols += width));

	// if enough space is available
	if (maxWidthCols <= maxWidth) {
		// fill array with still available space
		let currentIndex = 0;
		getFilledArray(maxWidth - maxWidthCols, '').forEach(() => {
			colsMaxWidth[currentIndex] += 1;

			currentIndex += 1;
			if (currentIndex >= colsMaxWidth.length) {
				currentIndex = 0;
			}
		});
		return colsMaxWidth;
	}

	const out = getFilledArray(colsMaxWidth.length, 0);
	let counterAlreadyUsed = 0;

	// share available space on cols
	getFilledArray(maxWidth, '').forEach(() => {
		out.forEach((item, index) => {
			if (out[index] < colsMaxWidth[index] && counterAlreadyUsed < maxWidth) {
				counterAlreadyUsed += 1;
				out[index] += 1;
			}
		});
	});
	return out;
};

const getTablesArray = markdown => {
	// eslint-disable-next-line
	const reg = /\|.*/g;
	let results;
	const resultsArr = [];
	const tables = [];
	let currentTableIndex = -1;

	// eslint-disable-next-line
	while ((results = reg.exec(markdown)) !== null) {
		resultsArr.push({
			line: results[0],
			isSeparator: Boolean(results[0].indexOf('---') > 0),
			index: results.index,
		});
	}

	/* eslint complexity: 0*/
	resultsArr.forEach(({ line, index, isSeparator }, resultsArrIndex) => {
		let isFirstLine = false;

		// create new table if second line is separator
		if (resultsArr[resultsArrIndex + 1] && resultsArr[resultsArrIndex + 1].isSeparator) {
			currentTableIndex += 1;
			isFirstLine = true;
			tables.push({ maxCellsWidht: [], headerRows: [], bodyRows: [], startIndex: index });
		}

		const table = tables[currentTableIndex];

		// detect if last line
		if (
			resultsArrIndex + 1 === resultsArr.length ||
			(resultsArr[resultsArrIndex + 2] && resultsArr[resultsArrIndex + 2].isSeparator)
		) {
			table.endIndex = index + resultsArr[resultsArrIndex].line.length;
		}

		if (isSeparator) {
			return;
		}

		const rows = isFirstLine ? table.headerRows : table.bodyRows;
		rows.push({
			line,
			index,
			cells: [],
		});

		const cells = line.split('|');

		// pase cells
		cells.forEach((cellValue, cellIndex) => {
			if (cellIndex === 0 || cellIndex === cells.length - 1) {
				return;
			}

			// create new maxLength array item
			if (table.maxCellsWidht[cellIndex - 1] === undefined) {
				table.maxCellsWidht.push(0);
			}
			cellValue = cellValue.trim();
			rows[rows.length - 1].cells.push(cellValue);

			// push max length
			if (cellValue.length > table.maxCellsWidht[cellIndex - 1]) {
				table.maxCellsWidht[cellIndex - 1] = cellValue.length;
			}
		});
	});

	return tables;
};

const roundUp = value => {
	if (value.toString().indexOf('.') < 0) {
		return value;
	}
	return Math.floor(value) + 1;
};

class Row {
	constructor(cells, calcMaxCellsWidth, symbolsObj) {
		this.cells = cells;
		this.calcMaxCellsWidth = calcMaxCellsWidth;
		this.symbols = symbolsObj;
	}

	get lines() {
		const lines = getFilledArray(this.linesCount, '');
		const availableSpaces = [].concat(this.calcMaxCellsWidth);
		const alradyFilled = getFilledArray(this.calcMaxCellsWidth.length, 0);

		lines.forEach((_, lineIndex) => {
			const line = [];
			this.cells.forEach((cell, cellIndex) => {
				const availableSpace = availableSpaces[cellIndex];
				const sliced = cell.slice(alradyFilled[cellIndex], availableSpace * (lineIndex + 1));
				line.push(
					this.symbols.cell(sliced + getFilledArray(availableSpace - stringLength(sliced), ' ').join(''))
				);
				alradyFilled[cellIndex] = alradyFilled[cellIndex] + availableSpace;
			});
			lines[lineIndex] = `${this.symbols.left}${line.join(this.symbols.vSeparator)}${this.symbols.right}`;
		});

		return lines.join('\n');
	}

	get linesCount() {
		const availableSpaces = this.calcMaxCellsWidth;
		let max = 0;
		this.cells.forEach((cell, index) => {
			const count = roundUp(cell.length / availableSpaces[index]);
			if (count > max) {
				max = count;
			}
		});
		return max;
	}
}

class RowSeparator {
	constructor(calcMaxCellsWidth, width, symbolsObj) {
		this.calcMaxCellsWidth = calcMaxCellsWidth;
		this.symbols = symbolsObj;
		this.width = width;
	}

	get innerWidth() {
		return this.width - stringLength(this.symbols.left) - stringLength(this.symbols.right);
	}

	get separator() {
		return `${this.symbols.left}${getFilledArray(this.innerWidth, this.symbols.cell).join('')}${
			this.symbols.right
		}`;
	}
}

/* eslint require-jsdoc: 0*/
class ConvertMarkdownTable {
	constructor(table, width) {
		this.table = table;
		this.width = width;
		this.maxCellsWidht = table.maxCellsWidht;
		this.calcMaxCellsWidth = calculateMaxCellsWidth(this.maxCellsWidht, this.width - this.rowSymbolsWidth);
		this.lines = [];

		const rowTop = new RowSeparator(this.calcMaxCellsWidth, this.width, this.symbolsTop);
		this.lines.push(rowTop.separator);

		this.table.headerRows.forEach(({ cells }) => {
			const row = new Row(cells, this.calcMaxCellsWidth, this.symbolsHeader);
			this.lines.push(row.lines);
		});
		this.table.bodyRows.forEach(({ cells }) => {
			const rowSerarator = new RowSeparator(this.calcMaxCellsWidth, this.width, this.symbolsSeparator);
			this.lines.push(rowSerarator.separator);

			const row = new Row(cells, this.calcMaxCellsWidth, this.symbolsBody);
			this.lines.push(row.lines);
		});

		const rowBottom = new RowSeparator(this.calcMaxCellsWidth, this.width, this.symbolsBottom);
		this.lines.push(rowBottom.separator);
	}

	get cliTable() {
		return `${this.lines.join('\n')}`;
	}

	get rowSymbolsWidth() {
		const { left, cell, right, vSeparator } = this.symbolsHeader;
		return (
			stringLength(left) +
			stringLength(right) +
			stringLength(cell('')) * this.maxCellsWidht.length +
			stringLength(vSeparator) * (this.maxCellsWidht.length - 1)
		);
	}

	get symbolsHeader() {
		return {
			left: symbols.table.headerStart,
			cell: symbols.table.headerCell,
			right: symbols.table.headerEnd,
			vSeparator: symbols.table.headerVSeparator,
		};
	}

	get symbolsBody() {
		return {
			left: symbols.table.bodyStart,
			cell: symbols.table.bodyCell,
			right: symbols.table.bodyEnd,
			vSeparator: symbols.table.bodyVSeparator,
		};
	}

	get symbolsTop() {
		return {
			left: symbols.table.topStart,
			cell: symbols.table.topCell,
			right: symbols.table.topEnd,
		};
	}

	get symbolsBottom() {
		return {
			left: symbols.table.bottomStart,
			cell: symbols.table.bottomCell,
			right: symbols.table.bottomEnd,
		};
	}

	get symbolsSeparator() {
		return {
			left: symbols.table.hSeparatorStart,
			cell: symbols.table.hSeparatorCell,
			right: symbols.table.hSeparatorEnd,
		};
	}
}

/**
 * @param {string} markdown - the readme files data
 * @param {Object} di - dependency injection
 * @returns {string} markdown - replaced readme file data
 **/
function convertMarkdownTableToCli(markdown, { _process }) {
	const tables = getTablesArray(markdown);
	const originMarkdown = `${markdown}`;
	const width = _process.stdout.columns;

	tables.forEach(table => {
		const convertedTable = new ConvertMarkdownTable(table, width);
		markdown = markdown.replace(
			originMarkdown.substring(table.startIndex, table.endIndex),
			convertedTable.cliTable
		);
	});
	return markdown;
}

module.exports = resolve(convertMarkdownTableToCli, { process });
module.exports.convertMarkdownTableToCli = convertMarkdownTableToCli;
module.exports.calculateMaxCellsWidth = calculateMaxCellsWidth;
