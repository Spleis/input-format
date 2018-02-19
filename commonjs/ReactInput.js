'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _parse2 = require('./parse');

var _parse3 = _interopRequireDefault(_parse2);

var _inputControl = require('./input control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Usage:
//
// <ReactInput
// 	value={this.state.phone}
// 	onChange={phone => this.setState({ phone })}
// 	parse={character => character}
// 	format={value => ({ text: value, template: 'xxxxxxxx' })}/>
//
var ReactInput = function (_React$Component) {
	(0, _inherits3.default)(ReactInput, _React$Component);

	function ReactInput() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, ReactInput);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ReactInput.__proto__ || (0, _getPrototypeOf2.default)(ReactInput)).call.apply(_ref, [this].concat(args))), _this), _this.storeInstance = function (instance) {
			_this.input = instance;
		}, _this.getInputElement = function () {
			return _reactDom2.default.findDOMNode(_this.input);
		}, _this.onChange = function (event) {
			var _this$props = _this.props,
			    parse = _this$props.parse,
			    format = _this$props.format;


			return (0, _inputControl.onChange)(event, _this.getInputElement(), parse, format, _this.props.onChange);
		}, _this.onPaste = function () {
			var _this$props2 = _this.props,
			    parse = _this$props2.parse,
			    format = _this$props2.format;


			return (0, _inputControl.onPaste)(event, _this.getInputElement(), parse, format, _this.props.onChange);
		}, _this.onCut = function () {
			var _this$props3 = _this.props,
			    parse = _this$props3.parse,
			    format = _this$props3.format;


			return (0, _inputControl.onCut)(event, _this.getInputElement(), parse, format, _this.props.onChange);
		}, _this.onBlur = function (event) {
			var _this$props4 = _this.props,
			    parse = _this$props4.parse,
			    onBlur = _this$props4.onBlur;

			// This `onBlur` interceptor is a workaround for `redux-form`,
			// so that it gets the right (parsed, not the formatted one)
			// `event.target.value` in its `onBlur` handler.

			if (onBlur) {
				var _event = (0, _extends3.default)({}, event, {
					target: (0, _extends3.default)({}, event.target, {
						value: (0, _parse3.default)(_this.getInputElement().value, undefined, parse).value
					})

					// For `redux-form` event detection.
					// https://github.com/erikras/redux-form/blob/v5/src/events/isEvent.js
				});_event.stopPropagation = event.stopPropagation;
				_event.preventDefault = event.preventDefault;

				onBlur(_event);
			}
		}, _this.onKeyDown = function (event) {
			var _this$props5 = _this.props,
			    parse = _this$props5.parse,
			    format = _this$props5.format;


			if (_this.props.onKeyDown) {
				_this.props.onKeyDown(event);
			}

			return (0, _inputControl.onKeyDown)(event, _this.getInputElement(), parse, format, _this.props.onChange);
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(ReactInput, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    value = _props.value,
			    parse = _props.parse,
			    format = _props.format,
			    inputComponent = _props.inputComponent,
			    rest = (0, _objectWithoutProperties3.default)(_props, ['value', 'parse', 'format', 'inputComponent']);

			// Non-string `inputComponent`s would work in this case
			// but it would also introduce a caret reset bug:
			// the caret position would reset on each input.
			// The origins of this bug are unknown, they may be
			// somehow related to the `ref` property
			// being intercepted by React here.

			return _react2.default.createElement(inputComponent, (0, _extends3.default)({}, rest, {
				ref: this.storeInstance,
				value: format(isEmpty(value) ? '' : value).text,
				onKeyDown: this.onKeyDown,
				onChange: this.onChange,
				onPaste: this.onPaste,
				onCut: this.onCut,
				onBlur: this.onBlur
			}));
		}

		/**
   * Returns `<input/>` DOM Element.
   * @return {DOMElement}
   */


		// This handler is a workaround for `redux-form`.

	}, {
		key: 'focus',


		/**
   * Focuses the `<input/>`.
   * Can be called manually.
   */
		value: function focus() {
			this.getInputElement().focus();
		}
	}]);
	return ReactInput;
}(_react2.default.Component);

ReactInput.propTypes = {
	// Parses a single characher of `<input/>` text.
	parse: _propTypes2.default.func.isRequired,

	// Formats `value` into `<input/>` text.
	format: _propTypes2.default.func.isRequired,

	// Renders `<input/>` by default.
	// For some reason non-default `inputComponent`
	// will reset caret position.
	inputComponent: _propTypes2.default.string.isRequired,

	// `<input/>` `type` attribute.
	type: _propTypes2.default.string.isRequired,

	// Is parsed from <input/> text.
	value: _propTypes2.default.string,

	// This handler is called each time `<input/>` text is changed.
	onChange: _propTypes2.default.func.isRequired,

	// This `onBlur` interceptor is a workaround for `redux-form`,
	// so that it gets the parsed `value` in its `onBlur` handler,
	// not the formatted text.
	onBlur: _propTypes2.default.func,

	// Passthrough
	onKeyDown: _propTypes2.default.func
};
ReactInput.defaultProps = {
	// Renders `<input/>` by default.
	// For some reason non-default `inputComponent`
	// will reset caret position.
	inputComponent: 'input',

	// `<input/>` `type` attribute.
	type: 'text'
};
exports.default = ReactInput;


function isEmpty(value) {
	return value === undefined || value === null;
}
//# sourceMappingURL=ReactInput.js.map