(function() {	

	$B.Tool = function(editor) {
		this.editor = editor;
		this.el = daum.createElement('li', { 'class':'button' });
	}.members({
		draw: function(direction) {
			this.el.appendChild(this.button.el);
			this.editor.toolbar.appendElement(this);
			if (this.menu) {
				this.el.parentNode.insertBefore(this.menu.el, this.el.nextSibling);
			}
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
		executeOnInputMode: function(handler, v) {
			this.editor.caret.addCharacter();
			this.editor.caret.restoreCursor();
			handler();
			this.editor.caret.focus();
		},
		executeOnSelectionMode: function(handler, v) {
			handler();
			this.editor.range.restoreRange();
		},
		executeOnModifyMode: function(handler) {
			handler();
		},
		afterExecute: function(result) {
			if(this.menu) {
				this.menu.hide();
			}
			/* 툴 기능 후에 스크롤 이벤트 없이 스크롤 이동함. for OS3. */
			this.editor.toolbar.movePosition();
			$B.LogStack.push("&exec="+(arguments[0] || this.button.el.id));
		}
	});

	$B.Button = function(props) {
		this.el =  daum.createElement('a', props);
	}.members({
		addDownListener: function(handler) {
			daum.addEvent(this.el, "touchstart", handler);
		},
		addListener: function(handler) {
			var self = this;
			daum.addEvent(this.el, "click", function(){
				self.onBtnClicked(handler);
			});
		},
		onBtnClicked: function(fn) {
			fn();
			$B.LogStack.push("&tool=" + this.el.id);
		}
	});

	$B.Menu = function(config, elSub) {
		this.el = daum.createElement('div', { 'id':config.id, 'class':"submenu " + (config.className || "") }); 
		if (elSub != null) {
			this.addSubElement(elSub);
		}
		this.drawBottom();
		return this;
	}.members({
		drawBottom: function() {
			if (!daum.$$(".menuBottom", this.el)[0]) {
				var elCancelWrap = new Template('<p class="menuBottom"><a class="round btn_close_menu"><span><span>닫기</span></span></a></p>').evaluateAsDom({});
				this.el.appendChild(elCancelWrap);
				
				var elCancel = elCancelWrap.firstChild;
				daum.addEvent(elCancel, "click", this.hide.bind(this));
			}
		},
		addSubElement: function(elSub) {
			var menuElem, elCancelWrap;
			menuElem = this.el;
			menuElem.appendChild(elSub);
			elCancelWrap = daum.$$(".menuBottom", menuElem)[0];
			if (elCancelWrap != null) {
				menuElem.appendChild(elCancelWrap);
			}
		},
		addListener: function(handler) {
			this.addBtnListener(this.el.firstChild, handler);
		},
		addBtnListener: function(selector, handler) {
			daum.addEvent(
				(typeof selector == 'string')? this.$$(selector): selector, 
				"click", handler);
		},
		$$: function(selector, idx) {
			return daum.$$(selector, this.el)[idx || 0];
		},
		show: function() {
			this.el.style.display = "block";
			
			this.elBtn = this.elBtn || daum.getPrev(this.el);
			daum.addClassName(this.elBtn, "bt_active");
			
			this.setPrevBtnStyle(true)
		},
		hide: function() {
			this.el.style.display = "none";
			
			this.elBtn = this.elBtn || daum.getPrev(this.el);
			daum.Element.removeClassName(this.elBtn, "bt_active");
			
			this.setPrevBtnStyle(false);
		},
		visible: function() {
			return this.el.style.display == "block";
		},
		toggle: function() {
			if (this.visible()) {
				this.hide();
			} else {
				$B.JobObserver.executeJob("BEFORE.SHOW.MENU", this.el);
				this.show();
			}
		},
		setPrevBtnStyle: function(setStyle) {
			var prevMenu = this.elBtn.previousSibling;//daum.getPrev(this.elBtn);
			if (!prevMenu) {
				return null;
			}
			var prevBtn = prevMenu.previousSibling;//daum.getPrev(preMenu);
			if (prevBtn && prevBtn.nodeName.toLowerCase() == "li") {
				setStyle ? daum.addClassName(prevBtn, "bt_active_prev") : daum.removeClassName(prevBtn, "bt_active_prev");
			};
		}
	});
	
	$B.MenuPage = function(config, elSub) {
        this.$super(config, elSub);
	}.inherit($B.Menu).members({
		addPage: function(pageEnd, pTarget) {
			this.elTarget = pTarget;
		    var elPaging = new Template(
				'<div class="paging">\
					<a class="round brt_prev" href="javascript:;"><span><span>&lt;</span></span></a>\
					<strong class="curNum">1</strong><span>/</span>#{pageEnd}\
					<a class="round brt_next" href="javascript:;"><span><span>&gt;</span></span></a>\
				<div>').evaluateAsDom({pageEnd:pageEnd});
			var elBottom =  daum.$$(".menuBottom", this.el)[0];
			elBottom.insertBefore(elPaging, elBottom.firstChild);
			
			this.curNum = $$("strong.curNum", elPaging)[0];
			
			daum.addEvent($$(".brt_next", elPaging)[0], "click", this.pageAction.bind(this, +1));
			daum.addEvent($$(".brt_prev", elPaging)[0], "click", this.pageAction.bind(this, -1));
		},
		pageAction: function(action) {
			for (var i = 0, nodes = $$("ul", this.elTarget); i < nodes.length; i++) {
				var ul = nodes[i];
				if (daum.visible(ul)) {
					var next = (action === -1) ? 
						daum.getPrev(ul) || daum.getLastChild(daum.getParent(ul)) : 
						daum.getNext(ul) || daum.getFirstChild(daum.getParent(ul));
					if (next) {
						daum.hide(ul);
						daum.show(next);
						this.curNum.innerHTML = $B.Util.indexOf(next) + 1;//parseInt(this.curNum.innerHTML) + action;
					}
					break;
				}
			}
		}
	});

})();