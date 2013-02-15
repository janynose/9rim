//apple
if (daum.Browser.iphone || daum.Browser.ipad || daum.Browser.ipod || daum.Browser.uiwebview) {
	var ua = daum.Browser.ua;
	var isOsNewVer = (parseInt(ua.substring(ua.indexOf("os ") + 3).substring(0, 1)) >= 4); // >= os4
	
	$B.registerEvent(function enableInputEvent(editor){
		var TYPING = false;
		var elCaret = editor.caret.getNode();
		
		daum.addEvent(elCaret, "keydown", function(ev){
			editor.fireEvent("CARET>KEY.DOWN", ev);
		});
		
		daum.addEvent(elCaret, "input", function(ev){
			editor.fireEvent("CARET>INPUT", ev);
		});
		
		daum.addEvent(elCaret, "keyup", function(ev){
			editor.fireEvent("CARET>KEY.UP", ev);
		});
	});
	
	var __TOUCH_DELAYS__ = (isOsNewVer) ? 500 : 1000;
	$B.registerEvent(function enableSelectionEdit(editor){
		var timestamp = 0;
		var dummy = document.createElement("span");
		var elPanel = editor.panel.getNode();
		
		daum.addEvent(elPanel, "touchstart", function(ev) {
			timestamp = new Date();
			var elCaret = editor.caret.getNode();
			if (elCaret.parentNode) {
				editor.fireEvent("PANEL>FINGER.DOWN", ev);
				elCaret.parentNode.replaceChild(dummy, elCaret);
			}
		});
		
		daum.addEvent(elPanel, "touchcancel", function(ev) { //오래눌러서 홀더가 생길 때 발생하는 이벤트, OS3에서는 touchend 대신에...ㅠㅜ
			editor.fireEvent("PANEL>FINGER.DRAG", ev);
		});
		
		daum.addEvent(elPanel, "touchend", function(ev){ // mouseup은 키보드가 떴을 때 잡히지 않는다.
			if (new Date() - timestamp < __TOUCH_DELAYS__) {
				editor.fireEvent("PANEL>FINGER.UP", ev);
				daum.addEvent(elPanel, "click", showKeyboard);
			} else if (isOsNewVer) {
				var elCaret = editor.caret.getNode();
				dummy.parentNode.replaceChild(elCaret, dummy);
				editor.fireEvent("PANEL>FINGER.DRAG", ev);
			}
		});
		
		function showKeyboard(ev) {
			var oldWord = dummy.parentNode;
			if (oldWord) {
				oldWord.removeChild(dummy);
				if (oldWord.childNodes.length == 0) {
					oldWord.parentNode.removeChild(oldWord);
				}
			}
			if(ev.target && ev.target.nodeName.toLowerCase() == "img") {
				var state = editor.caret.getStatusByEv(ev);
				state.moveCaretTo(ev, editor.caret);
			}
			editor.fireEvent("PANEL>FINGER.FINAL", ev);
			daum.removeEvent(elPanel, "click", showKeyboard, false);
		};
		
	});
	
	$B.registerEvent(function adjustCaretWidth(editor) {
		
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
	});
	
	$B.registerEvent(function saveHistoryOnKeyPress(editor){
		daum.addEvent(editor.caret.getNode(), "keydown", function(ev){
			editor.fireEvent("HISTORY.PUSH", ev);
		});
	});
	
	$B.registerEvent(function enableToolbarReset(editor){
		daum.addEvent(document.body, "touchmove", function(ev){
			editor.fireEvent("TOOLBAR>POSITION.RESET", ev);
		});
	});
	
	$B.registerEvent(function onOrientationChange(){
		function changeOrientation(){
			switch (window.orientation) {
				case 0:
					daum.$$("body")[0].className = "portrait";
					break;
				case -90:
				case 90:
					daum.$$("body")[0].className = "landscape";
					break;
			}
		}
		daum.addEvent(document.body, 'orientationchange', changeOrientation);
		changeOrientation();
	});
}