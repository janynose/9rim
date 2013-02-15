(function() {
	
	var __STACK_SIZE = 50;
	$B.History = function(editor) {
		this.caret = editor.caret;
		this.panel = editor.panel;
	}.members({
		undoStack: [],
		redoStack: [],
		push: function(keepRedo) {
			if (this.undoStack.length > __STACK_SIZE) {
				this.undoStack.shift();
			}
			if (this.undoStack.getLast() != this.getSnapshot()) {
				this.undoStack.push(this.getSnapshot());
			}
			if (!keepRedo) {
				this.redoStack = [];	
			}
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
		},
		redo: function() {
			if (!this.redoStack.length) {
				return;
			}
			this.push(true);
			this.setSnapshot(this.redoStack.pop());
		},
		getSnapshot: function() {
			this.caret.saveValue();
			return this.panel.getContent();
		},
		setSnapshot: function(snapshot) {
			this.panel.setContent(snapshot);
			this.caret.restoreValue();
		}
	});

})();