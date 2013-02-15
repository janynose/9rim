	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'link',
			'class': 'link', 
			'title': '링크'
		});
		this.menu = this.createMenu();
		
		this.draw();
		
		this.button.addDownListener(this.beforeClick.bind(this));
		this.button.addListener(this.onButtonClicked.bind(this));

		this.addMenuEventListener();
		window.onBrontoLinkClicked = this.onLinkClicked.bind(this);
		
	}.inherit($B.Tool).members({	
		menuConfig: {
			id: "linkMenu"
		},
		createMenu: function() {
			var elTable = new Template('<div>\
				<blockquote>\
				<form onsubmit="return false;">\
				<p>URL\
					<input type="url" class="urlAddr" autocapitalize="off" placeholder="URL주소"/>\
					<span class="urlClear urlAddrClear">지우기</span>\
				</p>\
		        <p>단어\
					<input type="text" class="urlText" placeholder="표시할 단어(기본값은 URL)"/>\
					<span class="urlClear urlTextClear">지우기</span>\
				</p>\
				</form>\
				</blockquote>\
		       	<p class="menuBottom"><button type="button" style="display:none" class="btn_sub remove">링크제거</button>\
		        <button type="button" class="btn_sub urlCancel">취소</button>\
		        <button type="button" class="btn_sub urlOk">확인</button></p>\
			</div>').evaluateAsDom({});
			return new $B.Menu(this.menuConfig, elTable);
		},
		addMenuEventListener: function () {
			this.urlInput = this.menu.$$("input.urlAddr");
			this.wordInput = this.menu.$$("input.urlText");
			this.urlClear = this.menu.$$("span.urlAddrClear");
			this.wordClear = this.menu.$$("span.urlTextClear");
			this.initClearBtn(this.urlInput, this.urlClear);
			this.initClearBtn(this.wordInput, this.wordClear);
			
			this.menu.addBtnListener(".urlOk", this.execute.bind(this));
			this.removeBtn = this.menu.$$(".remove");
			this.menu.addBtnListener(this.removeBtn, this.onRemove.bind(this));
			this.menu.addBtnListener(".urlCancel", this.onCancel.bind(this));
		},
		initClearBtn: function (inputElem, clearBtnElem) {
			var thisP, inputCheckTimer;
			thisP = this;
			inputCheckTimer = null;
			daum.addEvent(inputElem, "focus", function () {
				inputCheckTimer = setInterval(function () {
					thisP.setDisplayClearBtn(inputElem, clearBtnElem);
				}, 100);
			});
			daum.addEvent(inputElem, "blur", function () {
				if (inputCheckTimer !== null) {
					clearInterval(inputCheckTimer);
					inputCheckTimer = null;
				}
				thisP.setDisplayClearBtn(inputElem, clearBtnElem);
			});
			this.menu.addBtnListener(clearBtnElem, function () {
				inputElem.blur();
				inputElem.value = "";
				inputElem.focus();
			});
		},
		setDisplayClearBtn: function (inputElem, clearBtnElem) {
			if (inputElem.value) {
				clearBtnElem.style.display = "inline";
			} else {
				clearBtnElem.style.display = "";
			}
		},
		onButtonClicked: function() {
			this.menu.toggle();
			if (!this.isInputMode()) {
				try {
					daum.Element.hide(this.menu.$$("p", 1));
					this.targetList = this.editor.range.getTargetList();
				} catch(e) {
					daum.Element.show(this.menu.$$("p", 1));
				}
			} else {
				daum.Element.show(this.menu.$$("p", 1));
			}
		},
		execute: function() {
			var url = this.getValidUrl(this.urlInput.value);
			if (!url) {
				if (confirm("올바른 주소를 입력하세요.")) {
					this.urlInput.focus();
					return false;	
				}
				return this.onCancel();
			}
			
			var self = this;
			if (this.modifyTarget) {
				this._modifyLinkNode(url);
			} else {
				var targetList = this.targetList;
				if (targetList) {
					this.executeOnSelectionMode(function() {
						self._nodeListToLink(targetList, url);
					});
					delete this.targetList;
				} else {
					this.executeOnInputMode(function() {
						self._insertLinkNode(url);
					});
				}
			}
			this.cleanMenu();
			this.afterExecute(url);
		},
		createTag: function() {
			return daum.createElement("a");
		},
		_nodeListToLink: function(nodeList, url) {
			var self = this;
			nodeList.each(function(span) {
				span.innerHTML.split(/<textarea[^>]+>.*<\/textarea>/).each(function(str, idx) {
					var newNode = self.createTag();
					newNode.setAttribute("url", url);
					newNode.innerHTML = str;
					span.parentNode.insertBefore(newNode, span);
					if (idx == 0) {
						self.editor.caret.insertRight(newNode);
					}
				});
				span.parentNode.removeChild(span);
			});
		},
		_insertLinkNode: function(url) {
			var alink = this.createTag();
			this.setLinkProperty(alink, url);
			this.editor.caret.insertBeforeCaret(alink);
		},
		_modifyLinkNode: function(url) {
			var alink = this.modifyTarget;
			var self = this;
			this.executeOnModifyMode(function() {
				self.setLinkProperty(alink, url);
			});
		},
		setLinkProperty: function(alink, url) {
			var wordInput = this.wordInput;
			if (daum.Element.visible(wordInput)) {
				var value = daum.$F(wordInput);
				alink = $B.Util.addChildString(alink, (value && value.length) ? value : url);	
			}
			alink.setAttribute("url", url);
		},
		cleanMenu: function() {
			this.urlInput.value = "";
			this.wordInput.value = "";
			this.setDisplayClearBtn(this.urlInput, this.urlClear);
			this.setDisplayClearBtn(this.wordInput, this.wordClear);
			delete this.modifyTarget;
			this.removeBtn.style.display = "none";
		},
		onCancel: function() {
			this.menu.hide();
			this.cleanMenu();
		},
		onRemove: function() {
			if (this.modifyTarget) {
				var w = $B.Util.getWord(this.modifyTarget.innerHTML.nbspToSpace());
				this.modifyTarget.parentNode.replaceChild(w, this.modifyTarget);
				this.onCancel();
			}
		},
		onLinkClicked: function(alink) {
			this.menu.show();
			daum.Element.show(this.menu.$$("p", 1));
			this.urlInput.value = alink.getAttribute("url");
			
			if (daum.Element.visible(this.wordInput)) {
				this.wordInput.value = alink.innerHTML.nbspToSpace();
			}
			this.modifyTarget = alink;
			this.removeBtn.style.display = "inline-block";
			//this.urlInput.focus();
			this.urlInput.selectionStart = this.urlInput.selectionEnd = 0; 
		},
		getValidUrl: function(value) {
			if (value && !/http[s]?:\/\//.test(value) ) {
				return "http://" + value;
			} else if (value) {
				return value;
			}
			return false;
		}
	}));