const program = require('commander');
const resolve = require('../resolve');
const { _runCommander } = require('./index');

const packageData = {
	version: '1.0.0',
};

describe('commander', () => {
	it('init', (done) => {
		resolve(_runCommander, {
			program,
			process: { argv: ['/usr/local/bin/node', '/Users/smollweide/projects/contribute-buddy/src', 'init'] },
			packageData,
		})(
			() => done(),
			() => {}
		);
	});
	it('run', (done) => {
		resolve(_runCommander, {
			program,
			process: { argv: ['/usr/local/bin/node', '/Users/smollweide/projects/contribute-buddy/src', 'run'] },
			packageData,
		})(
			() => {},
			() => done()
		);
	});
});
