const resolve = require('../resolve');
const { getLabel } = require('./index');

const getConfig = () => ({
	labels: {
		'label.a': 'Label A',
		'label.b': 'Label B ({test})',
	},
});

describe('getLabel', () => {
	it('default', () => {
		const _getLabel = resolve(getLabel, { getConfig });
		expect(_getLabel('label.a', {})).toBe('Label A');
	});
	it('with placeholder', () => {
		const _getLabel = resolve(getLabel, { getConfig });
		expect(_getLabel('label.b', { test: 'placeholder' })).toBe('Label B (placeholder)');
	});
	it("key don' exist in config", () => {
		const _getLabel = resolve(getLabel, { getConfig });
		expect(_getLabel('label.c', {})).toBe('Label with key "label.c" not found!');
	});
});
