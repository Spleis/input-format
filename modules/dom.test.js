import { expect } from 'chai';
import { spy } from 'sinon';

import { getCaretPosition, setCaretPosition, getSelection, getOperation } from '../source/dom';

describe('DOM', function () {
	it('should get caret position', function () {
		expect(getCaretPosition({ selectionStart: 1 })).to.equal(1);
	});

	it('should set caret position', function () {
		var setSelectionRange = spy();

		setCaretPosition({ setSelectionRange: setSelectionRange }, 1);
		expect(setSelectionRange.callCount).to.equal(1);
		expect(setSelectionRange.getCall(0).args).to.deep.equal([1, 1]);

		setCaretPosition({ setSelectionRange: setSelectionRange });
		expect(setSelectionRange.callCount).to.equal(1);
	});

	it('should get selection', function () {
		expect(getSelection({})).to.be.undefined;
		expect(getSelection({ selectionStart: 0, selectionEnd: 1 })).to.deep.equal({ start: 0, end: 1 });
	});

	it('should get keydown operation', function () {
		expect(getOperation({ keyCode: 8 })).to.equal('Backspace');
		expect(getOperation({ keyCode: 46 })).to.equal('Delete');
		expect(getOperation({ keyCode: 1 })).to.be.undefined;
	});
});
//# sourceMappingURL=dom.test.js.map