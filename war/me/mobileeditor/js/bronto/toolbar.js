(function() {
	
	var _Tools = [];
	$B.registerTool = function(klass, notSupport) {
		_Tools.push(klass);
	};
	
	$B.Toolbar = function(editor) {
		this.editor = editor;
		this.el = editor.$$("#toolbar");
		this.lastWinTop = 0;
		this.movable = true;
		this.observeMenu();
	}.members({
		tools: [],
		MARGIN_TOP: 9,
		initMenues: function() {
			for(var i=0,len=_Tools.length; i<len; i++) {
				this.tools.push(new _Tools[i](this.editor));
			}
			
			/**
			 * @example
			 * Editor.getTool("foreColor")
			 */
			var tools = this.tools;
			this.editor.getTool = function(toolId) {
				for (var i = 0; i < tools.length; i++) {
					if (toolId == tools[i].button.el.id) {
						return tools[i];
					}
				}
				return null;
			}
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
		movePosition: function(force) {
			var winTop, nodeP, panelEl, panelTop, panelBottom, toolbarEl, toolbarHeight, toolbarPosToMove;
			winTop = window.pageYOffset;
			if (this.movable === false) {
				return;
			}
			if (force !== true) {
				/* 오차가 5 이하면 움직이지 않는다. for OS3. */
				if (Math.abs(this.lastWinTop - winTop) <= 5) {
					return;
				}
			}
			this.lastWinTop = winTop;
			panelEl = this.editor.panel.getNode();
			nodeP = panelEl;
			panelTop = 0;
			/* get panel top */
			while (nodeP != null) {
				panelTop += nodeP.offsetTop;
				nodeP = nodeP.offsetParent;
			}/* //end of get panel top */
			panelBottom = panelTop + panelEl.offsetHeight;
			toolbarEl = this.el;
			toolbarHeight = toolbarEl.offsetHeight;
			if (winTop < panelTop - toolbarHeight || panelBottom - toolbarHeight < winTop) {
				toolbarPosToMove = this.MARGIN_TOP;
			}
			else {
				toolbarPosToMove = winTop - panelTop + toolbarHeight + this.MARGIN_TOP;
			}
			if (toolbarPosToMove > (panelEl.offsetHeight - toolbarHeight + this.MARGIN_TOP)) {
				return;
			}
			daum.setTop(toolbarEl, toolbarPosToMove);
		},
		enableMove: function() {
			this.movable = true;
		},
		disableMove: function() {
			this.movable = false;
			daum.setTop(this.el, this.MARGIN_TOP);
		},
		observeMenu: function() {
			var self = this;
			$B.JobObserver.addJob("BEFORE.SHOW.MENU", this.hideMenues.bind(this));
		},
		/**
		 * @param {String} bottom|left|right|top
		 */
		getPosition: function(pos) {
			return daum.getCoords(this.el, false)[pos];
		}
	});
})();