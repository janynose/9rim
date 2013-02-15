(function(){
if (daum.Browser.iphone || daum.Browser.ipad || daum.Browser.ipod || daum.Browser.uiwebview) {
	
	function isEqualXY(x, y, ev) {
		return x == ev.changedTouches[0].clientX && y == ev.changedTouches[0].clientY;
	}
	
	var BasicListener = { 
		ENABLE_INPUT_EVENT: function(editor) {
			var elCaret = editor.caret.getNode();
			
			daum.addEvent(elCaret, "keydown", function(ev){
				editor.fireEvent("CARET>KEY.DOWN", ev);
				/* 글씨 써진 이후에 스크롤 이벤트 없이 스크롤 이동함. for OS3 or Apps. */
				setTimeout(function(){
					editor.toolbar.movePosition();
				}, 500);
			});
			
			var eventCnt = -1;
			daum.addEvent(elCaret, "input", function(ev){
				if (eventCnt == -1) {
					if (elCaret.value.match(/\^_\^$/)) {
						eventCnt = 0;
						return;
					} else if ($B.Util.isJapanese( elCaret.value.charCodeAt(0) )) {
						return;
					}
					editor.fireEvent("CARET>INPUT", ev);
				} else {
					if (++eventCnt == 4) {
						editor.fireEvent("CARET>INPUT", ev);
						eventCnt = -1;
					}
				}
			});
			
			daum.addEvent(elCaret, "keyup", function(ev){
				editor.fireEvent("CARET>KEY.UP", ev);
			});
			if (editor.config.useIme) {
				daum.addEvent(elCaret, "keypress", function(ev){
					editor.fireEvent("CARET>KEY.PRESS", ev);
				});
			}
		},
		ENABLE_SELECT_EDIT: function(editor) {
			var __TOUCH_DELAYS__ = 500;
			var timestamp = 0;
			var elPanel = editor.panel.getNode();
			var x = y = null;
			
			daum.addEvent(elPanel, "touchstart", function(ev){
				timestamp = new Date();
				
				x = ev.changedTouches[0].clientX;
				y = ev.changedTouches[0].clientY;
				
				editor.fireEvent("PANEL>FINGER.DOWN", ev);
			});
			
			daum.addEvent(elPanel, "touchcancel", function(ev){ //오래눌러서 홀더가 생길 때 발생하는 이벤트, OS3에서는 touchend 대신에...ㅠㅜ
				editor.fireEvent("PANEL>FINGER.DRAG", ev);
			});
			
			daum.addEvent(elPanel, "touchend", function(ev){ // mouseup은 키보드가 떴을 때 잡히지 않는다.
				if (new Date() - timestamp < __TOUCH_DELAYS__) {
					if (isEqualXY(x, y, ev)) {
						editor.fireEvent("PANEL>FINGER.UP", ev);
						daum.addEvent(elPanel, "click", showKeyboard);
					}
					else {
						daum.removeEvent(elPanel, "click", showKeyboard, false);
					}
				}
				else {
					var elCaret = editor.caret.getNode();
					editor.fireEvent("PANEL>FINGER.DRAG", ev);
				}
			});
			
			function showKeyboard(ev) {
				daum.removeEvent(elPanel, "click", showKeyboard, false);
				if (ev.target && ev.target.nodeName.toLowerCase() == "img") {
					var state = editor.caret.getStatusByEv(ev);
					state.moveCaretTo(ev, editor.caret);
				}
				editor.fireEvent("PANEL>FINGER.FINAL", ev);
				setTimeout(function(){
					editor.caret.el.moveCursorToEnd();
				},100);
				editor.fireEvent("TOOLBAR>POSITION", ev);
			};
		},
		ADJUST_CARET_WIDTH: function (editor) {
			var elCaret = editor.caret.getNode();
			var elPanel = editor.panel.getNode();
			
			daum.addEvent(elPanel, "touchstart", function(ev){
				editor.fireEvent("SIZE>FINGER.DOWN", ev);
			});
			
			daum.addEvent(elCaret, "touchcancel", function(ev){
				editor.fireEvent("SIZE>FINGER.DRAG", ev);
			});
			
			daum.addEvent(elCaret, "keydown", function(ev){
				editor.fireEvent("SIZE>KEY.DOWN", ev);
			});
			
			daum.addEvent(elCaret, "keyup", function(ev){
				editor.fireEvent("SIZE>KEY.UP", ev);
			});
			
			daum.addEvent(elCaret, "focus", function(ev){
				editor.fireEvent("SIZE>FOCUS", ev);
			});
		},
		SAVE_HISTORY_ONKEYPRESS: function(editor) {
			daum.addEvent(editor.caret.getNode(), "keydown", function(ev){
				editor.fireEvent("HISTORY.PUSH", ev);
			});
		},
		POSITION_TOOLBAR: function(editor) {
			daum.addEvent(window, "scroll", function (ev) {
				editor.fireEvent("TOOLBAR>POSITION", ev);
			});
			/* 손가락을 튕기지 않으면 스크롤 이벤트 없이 스크롤 이동함. for OS3 or Apps. */
			daum.addEvent(document.body, "touchmove", function (ev) {
				editor.fireEvent("TOOLBAR>POSITION", ev);
			});
		},
		CHANGE_ORIENTATION: function (editor) {
			var changeOrientation = function () {
				switch (window.orientation) {
				case 0:
				case 180:
					editor.toolbar.enableMove();
					daum.$$("body")[0].className = "portrait";
					break;
				case -90:
				case 90:
					editor.toolbar.disableMove();
					daum.$$("body")[0].className = "landscape";
					break;
				}
				/*  orientation 전환시 .last 캐럿의 너비 재적용 코드.
				 * 키보드를 연 상태에서 orientation 전환시,
				 * 패널 사이즈 변경이 0.3초 정도 늦게 일어남. 
				 * 여유를 조금 둬서 0.5초 후에 계산하도록함.
				 */
				setTimeout(function () {
					editor.caret.applyCaretWidthByClassName();
				}, 500);
			}
			daum.addEvent(document.body, 'orientationchange', changeOrientation);
			changeOrientation();
		}
		
	};
	
	var iOS3Linestener = {
		ENABLE_SELECT_EDIT: function(editor) {
			var dummy = {
				init: function() {
					//this.el = document.createElement("span");
				},
				touchstart: function(elCaret) {
					//elCaret.parentNode.replaceChild(this.el, elCaret);
				},
				clean: function() {
					/*
					var oldWord = this.el.parentNode;
					if (oldWord) {
						oldWord.removeChild(this.el);
						if (oldWord.childNodes.length == 0) {
							oldWord.parentNode.removeChild(oldWord);
						}
					}
					*/
				},
				restore: function(elCaret) {
					//this.el.parentNode.replaceChild(elCaret, this.el);
				}
			};

			var __TOUCH_DELAYS__ = 1000;
			var timestamp = 0;
			var elPanel = editor.panel.getNode();
			var x = y = null;
			
			dummy.init();
			
			var elCaret = editor.caret.getNode();
			daum.addEvent(elPanel, "touchstart", function(ev){
				x = ev.changedTouches[0].clientX;
				y = ev.changedTouches[0].clientY;
				timestamp = new Date();
				if (elCaret.parentNode) {
					editor.fireEvent("PANEL>FINGER.DOWN", ev);
					dummy.touchstart(elCaret);
				}
			});
			
			daum.addEvent(elPanel, "touchcancel", function(ev){ //오래눌러서 홀더가 생길 때 발생하는 이벤트, OS3에서는 touchend 대신에...ㅠㅜ
				editor.fireEvent("PANEL>FINGER.DRAG", ev);
			});
			
			daum.addEvent(elPanel, "touchend", function(ev){ // mouseup은 키보드가 떴을 때 잡히지 않는다.
				if (new Date() - timestamp < __TOUCH_DELAYS__) {
					if (isEqualXY(x, y, ev)) {
						editor.fireEvent("PANEL>FINGER.UP", ev);
						setTimeout(function(){
							daum.addEvent(elPanel, "click", showKeyboard);
						}, 100);
						return;
					}
				}
				daum.removeEvent(elPanel, "click", showKeyboard, false);
				dummy.restore(elCaret);
			});
			
			function showKeyboard(ev) {
				daum.removeEvent(elPanel, "click", showKeyboard, false);
				dummy.clean();
				
				if (ev.target && ev.target.nodeName.toLowerCase() == "img") {
					var state = editor.caret.getStatusByEv(ev);
					state.moveCaretTo(ev, editor.caret);
				}
				editor.fireEvent("PANEL>FINGER.FINAL", ev);
				setTimeout(function(){
					editor.caret.el.moveCursorToEnd();
				},100);
				/* 키보드 나타난 이후에 스크롤 이벤트 없이 스크롤 이동함. for OS3 or Apps. */
				editor.fireEvent("TOOLBAR>POSITION", ev);
			};
		},
		ENABLE_PASTE: function(editor) {
			jQuery.aop.before({
					target: editor.caret,
					method: "addCharacter"
				}, function checkPaste() {
					if (this.el.value.length > 2) {
						this.pasteContent();
						return;
					}
				}
			);
		}
	};

	var iOS3 = (parseInt(daum.Browser.osversion.replace(/_/g, ".")) == 3) || false;
	var listener =  iOS3 ? daum.extend(iOS3Linestener, BasicListener, false) : BasicListener;
	for (fn in listener) {
		$B.registerEvent(listener[fn]);
	}
}
})();