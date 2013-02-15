(function() {	

	$B.Tool = function(editor) {
		this.editor = editor;
		this.el = daum.createElement('li', { 'class':'button' });
	}.members({
		draw: function(direction) {
			this.el.appendChild(this.button.el);
			if (this.menu) {
				this.el.appendChild(this.menu.el);
			}
			this.editor.toolbar.appendElement(this);
			if(direction) {
				this.el.style.cssFloat = direction;
			}
		},
		beforeClick: function() {
			this.editor.range.saveRange();
		},
		beforeExecute: function() {
		},
		isInputMode: function() {
			return this.editor.range.isInputMode();
		},
		executeOnInputMode: function(handler) {
			this.editor.caret.addCharacter();
			this.editor.caret.restoreCursor();
			handler();
			this.editor.caret.focus();
		},
		executeOnSelectionMode: function(handler) {
			handler();
			this.editor.range.restoreRange();
		},
		executeOnModifyMode: function(handler) {
			handler();
		},
		afterExecute: function() {
			if(this.menu) {
				this.menu.hide();
			}
			this.editor.history.push();
		}
	});

	$B.Button = function(props) {
		this.el =  daum.createElement('a', props);
	}.members({
		addDownListener: function(handler) {
			daum.addEvent(this.el, "touchstart", handler);
		},
		addListener: function(handler) {
			daum.addEvent(this.el, "click", handler);
		}
	});

	$B.Menu = function(id, elSub) {
		this.el = daum.createElement('div', { 'id':id, 'class':"submenu" }); 
		this.el.appendChild(elSub);
		
		if (!daum.$$(".menuBottom", this.el)[0]) {
			var elCancelWrap = new Template('<p class="menuBottom"><a class="round btn_sub"><span><span>닫기</span></span></a></p>').evaluateAsDom({});
			this.el.appendChild(elCancelWrap);
			
			var elCancel = elCancelWrap.firstChild;
			daum.addEvent(elCancel, "click", this.hide.bind(this));
		}
		return this;
	}.members({
		addListener: function(handler) {
			this.addBtnListener(this.el.firstChild, handler);
		},
		addBtnListener: function(selector, handler) {
			daum.addEvent(
				(typeof selector == 'string')? this.$$(selector): selector, 
				"click", handler);
		},
		$$: function(selector) {
			return daum.$$(selector, this.el)[0];
		},
		show: function() {
			$B.JobObserver.executeJob("SHOW.MENU");
			this.el.style.display = "block";
		},
		hide: function() {
			this.el.style.display = "none";
		},
		visible: function() {
			return this.el.style.display == "block";
		},
		toggle: function() {
			if (this.visible()) {
				this.hide();
			} else {
				this.show();
			}
		}
	});

})();