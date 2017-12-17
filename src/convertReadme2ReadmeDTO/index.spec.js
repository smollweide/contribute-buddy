/* eslint quote-props: 0*/
const { stripMarkdownImage, stripMarkdownLink, convertReadme2ReadmeDTO } = require('./index');

describe('convertReadme2ReadmeDTO', () => {
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
		const res = convertReadme2ReadmeDTO(readmeFileData);
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
		const res = convertReadme2ReadmeDTO(readmeFileData);
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
	});
	it('stripMarkdownLink', () => {
		expect(stripMarkdownLink('Title [build status](https://img.shields.io)')).toBe('Title');
		expect(
			stripMarkdownLink('Title [build status](https://img.shields.io) [build status](https://img.shields.io)')
		).toBe('Title');
	});
});
