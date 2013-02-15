	
	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'redo',
			'class': 'redo', 
			'title': '다시실행'
		});
		this.draw('right');
		
		this.button.addListener(function(ev) {
			editor.history.redo();
		});
		
	}.inherit($B.Tool));
	
	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'undo',
			'class': 'undo', 
			'title': '실행취소'
		});
		this.draw('right');
		
		this.button.addListener(function(ev) {
			editor.history.undo();
		});
		
	}.inherit($B.Tool));
	