/* eslint quote-props: 0*/
const resolve = require('../resolve');
const { runCheck } = require('./index');

const getUserStorage = () => ({
	username: 'c-b',
	readmes: {
		'Contribute buddy': {
			completed: true,
			date: 'Tue Nov 21 2017 19:05:07 GMT+0100 (CET)',
			oldValue:
				'{"text":"\\n> Contribute buddy helps your contributors to understand your project. It makes sure the contributor have read everything which is important. It uses the readme files in your project to collect a CLI UI guided tour through it. In case of an readme had changed or an new one was added every contributor will be informed about it.\\n","links":[],"topics":{"Install":{"text":"\\n```\\n$ npm install contribute-buddy\\n```\\n","links":[]},"Usage":{"text":"","links":[]}}}',
		},
		'Contribute buddy/Install': {
			completed: true,
			date: 'Tue Nov 21 2017 19:05:07 GMT+0100 (CET)',
			oldValue: '{"text":"\\n```\\n$ npm install contribute-buddy\\n```\\n","links":[]}',
		},
	},
});
const renderClear = () => {};
const fetchUsername = () => new Promise((pResolve) => pResolve({ username: 'username' }));
const fetchEmail = () => new Promise((pResolve) => pResolve({ email: 'email' }));
const fetchNpmSaveExact = () => new Promise((pResolve) => pResolve({ npmSaveExact: 'true' }));
const fetchReadmes = () => new Promise((pResolve) => pResolve({ readmes: {} }));
const fetchComplete = () => Promise.resolve();
const fetchWelcome = () => Promise.resolve();

describe('runCheck', () => {
	it('default', (done) => {
		const _runCheck = resolve(runCheck, {
			getUserStorage,
			setUserStorage(store) {
				expect(store).toEqual({
					username: 'username',
					email: 'email',
					npmSaveExact: 'true',
					readmes: {
						'Contribute buddy': {
							completed: true,
							date: 'Tue Nov 21 2017 19:05:07 GMT+0100 (CET)',
							oldValue:
								'{"text":"\\n> Contribute buddy helps your contributors to understand your project. It makes sure the contributor have read everything which is important. It uses the readme files in your project to collect a CLI UI guided tour through it. In case of an readme had changed or an new one was added every contributor will be informed about it.\\n","links":[],"topics":{"Install":{"text":"\\n```\\n$ npm install contribute-buddy\\n```\\n","links":[]},"Usage":{"text":"","links":[]}}}',
						},
						'Contribute buddy/Install': {
							completed: true,
							date: 'Tue Nov 21 2017 19:05:07 GMT+0100 (CET)',
							oldValue: '{"text":"\\n```\\n$ npm install contribute-buddy\\n```\\n","links":[]}',
						},
					},
				});
				done();
			},
			renderClear,
			fetchUsername,
			fetchEmail,
			fetchNpmSaveExact,
			fetchWelcome,
			fetchReadmes,
			fetchComplete,
		});
		_runCheck();
	});
	it('add readmes', (done) => {
		const _runCheck = resolve(runCheck, {
			getUserStorage: () => ({
				username: 'c-b',
				readmes: {},
			}),
			setUserStorage(store) {
				expect(store).toEqual({
					username: 'username',
					email: 'email',
					npmSaveExact: 'true',
					readmes: {
						'Contribute buddy': {
							completed: true,
							date: 'Tue Nov 21 2017 19:05:07 GMT+0100 (CET)',
							oldValue:
								'{"text":"\\n> Contribute buddy helps your contributors to understand your project. It makes sure the contributor have read everything which is important. It uses the readme files in your project to collect a CLI UI guided tour through it. In case of an readme had changed or an new one was added every contributor will be informed about it.\\n","links":[],"topics":{"Install":{"text":"\\n```\\n$ npm install contribute-buddy\\n```\\n","links":[]},"Usage":{"text":"","links":[]}}}',
						},
						'Contribute buddy/Install': {
							completed: true,
							date: 'Tue Nov 21 2017 19:05:07 GMT+0100 (CET)',
							oldValue: '{"text":"\\n```\\n$ npm install contribute-buddy\\n```\\n","links":[]}',
						},
					},
				});
				done();
			},
			renderClear,
			fetchUsername,
			fetchEmail,
			fetchNpmSaveExact,
			fetchWelcome,
			fetchReadmes: () =>
				new Promise((pResolve) =>
					pResolve({
						readmes: {
							'Contribute buddy': {
								completed: true,
								date: 'Tue Nov 21 2017 19:05:07 GMT+0100 (CET)',
								oldValue:
									'{"text":"\\n> Contribute buddy helps your contributors to understand your project. It makes sure the contributor have read everything which is important. It uses the readme files in your project to collect a CLI UI guided tour through it. In case of an readme had changed or an new one was added every contributor will be informed about it.\\n","links":[],"topics":{"Install":{"text":"\\n```\\n$ npm install contribute-buddy\\n```\\n","links":[]},"Usage":{"text":"","links":[]}}}',
							},
							'Contribute buddy/Install': {
								completed: true,
								date: 'Tue Nov 21 2017 19:05:07 GMT+0100 (CET)',
								oldValue: '{"text":"\\n```\\n$ npm install contribute-buddy\\n```\\n","links":[]}',
							},
						},
					})
				),
			fetchComplete,
		});
		_runCheck();
	});
	it('fetch complete', (done) => {
		const _runCheck = resolve(runCheck, {
			getUserStorage,
			setUserStorage() {},
			renderClear,
			fetchUsername,
			fetchEmail,
			fetchNpmSaveExact,
			fetchReadmes,
			fetchWelcome,
			fetchComplete() {
				done();
			},
		});
		_runCheck();
	});
});
