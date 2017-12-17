const stringLength = require('string-length');
const resolve = require('../resolve');
const symbols = require('../symbols');
const getFilledArray = require('../getFilledArray');

const {
	topLeft,
	topRight,
	bottomLeft,
	bottomRight,
	separatorTop,
	separatorBottom,
	title,
	contentLeft,
	contentRight,
	msg,
} = symbols.code;

const fill = (length, value) => getFilledArray(length, value).join('');

const line = (width, start, _content, end) =>
	`${start}${fill(width - stringLength(start) - stringLength(end), _content)}${end}`;

const textRow = ({ row, width, num, newLine = false }) => {
	const preSymbol = contentLeft(newLine ? 0 : num);
	const postSymbol = contentRight;
	const newWidth = width - stringLength(`${preSymbol}  ${postSymbol}`);
	const rowLng = stringLength(row);

	if (rowLng > newWidth) {
		let out = [];
		out = out.concat(textRow({ row: `${row.slice(0, newWidth)}`, width, num, newLine }));
		out = out.concat(textRow({ row: `${row.slice(newWidth, rowLng)}`, width, num, newLine: true }));
		return out;
	}
	return [`${preSymbol}${msg(` ${row + fill(newWidth - rowLng, ' ')} `)}${postSymbol}`];
};

const text = ({ rows, width }) => {
	let out = [];
	rows.forEach((row, index) => {
		const result = textRow({ row, width, num: index + 1 });
		out = out.concat(result);
	});
	return out.join('\n');
};

/**
 * @param {string} markdown - the readme files data
 * @param {Object} di - dependency injection
 * @returns {string} markdown - replaced readme file data
 **/
function convertMarkdownCodeToCli(markdown, { _process }) {
	const reg = /(```)([a-zA-Z ]*)([^```]*)(```)/g;
	let results;
	const width = _process.stdout.columns;

	// eslint-disable-next-line
	while ((results = reg.exec(markdown)) !== null) {
		const _title = results[2].trim();
		const _text = results[3];
		const out = [''];

		// add title bar
		if (_title) {
			const topStart = `${topLeft}${title(_title)}`;
			const topEnd = `${topRight}`;
			out.push(line(width, topStart, separatorTop, topEnd));
		}

		// add empty line
		out.push(line(width, contentLeft(0), msg(' '), contentRight));

		// add content
		out.push(
			text({
				rows: _text.split('\n'),
				width,
			})
		);

		const bottomStart = `${bottomLeft}`;
		const bottomEnd = `${bottomRight}`;
		out.push(line(width, bottomStart, separatorBottom, bottomEnd));

		markdown = markdown.replace(results[0], out.join('\n'));
	}

	return markdown;
}

module.exports = resolve(convertMarkdownCodeToCli, { process });
module.exports.convertMarkdownCodeToCli = convertMarkdownCodeToCli;
module.exports.textRow = textRow;
