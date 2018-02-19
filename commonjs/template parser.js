'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = create_template_parser;

var _helpers = require('./helpers');

function create_template_parser(template, placeholder, parse) {
	if (typeof placeholder === 'function') {
		parse = placeholder;
		placeholder = 'x';
	}

	var max_characters = (0, _helpers.count_occurences)(placeholder, template);

	return function parse_character(character, value) {
		if (value.length >= max_characters) {
			return;
		}

		return parse(character, value);
	};
}
//# sourceMappingURL=template parser.js.map