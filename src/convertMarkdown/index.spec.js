/* eslint quote-props: 0*/
const { stripMarkdownImage, stripMarkdownLink, convertMarkdown, extractLinksFromReadme } = require('./index');

describe('convertMarkdown', () => {
	it('convert', () => {
		const readmeFileData = `
# Title
## Topic Title
** Bold Title **
Text
[link label](url)
[link label]
# Title 2
## Topic 2 Title
		`;
		const res = convertMarkdown(readmeFileData);
		expect(typeof res.sections.Title).toBe('object');
		expect(typeof res.sections.Title.topics['Topic Title']).toBe('object');
		expect(res.sections.Title.topics['Topic Title'].links.length).toBe(1);
		expect(typeof res.sections['Title 2']).toBe('object');
		expect(typeof res.sections['Title 2'].topics['Topic 2 Title']).toBe('object');
	});

	it('title with image', () => {
		const readmeFileData = `
# Title [![build status](https://img.shields.io)](https://travis-ci.org)
## Topic Title
** Bold Title **
		`;
		const res = convertMarkdown(readmeFileData);
		expect(typeof res.sections.Title).toBe('object');
	});
	it('stripMarkdownImage', () => {
		expect(stripMarkdownImage('Title [![build status](https://img.shields.io)](https://travis-ci.org)')).toBe(
			'Title'
		);
		expect(
			stripMarkdownImage(
				'Title [![build status](https://img.shields.io)](https://travis-ci.org) [![build status](https://img.shields.io)](https://travis-ci.org)'
			)
		).toBe('Title');
		expect(
			stripMarkdownImage(`out updates in the documentation.

!kapture 2017-12-17 at 17 23 59

`)
		).toBe('out updates in the documentation.');
	});
	it('stripMarkdownLink', () => {
		expect(stripMarkdownLink('Title [build status](https://img.shields.io)')).toBe('Title');
		expect(
			stripMarkdownLink('Title [build status](https://img.shields.io) [build status](https://img.shields.io)')
		).toBe('Title');
	});
	it('extractLinksFromReadme', () => {
		expect(
			extractLinksFromReadme(`We using [eslint](https://github.com/eslint/eslint) with the [namics eslint-config](https://github.com/namics/eslint-config-namics).
`).links
		).toEqual([
			{ eslint: 'https://github.com/eslint/eslint' },
			{ 'namics eslint-config': 'https://github.com/namics/eslint-config-namics' },
		]);
		expect(
			extractLinksFromReadme(`[![coverage status](https://coveralls.io/repos/github/smollweide/contribute-buddy/badge.svg?branch=master)](https://coveralls.io/github/smollweide/contribute-buddy?branch=master)
[![npm](https://img.shields.io/npm/v/contribute-buddy.svg)](http://npm.im/contribute-buddy)
[![downloads](https://img.shields.io/npm/dm/contribute-buddy.svg)](https://npm-stat.com/charts.html?package=contribute-buddy)
[![MIT License](https://img.shields.io/npm/l/contribute-buddy.svg)](http://opensource.org/licenses/MIT)
[![Codestyle](https://img.shields.io/badge/codestyle-namics-green.svg)](https://github.com/namics/eslint-config-namics)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)`)
				.links
		).toEqual([
			{
				'coverage status':
					'https://coveralls.io/repos/github/smollweide/contribute-buddy/badge.svg?branch=master',
			},
			{ npm: 'https://img.shields.io/npm/v/contribute-buddy.svg' },
			{ downloads: 'https://img.shields.io/npm/dm/contribute-buddy.svg' },
			{ 'MIT License': 'https://img.shields.io/npm/l/contribute-buddy.svg' },
			{ Codestyle: 'https://img.shields.io/badge/codestyle-namics-green.svg' },
			{ 'Commitizen friendly': 'https://img.shields.io/badge/commitizen-friendly-brightgreen.svg' },
			{ 'styled with prettier': 'https://img.shields.io/badge/styled_with-prettier-ff69b4.svg' },
			{
				'semantic-release':
					'https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg',
			},
		]);
	});
});
