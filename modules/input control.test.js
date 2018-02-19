import { onChange, onCut, onPaste, onKeyDown } from './input control';

import { Keys } from './dom';

import templateParser from './template parser';
import templateFormatter from './template formatter';
import parseDigit from './parse digit';

// US phone number template
var TEMPLATE = '(xxx) xxx-xxxx';
var parse = templateParser(TEMPLATE, parseDigit);
var format = templateFormatter(TEMPLATE);

describe('input control', function () {
	it('should handle onChange', function () {
		var input = {
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 6,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onChange({}, input, parse, format, on_change);

		expect(input.value).to.equal('(123) 456-7');
		expect(input.selectionStart).to.equal(8);
		expect(value).to.equal('1234567');
	});

	it('should handle onCut', function (done) {
		var input = {
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 6,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onCut({}, input, parse, format, on_change);

		setTimeout(function () {
			expect(input.value).to.equal('(123) 456-7');
			expect(input.selectionStart).to.equal(8);
			expect(value).to.equal('1234567');
			done();
		}, 0);
	});

	it('should handle onPaste', function () {
		var input = {
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 5,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onPaste({}, input, parse, format, on_change);

		expect(input.value).to.equal('(123) 456-7');
		expect(input.selectionStart).to.equal(8);
		expect(value).to.equal('1234567');
	});

	it('should handle onPaste (with selection)', function () {
		var input = {
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 6,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onPaste({}, input, parse, format, on_change);

		expect(input.value).to.equal('(123) 457');
		expect(input.selectionStart).to.equal(8);
		expect(value).to.equal('123457');
	});

	it('should not handle onKeyDown', function () {
		var input = {
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 6,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onKeyDown({}, input, parse, format, on_change);

		expect(input.value).to.equal('1234567-');
		expect(input.selectionStart).to.equal(5);
		expect(value).to.be.undefined;
	});

	it('should handle onKeyDown (Delete)', function () {
		var input = {
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 5,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var event = {
			keyCode: Keys.Delete,
			preventDefault: function preventDefault() {}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onKeyDown(event, input, parse, format, on_change);

		expect(input.value).to.equal('(123) 457');
		expect(input.selectionStart).to.equal(8);
		expect(value).to.equal('123457');
	});

	it('should handle onKeyDown (Backspace)', function () {
		var input = {
			value: '1234567-',
			selectionStart: 5,
			selectionEnd: 5,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var event = {
			keyCode: Keys.Backspace,
			preventDefault: function preventDefault() {}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onKeyDown(event, input, parse, format, on_change);

		expect(input.value).to.equal('(123) 467');
		expect(input.selectionStart).to.equal(7);
		expect(value).to.equal('123467');
	});

	it('should handle onKeyDown (Backspace with selection)', function () {
		var input = {
			value: '1234567-',
			selectionStart: 4,
			selectionEnd: 6,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var event = {
			keyCode: Keys.Backspace,
			preventDefault: function preventDefault() {}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onKeyDown(event, input, parse, format, on_change);

		expect(input.value).to.equal('(123) 47');
		expect(input.selectionStart).to.equal(7);
		expect(value).to.equal('12347');
	});

	it('should handle onKeyDown (Delete with selection)', function () {
		var input = {
			value: '1234567-',
			selectionStart: 4,
			selectionEnd: 6,
			setSelectionRange: function setSelectionRange(position) {
				this.selectionStart = position;
			}
		};

		var event = {
			keyCode: Keys.Delete,
			preventDefault: function preventDefault() {}
		};

		var value = void 0;
		var on_change = function on_change(_) {
			return value = _;
		};

		onKeyDown(event, input, parse, format, on_change);

		expect(input.value).to.equal('(123) 47');
		expect(input.selectionStart).to.equal(7);
		expect(value).to.equal('12347');
	});
});
//# sourceMappingURL=input control.test.js.map