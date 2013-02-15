(function() {
	
	var _Tools = [];
	$B.registerTool = function(klass) {
		_Tools.push(klass);
	};
	
	$B.Toolbar = function(editor) {
		this.editor = editor;
		this.el = editor.$$("#toolbar");
	}.members({
		tools: [],
		initMenues: function() {
			for(var i=0,len=_Tools.length; i<len; i++) {
				this.tools.push(new _Tools[i](this.editor));
			}
			$B.JobObserver.addJob("SHOW.MENU", this.hideMenues.bind(this));
		},
		appendElement: function(tool) {
			this.el.appendChild(tool.el);
		},
		hideMenues: function(m) {
			for(var i=0,len=this.tools.length; i<len; i++) {
				var tool = this.tools[i];
				if (tool && tool.menu) {
					tool.menu.hide();
				}
			}
		},
		movePosition: function(target) {
			var pos = $B.Util.positionedOffset(target || this.editor.caret.getNode());
			if (pos[1] > 50) {
				this.el.style.top = (pos[1] - 42) + "px";
			}
		},
		resetPosition: function() {
			this.el.style.top = "5px";
		}
	});
})();