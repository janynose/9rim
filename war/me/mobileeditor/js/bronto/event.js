(function() {
	
	var _Events = [];
	$B.registerEvent = function(initialize) {
		_Events.push(initialize);
	};
	
	$B.Events = function(editor) {
		this.editor = editor;
		for(var i=0,len=_Events.length; i<len; i++) {
			_Events[i](editor);
		}
		editor.fireEvent = this.fireEvent.bind(this);
	}.members({
		fireEvent: function() {
			var args = $A(arguments);
			var name = args.shift();
			args.unshift(this.editor);
			args.unshift(name);
			try {
				$B.JobObserver.executeJob.apply($B.JobObserver, args);
			} catch(e) {
				$B.JobObserver.executeJob($B.Ev.ERROR, e, name);
			}
		}
	});
	
	daum.extend($B.Events, {	
		observeEvent: function() {
			$B.JobObserver.addJob.apply($B.JobObserver, $A(arguments));
		},
		/**
		 * ios3: space 32
		 * ios4: space 32
		 */	
		isSpaceKey: function(keyCode) {
			return (keyCode == 32);
		},
		/**
		 * ios3: enter 10
		 * ios4: enter 13
		 */	
		isEnterKey: function(keyCode) {
			return (keyCode == 10 || keyCode == 13);
		},
		/**
		 * ios3: backspace 127 
		 * ios4: backspace 8
		 */	
		isBackSpaceKey: function(code) {
			return (code == 127 || code == 8);
		}
	});
	
	// Caution: There are some order dependencies within "onLoad"
	(function KeyEvent() {
		var TYPING = false;
		
		$B.Events.observeEvent("CARET>KEY.DOWN", function onKeyDown(editor, ev) {
			TYPING = true;
			if ($B.Events.isEnterKey(ev.keyCode)) {
				editor.caret.addCharacter();
				editor.caret.newParagraph();
				ev.preventDefault();
			} else if ($B.Events.isBackSpaceKey(ev.keyCode)) {
				ev.preventDefault();
				editor.caret.removeCharacter();
			}
		});
		
		$B.Events.observeEvent("CARET>INPUT", function onPaste(editor, ev) {
			if (editor.caret.isOverflow() && !TYPING) {
				editor.caret.pasteContent();
				editor.history.push();
				editor.caret.applyCaretWidthByClassName();
			}
		});
		
		var imeResult = null;
		
		if ($B.USE_IME) {
			var ime = $B.Util.getImeInstance();
			$B.Events.observeEvent("CARET>KEY.PRESS", function onPaste(editor, ev) {
				if (ev.keyCode >= 12593 && ev.keyCode <= 12643) { // ㄱ~ㅎ,ㅏ~ㅣ
					var frontChar = editor.caret.getValue();
					imeResult = ime.getWordWithAdd(frontChar, ime.getJasoFromKeyCode(ev.keyCode));
				}
			});
		}
		
		$B.Events.observeEvent("CARET>KEY.UP", function onKeyUp(editor, ev) {
			TYPING = false;
			imeResult && ev.preventDefault();
			
			if ($B.Events.isEnterKey(ev.keyCode) || $B.Events.isBackSpaceKey(ev.keyCode)) {
				editor.fireEvent("SIZE>FOCUS");
				return;
			}
			
			imeResult && editor.caret.setValue(imeResult) && (imeResult = null);

			if (editor.caret.isOverflow()) {
				editor.caret.addCharacter();
			}
		});
		
	})();
	
	
	(function FingerEvent() {
		
		$B.Events.observeEvent("PANEL>FINGER.DOWN", function attachDummyToPanel(editor) {
			editor.caret.addCharacter(); // touchEdit: prevent empty span
		});
		
		$B.Events.observeEvent("PANEL>FINGER.FINAL", function focusInput(editor) {
			editor.caret.focus();
		});
			
		$B.Events.observeEvent("PANEL>FINGER.DRAG", function restoreCaretToPanel(editor) {
			editor.range.saveRange();
		});
		
		$B.Events.observeEvent("PANEL>FINGER.UP", function onFingerUp(editor, ev) {
			var word = editor.caret.getParent();
			var state = editor.caret.getStatusByEv(ev);
			state.moveCaretTo(ev, editor.caret);
			if (word && word.childNodes.length == 0) {
				word.parentNode.removeChild(word);
			}
		});
		
	})();
	
	(function SizeEvent() {
		
		$B.Events.observeEvent("SIZE>FINGER.DOWN", function onFingerDown(editor) {
			editor.caret.setClassName("hide");
		});
		
		$B.Events.observeEvent("SIZE>FINGER.DRAG", function onFingerCancel(editor) {
			if (!editor.caret.hasValue()) {
				editor.caret.setClassName("hide");
			}
		});
		
		$B.Events.observeEvent("SIZE>KEY.DOWN", function onKeyDown(editor, ev) {
			if ($B.Events.isEnterKey(ev.keyCode)) {
				editor.caret.setClassName("hide");
				return;
			}
			editor.caret.setClassName("");
		});
		
		$B.Events.observeEvent("SIZE>KEY.UP", function showCaretToEng(editor, ev) {
			if (editor.caret.getValue().charCodeAt(0) <= 256) {
				editor.caret.setClassName("en");
			}
		});
		
		$B.Events.observeEvent("SIZE>FOCUS", function onFocus(editor) {
			var c, panelWidth;
			c = editor.caret;
			if (c.getValue().length == 0 && c.existNextChar()) {
				c.setClassName("hide");
			} else if (c.getValue().length == 0) {
				c.setClassName("last");
			} else if (c.getValue().charCodeAt(0) <= 256) {
				c.setClassName("en");
			} else {
				c.setClassName("");
			}
			editor.caret.moveCursorToEnd();
		});
		
	})();
	
	(function HistoryEvent() {
		
		$B.Events.observeEvent("HISTORY.PUSH", function onKeyDown(editor, ev) {
			if ($B.Events.isEnterKey(ev.keyCode) || $B.Events.isSpaceKey(ev.keyCode)) {
				editor.history.push();
			}
		});
		
	})();
	
	(function ToolbarEvent() {
		$B.Events.observeEvent("TOOLBAR>POSITION", function (editor, ev) {
			editor.toolbar.movePosition();
		});
	})();
})();		