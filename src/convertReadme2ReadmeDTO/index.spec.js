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
		const result =
			'{"sections":{"Title":{"text":"","links":[],"topics":{"Topic Title":{"text":"** Bold Title **\\nText\\n\\u001b[4mlink label\\u001b[24m\\n[link label]","links":[{"link label":"url"}]}}},"Title 2":{"text":"","links":[],"topics":{"Topic 2 Title":{"text":"\\t\\t","links":[]}}}}}';
		expect(JSON.stringify(convertReadme2ReadmeDTO(readmeFileData))).toBe(result);
	});
});
