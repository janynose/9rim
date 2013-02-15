(function() {

	$B.Caret = function(editor) {
		this.editor = editor;
		this.panel = editor.panel;
		this.tagstatus = new $B.TagStatus(this);
		this.el = ExtendInputText(editor.$$("#caret"));
		this.className = "";
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
		addCharacter: function() {
			var ch = this.el.value.substr(0,1);
			var curWord = this.el.parentNode;
			if(!(ch && curWord)) {  // !ch || !curWord
				this.el.value = ""; // value should be set "" if(!curWord) is true, but when if(!ch) is true, it would be OK to be set "".
				return;
			}
			if (this.el.value.length > 2) {
				this.pasteContent();
				return;
			}
			curWord.insertBefore(document.createTextNode(ch.spaceToNbsp()), this.el);
			if (ch == " ") {
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
		removeCharacter: function() {
			var state = this.getStatusByCaret();
			state.remove(this);
			this.arrangeCursor();
			return state.savable; // for save history
		},
		newParagraph: function() {
			var word = this.el.parentNode;
			var curP = word.parentNode;
			var newP = curP.cloneNode(false);
			this.panel.getNode().insertBefore(newP, curP);
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
			var text = this.getValue();
			
			this.panel.textToHtml(text);
			this.el.value = "";
		},
		arrangeCursor: function() {
			this.el.moveCursorToStart();
			this.el.moveCursorToEnd();
		},
		getValidPrevious: function() {
			var word = this.el.parentNode;
			if (this.el.previousSibling) {
				return word;
			}
			this.panel.getTextNodesOf(word.parentNode).each(function(el) {
				if (el.childNodes.length == 0) {
					el.parentNode.removeChild(el);  // remove empty span, a 
				}
			});
			return word.previousSibling;
		},
		focus: function() {
			this.editor.toolbar.hideMenues();
			this.el.focus();
		},
		restoreCursor: function() {
			this.el.restoreCursor();
		}, 
		moveCursorToEnd: function() {
			this.el.moveCursorToEnd();
		},
		setValue: function(value) {
			this.el.innerHTML = value;
			return this.el.value = value;
		},
		getValue: function() {
			return this.el.value;
		},
		getPrevValue: function() {
			return this.el.previousSibling || "";
		},
		setClassName: function(name) {
			this.className = name;
			this.el.setClassName(name);
			this.applyCaretWidthByClassName();
		},
		hasValue: function() {
			return (this.el.value.length > 0)
		},
		saveValue: function() {
			this.el.innerHTML = this.el.value;
		},
		restoreValue: function() {
			var fake = daum.$$('#caret')[0];
			if (fake) {
				fake.parentNode.replaceChild(this.el, fake);
				this.el.value = fake.innerHTML;
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
		},
		existNextChar: function() {
			var c = this.el;
			return c.nextSibling || (c.parentNode && c.parentNode.nextSibling);
		},
		leftPosition: function() {
			return daum.Element.getCoords(this.el).left;
		},
		/**
		 * 캐럿의 폭을 클래스네임에 따라 적용한다.
		 * 클래스 네임이 'last' 가 아니면 "" 로 적용.
		 */
		applyCaretWidthByClassName: function () {
			var strWidth, panelWidth, calculatedWidth;
			strWidth = "";
			if (this.className === 'last') {
				/* 너비를 1px 로 변경하는 이유들..
				 * 이유1. 가로모드에서 세로모드가 될 경우 panel의 width가 캐럿에 의해 커져보일 수 있음.
				 * 이유2. 줄넘김이 안된 상태에서 사이즈를 구해야 함(leftPosition).
				 */
				this.setWidth("1px");
				panelWidth = this.panel.getWidth();
				calculatedWidth = panelWidth - this.leftPosition();
				if (0 < calculatedWidth) {
					strWidth = calculatedWidth - 5 + "px";
				}
			}
			this.setWidth(strWidth);
		},
		/**
		 * @param {string} strWidth 캐럿의 사이즈 문자열(단위 포함).
		 */
		setWidth: function (strWidth) {
			this.el.style.width = strWidth;
		},
		insertRight: function(target) {
			var next = daum.getNext(target);
			if (next) {
				target.parentNode.insertBefore($B.Util.getWord(this.el), next);
				return;
			}
			target.parentNode.appendChild($B.Util.getWord(caret.el));
		},
		insertLeft: function(target) {
			target.parentNode.insertBefore($B.Util.getWord(this.el), target);
			var prev = this.getValidPrevious();
			if ($B.Util.isTexteditable(prev)) {
				var word = this.el.parentNode;
				this.el.value = prev.lastChild.textContent.nbspToSpace();
				prev.removeChild(prev.lastChild);
				while(prev.firstChild) {
					word.insertBefore(prev.firstChild, this.el);
				}
				prev.parentNode.removeChild(prev);
			}
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