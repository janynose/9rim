(function() {

	$B.Caret = function(editor) {
		this.editor = editor;
		this.tagstatus = new $B.TagStatus(this);
		this.el = ExtendInputText(editor.$$("#caret"));
	}.members({	
		applyStyle: function(styles) {
			for(var name in styles) {
				if (this.el.style[name] == styles[name]) {
					this.el.style[name] = "";
				} else {
					this.el.style[name] = styles[name];
				}
			}
		},
		addCharacter: function(/* touchEdit */) {
			var ch = this.el.value.substr(0,1);
			if(!ch) {
				return;
			}
			var curWord = this.el.parentNode;
			curWord.insertBefore(document.createTextNode(ch.spaceToNbsp()), this.el);
			if (ch == " ") { //if (ch == " " && (arguments[0] != "touchEdit")) {
				var newWord = $B.Util.copyWord(curWord);
				curWord.parentNode.insertBefore(newWord, curWord);
				while(curWord.firstChild != this.el) {
					newWord.appendChild(curWord.firstChild);
				}
			}
			this.copyStyleFromInput(curWord);
			this.el.value = this.el.value.substr(1,2);
			this.el.moveCursorToEnd();
		},
		newParagraph: function() {
			var word = this.el.parentNode;
			var curP = word.parentNode;
			var newP = curP.cloneNode(false);
			curP.parentNode.insertBefore(newP, curP);
			var list = daum.$T("*", curP);
			if (!word.previousSibling && !this.el.previousSibling) {
				newP.appendChild($B.Util.getWord("\u00A0"));
			} else {
				word = $B.Util.splitWord(this.el);
				while (curP.firstChild) {
					if (curP.firstChild == word) {
						break;
					} else {
						newP.appendChild(curP.firstChild);
					}
				}
			}
			/** cursor가 안따라오는 문제 **/
			this.el.restoreCursor();
			this.el.moveCursorToEnd(); //0
		},
		startFromNewWord: function() {
			$B.Util.splitWord(this.el);
			if (this.el.nextSibling) {
				$B.Util.splitWord(this.el.nextSibling);
			}
		},
		copyStyleFromInput: function(targetEl) {
			var style = this.el.getAttribute("style");
			if(targetEl.nodeType == 1) {
				if(style) {
					targetEl.setAttribute("style", style);
				} else /*if (targetEl.getAttribute && targetEl.getAttribute("style"))*/ {
					targetEl.removeAttribute("style");
				}
			} else {
				// caret style이 없고 지워야 할 기존 스타일도 없는 경우
			}
			return targetEl;
		},
		pasteContent: function() {
			$B.Util.splitWord(this.el);
			var word = this.el.parentNode;
			this.el.value.trim().split(/\s/).each(function(str) {
				word.parentNode.insertBefore($B.Util.copyWord(word, str + " "), word);
			});
			this.el.value = "";
		},
		arrangeCursor: function() {
			this.el.moveCursorToStart();
			this.el.moveCursorToEnd();
		},
		getValidPrevious: function() {
			var word = this.el.parentNode;
			this.editor.panel.getTextNodesOf(word.parentNode).each(function(el) {
				if (el.childNodes.length == 0) {
					el.parentNode.removeChild(el);  // remove empty span, a 
				}
			});
			return word.previousSibling;
		},
		focus: function() {
			this.el.focus();
		},
		restoreCursor: function() {
			this.el.restoreCursor();
		}, 
		moveCursorToEnd: function() {
			this.el.moveCursorToEnd();
		},
		setValue: function(value) {
			this.el.value = value;
		},
		getValue: function(value) {
			return this.el.value;
		},
		setClassName: function(name) {
			this.el.setClassName(name);
		},
		hasValue: function() {
			return (this.el.value.length > 0)
		},
		saveValue: function() {
			this.el.setAttribute("value", this.el.value);
		},
		restoreValue: function() {
			var fake = daum.$$('#caret')[0];
			if (fake) {
				fake.parentNode.replaceChild(this.el, fake);
				this.el.value = fake.value;
				this.el.setClassName(fake.className);
				fake = null;
				delete fake;
			}
		},
		isOverflow: function() {
			return (this.el.value.length > 1)
		},
		insertBeforeCaret: function(target) {
			var word = $B.Util.splitWord(this.el);
			word.parentNode.insertBefore(target, word);
		},
		getNode: function() {
			return this.el;
		},
		getParent: function() {
			return this.el.parentNode;
		},
		setAttribute: function(name, value) {
			this.el.setAttribute(name, value);
		},
		removeAttribute: function(value) {
			this.el.removeAttribute(value);
		},
		getStatusByEv: function(ev) {
			return this.tagstatus.getStatusByEv(ev);
		},
		getStatusByCaret: function() {
			return this.tagstatus.getStatusByCaret(this);
		}
	}); 
	
	function ExtendInputText(el) {
		var _methods = {
			moveCursorToEnd: function() {
				this.selectionStart = this.selectionEnd = this.value.length; 
			},
			moveCursorToStart: function() {
				this.selectionStart = this.selectionEnd = 0; 
			},
			restoreCursor: function() {
				this.value = " ";
				this.value = "";
			},
			setClassName: function(name) {
				this.setAttribute("class", name);
			}
		}
		for (m in _methods) {
			el[m] = _methods[m];
		}
		return el;
	}
	
})();	