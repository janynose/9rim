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
				console.log("ERR>" + name);
				console.log(e);
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
		 * FF: space 0
		 */	
		isSpaceKey: function(keyCode) {
			return (keyCode == 32); // TODO: remove FF Test keycode
		},
		/**
		 * ios3: enter 10
		 * ios4: enter 13
		 */	
		isEnterKey: function(keyCode) {
			return (keyCode == 10 || keyCode == 13); // TODO: remove FF Test keycode
		},
		/**
		 * ios3: backspace 127 
		 * ios4: backspace 8
		 */	
		isBackSpaceKey: function(code) {
			return (code == 127 || code == 8); // TODO: remove FF Test keycode
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
				var state = editor.caret.getStatusByCaret();
				state.remove(editor.caret);
				if(state.savable) {
					editor.history.push();
				}	
				editor.caret.arrangeCursor();
				ev.preventDefault();
			}
		});
		
		$B.Events.observeEvent("CARET>INPUT", function onPaste(editor, ev) {
			if (editor.caret.isOverflow() && !TYPING) {
				editor.caret.pasteContent();
				editor.history.push();
			}
		});
		
		$B.Events.observeEvent("CARET>KEY.UP", function onKeyUp(editor, ev) {
			TYPING = false;
			if ($B.Events.isEnterKey(ev.keyCode) || $B.Events.isBackSpaceKey(ev.keyCode)) {
				return;
			}
			if (editor.caret.isOverflow()) {
				editor.caret.addCharacter();
			}
			editor.toolbar.movePosition();
		});
		
	})();
	
	
	(function FingerEvent() {
		
		$B.Events.observeEvent("PANEL>FINGER.DOWN", function attachDummyToPanel(editor) {
			editor.caret.addCharacter(); // touchEdit: prevent empty span
		});
		
		$B.Events.observeEvent("PANEL>FINGER.FINAL", function focusInput(editor) {
			editor.caret.focus();
			editor.toolbar.movePosition();
		});
			
		$B.Events.observeEvent("PANEL>FINGER.DRAG", function restoreCaretToPanel(editor) {
			editor.range.saveRange();
			editor.toolbar.movePosition(editor.range.getStartContaner());
		});
		
		$B.Events.observeEvent("PANEL>FINGER.UP", function onFingerUp(editor, ev) {
			var state = editor.caret.getStatusByEv(ev);
			state.moveCaretTo(ev, editor.caret);
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
			var c = editor.caret.getNode();
			if (c.value.length == 0) {
				if(c.nextSibling || (c.parentNode && c.parentNode.nextSibling)) {
					c.setClassName("hide");
				} else {
					c.setClassName("last");
				}
			} else if (c.value.charCodeAt(0) <= 256) {
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
		
		$B.Events.observeEvent("TOOLBAR>POSITION.RESET", function resetToolbar(editor, ev) {
			editor.toolbar.resetPosition();
		});
		
	})();
})();		