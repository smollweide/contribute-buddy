/* eslint quote-props: 0*/
const convertReadme2ReadmeDTO = require('./index');

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
});
