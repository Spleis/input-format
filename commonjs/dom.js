'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getSelection = getSelection;
exports.getOperation = getOperation;
exports.getCaretPosition = getCaretPosition;
exports.setCaretPosition = setCaretPosition;
// Gets <input/> selection bounds
function getSelection(element) {
	// If no selection, return nothing
	if (element.selectionStart === element.selectionEnd) {
		return;
	}

	return { start: element.selectionStart, end: element.selectionEnd };
}

// Key codes
var Keys = exports.Keys = {
	Backspace: 8,
	Delete: 46

	// Finds out the operation to be intercepted and performed
	// based on the key down event `keyCode`.
};function getOperation(event) {
	switch (event.keyCode) {
		case Keys.Backspace:
			return 'Backspace';

		case Keys.Delete:
			return 'Delete';
	}
}

// Gets <input/> caret position
function getCaretPosition(element) {
	return element.selectionStart;
}

// Sets <input/> caret position
function setCaretPosition(element, caret_position) {
	// Sanity check
	if (caret_position === undefined) {
		return;
	}

	// Set caret position
	element.setSelectionRange(caret_position, caret_position);
}
//# sourceMappingURL=dom.js.map