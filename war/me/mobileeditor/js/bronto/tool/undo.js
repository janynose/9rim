	
	$B.registerTool(function(editor) {
		this.$super(editor);
		this.history = editor.history;
		this.button = new $B.Button({
			'id': 'redo',
			'class': 'redo', 
			'title': '다시실행'
		});
		this.draw('right');
		
		this.button.addListener(function(ev) {
			editor.history.redo();
		});
		
		$B.JobObserver.addJob("HISTORY.REDO", this.btnStatus.bind(this));
		$B.JobObserver.addJob("HISTORY.UNDO", this.btnStatus.bind(this));
		$B.JobObserver.addJob("HISTORY.PUSHED", this.btnStatus.bind(this));
		this.btnStatus();
	}.inherit($B.Tool).members({
		btnStatus: function() {
			(this.history.redoStack.length == 0) ? daum.addClassName(this.button.el, "disableRedo")
				: daum.removeClassName(this.button.el, "disableRedo");
		}
	}));
	
	$B.registerTool(function(editor) {
		this.$super(editor);
		this.history = editor.history;
		this.button = new $B.Button({
			'id': 'undo',
			'class': 'undo', 
			'title': '실행취소'
		});
		this.draw('right');
		
		this.button.addListener(function(ev) {
			editor.history.undo();
		});
		
		$B.JobObserver.addJob("HISTORY.REDO", this.btnStatus.bind(this));
		$B.JobObserver.addJob("HISTORY.UNDO", this.btnStatus.bind(this));
		$B.JobObserver.addJob("HISTORY.PUSHED", this.btnStatus.bind(this));
		this.btnStatus();
	}.inherit($B.Tool).members({
		btnStatus: function() {
			(this.history.undoStack.length == 0) ? daum.addClassName(this.button.el, "disableUndo")
				: daum.removeClassName(this.button.el, "disableUndo");
		}
	}));
	