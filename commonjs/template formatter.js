'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = create_template_formatter;

var _helpers = require('./helpers');

var _closeBraces = require('./close braces');

var _closeBraces2 = _interopRequireDefault(_closeBraces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Takes a `template` where character placeholders
// are denoted by 'x'es (e.g. 'x (xxx) xxx-xx-xx').
//
// Returns a function which takes `value` characters
// and returns the `template` filled with those characters.
// If the `template` can only be partially filled
// then it is cut off.
//
// If `should_close_braces` is `true`,
// then it will also make sure all dangling braces are closed,
// e.g. "8 (8" -> "8 (8  )" (iPhone style phone number input).
//
function create_template_formatter(template) {
	var placeholder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
	var should_close_braces = arguments[2];

	if (!template) {
		return function (value) {
			return { text: value };
		};
	}

	var characters_in_template = (0, _helpers.count_occurences)(placeholder, template);

	return function (value) {
		if (!value) {
			return { text: '', template: template };
		}

		var value_character_index = 0;
		var filled_in_template = '';

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = (0, _getIterator3.default)(template), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var character = _step.value;

				if (character !== placeholder) {
					filled_in_template += character;
					continue;
				}

				filled_in_template += value[value_character_index];
				value_character_index++;

				// If the last available value character has been filled in,
				// then return the filled in template
				// (either trim the right part or retain it,
				//  if no more character placeholders in there)
				if (value_character_index === value.length) {
					// If there are more character placeholders
					// in the right part of the template
					// then simply trim it.
					if (value.length < characters_in_template) {
						break;
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		if (should_close_braces) {
			filled_in_template = (0, _closeBraces2.default)(filled_in_template, template);
		}

		return { text: filled_in_template, template: template };
	};
}
//# sourceMappingURL=template formatter.js.map