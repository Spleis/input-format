import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import _parse from './parse';

import { onChange, onCut, onPaste, onKeyDown } from './input control';

// Usage:
//
// <ReactInput
// 	value={this.state.phone}
// 	onChange={phone => this.setState({ phone })}
// 	parse={character => character}
// 	format={value => ({ text: value, template: 'xxxxxxxx' })}/>
//

var ReactInput = function (_React$Component) {
	_inherits(ReactInput, _React$Component);

	function ReactInput() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ReactInput);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactInput.__proto__ || _Object$getPrototypeOf(ReactInput)).call.apply(_ref, [this].concat(args))), _this), _this.storeInstance = function (instance) {
			_this.input = instance;
		}, _this.getInputElement = function () {
			return ReactDOM.findDOMNode(_this.input);
		}, _this.onChange = function (event) {
			var _this$props = _this.props,
			    parse = _this$props.parse,
			    format = _this$props.format;


			return onChange(event, _this.getInputElement(), parse, format, _this.props.onChange);
		}, _this.onPaste = function () {
			var _this$props2 = _this.props,
			    parse = _this$props2.parse,
			    format = _this$props2.format;


			return onPaste(event, _this.getInputElement(), parse, format, _this.props.onChange);
		}, _this.onCut = function () {
			var _this$props3 = _this.props,
			    parse = _this$props3.parse,
			    format = _this$props3.format;


			return onCut(event, _this.getInputElement(), parse, format, _this.props.onChange);
		}, _this.onBlur = function (event) {
			var _this$props4 = _this.props,
			    parse = _this$props4.parse,
			    onBlur = _this$props4.onBlur;

			// This `onBlur` interceptor is a workaround for `redux-form`,
			// so that it gets the right (parsed, not the formatted one)
			// `event.target.value` in its `onBlur` handler.

			if (onBlur) {
				var _event = _extends({}, event, {
					target: _extends({}, event.target, {
						value: _parse(_this.getInputElement().value, undefined, parse).value
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

			return onKeyDown(event, _this.getInputElement(), parse, format, _this.props.onChange);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ReactInput, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    value = _props.value,
			    parse = _props.parse,
			    format = _props.format,
			    inputComponent = _props.inputComponent,
			    rest = _objectWithoutProperties(_props, ['value', 'parse', 'format', 'inputComponent']);

			// Non-string `inputComponent`s would work in this case
			// but it would also introduce a caret reset bug:
			// the caret position would reset on each input.
			// The origins of this bug are unknown, they may be
			// somehow related to the `ref` property
			// being intercepted by React here.


			return React.createElement(inputComponent, _extends({}, rest, {
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
}(React.Component);

ReactInput.propTypes = {
	// Parses a single characher of `<input/>` text.
	parse: PropTypes.func.isRequired,

	// Formats `value` into `<input/>` text.
	format: PropTypes.func.isRequired,

	// Renders `<input/>` by default.
	// For some reason non-default `inputComponent`
	// will reset caret position.
	inputComponent: PropTypes.string.isRequired,

	// `<input/>` `type` attribute.
	type: PropTypes.string.isRequired,

	// Is parsed from <input/> text.
	value: PropTypes.string,

	// This handler is called each time `<input/>` text is changed.
	onChange: PropTypes.func.isRequired,

	// This `onBlur` interceptor is a workaround for `redux-form`,
	// so that it gets the parsed `value` in its `onBlur` handler,
	// not the formatted text.
	onBlur: PropTypes.func,

	// Passthrough
	onKeyDown: PropTypes.func
};
ReactInput.defaultProps = {
	// Renders `<input/>` by default.
	// For some reason non-default `inputComponent`
	// will reset caret position.
	inputComponent: 'input',

	// `<input/>` `type` attribute.
	type: 'text'
};
export default ReactInput;


function isEmpty(value) {
	return value === undefined || value === null;
}
//# sourceMappingURL=ReactInput.js.map