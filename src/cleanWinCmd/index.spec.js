/* eslint-disable */
const cleanWinCmd = require('./index');

describe('cleanWinCmd', () => {
	it('replace value', () => {
		expect(cleanWinCmd('path/asas')).toBe('path/asas');
		// todo '\path/asas' disable prettier
		expect(cleanWinCmd('path/asas')).toBe('path/asas');
	});
});
