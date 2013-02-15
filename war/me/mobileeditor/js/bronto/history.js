(function() {
	
	var __STACK_SIZE = 35;
	$B.History = function(editor) {
		this.editor = editor;
		this.caret = editor.caret;
		this.panel = editor.panel;
		this.inject();
		this.undoStack = [];
		this.redoStack = [];
		this.pushOnce = false;
		this.firstSnap = this.getSnapshot();
	}.members({
		push: function(keepRedo) {
			if (this.undoStack.length > __STACK_SIZE) {
				this.undoStack.shift();
			}
			if (this.pushOnce === false) {
				this.pushOnce = true;
				this.undoStack.push(this.firstSnap);
			}
			if (this.undoStack.getLast() != this.getSnapshot()) {
				this.undoStack.push(this.getSnapshot());
			}
			if (!keepRedo) {
				this.redoStack = [];	
			}
			$B.JobObserver.executeJob("HISTORY.PUSHED");
		},
		addRedo: function(snapshot) {
			if (this.redoStack > __STACK_SIZE) {
				this.redoStack.shift();
			}
			this.redoStack.push(snapshot);
		},
		undo: function() {
			if (!this.undoStack.length) {
				return;
			}
			var current = this.getSnapshot();
			this.addRedo(current);
			var recent = this.undoStack.pop();
			if (current == recent) {
				recent = this.undoStack.pop();
			}
			recent && this.setSnapshot(recent);
			$B.JobObserver.executeJob("HISTORY.UNDO");
		},
		redo: function() {
			if (!this.redoStack.length) {
				return;
			}
			this.push(true);
			this.setSnapshot(this.redoStack.pop());
			$B.JobObserver.executeJob("HISTORY.REDO");
		},
		getSnapshot: function() {
			this.caret.saveValue();
			return this.panel.getContent();
		},
		setSnapshot: function(snapshot) {
			this.panel.setContent(snapshot);
			this.caret.restoreValue();
		},
		/**
		 * history save 해야 할 시점에 주입. 
		 * onkeydown, oninput event 발생할 땐 제외(직접 push 실행함)
		 * @private
		 */
		inject: function() {
			var editor = this.editor, history = this;
			jQuery.aop.after({target: editor.caret,	method: "removeCharacter"}, function(savable) {
				if (savable === true) {
					history.push();
				}
			});
			jQuery.aop.before({target: $B.Tool,	method: "executeOnInputMode"}, function() {
				history.push();
			});
			jQuery.aop.before({target: $B.Tool,	method: "executeOnSelectionMode"}, function() {
				history.push();
			});
			jQuery.aop.after({target: $B.Tool,	method: "afterExecute"}, function() {
				history.push();
			});
			jQuery.aop.before({target: editor, method: "clear"}, function() {
				history.push();
			});
		}
	});

})();