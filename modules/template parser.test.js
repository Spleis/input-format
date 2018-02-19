import { expect } from 'chai';

import template_parser from '../source/template parser';

describe('template parser', function () {
	it('should parse a phone number', function () {
		var parse = template_parser('x (xxx) xxx-xx-xx', function (character, value) {
			if (character >= '0' && character <= '9') {
				return character;
			}
		});

		expect(parse('', '')).to.be.undefined;
		expect(parse('a', '')).to.be.undefined;
		expect(parse('5', '8800555353')).to.equal('5');
		expect(parse('5', '88005553535')).to.be.undefined;
	});

	it('should accept placeholder parameter', function () {
		var parse = template_parser('A (AAA) AAA-AA-AA', 'A', function (character, value) {
			if (character >= '0' && character <= '9') {
				return character;
			}
		});

		expect(parse('5', '8800555353')).to.equal('5');
		expect(parse('5', '88005553535')).to.be.undefined;
	});
});
//# sourceMappingURL=template parser.test.js.map