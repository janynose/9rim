	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'link',
			'class': 'link', 
			'title': '링크'
		});
		this.menu = this.createMenu();
		
		this.draw();
		
		this.button.addListener(this.menu.toggle.bind(this.menu));
		this.addMenuEventListener();
		window.onBrontoLinkClicked = this.onLinkClicked.bind(this);
		
	}.inherit($B.Tool).members({	
		menuConfig: {
			id: "linkMenu"
		},
		createMenu: function() {
			var elTable = new Template('<div>\
				<blockquote>\
				<p>URL:<input type="url" class="urlAddr" autocapitalize="off" placeholder="URL주소"></p>\
		        <p>단어:<input type="text" class="urlText" placeholder="URL주소가 걸릴 단어"></p>\
				<fieldset>\
					<input type="radio" name="target" class="urlBlank" value="_blank" checked="checked"/>새 창 \
					<input type="radio" name="target" class="urlSelf" value="_self"/>현재창\
				</fieldset>\
				</blockquote>\
		        <p class="menuBottom"><a class="round btn_sub urlOk"><span><span>확인</span></span></a>\
		       	<a style="display:none" class="round btn_sub remove"><span><span>제거</span></span></a>\
		        <a class="round btn_sub urlCancel"><span><span>닫기</span></span></a></p>\
			</div>').evaluateAsDom({});
			return new $B.Menu(this.menuConfig.id, elTable);
		},
		addMenuEventListener: function() {
			this.urlInput = this.menu.$$("input.urlAddr");
			this.wordInput = this.menu.$$("input.urlText");
			
			var urlBlank = this.urlBlank = this.menu.$$("input.urlBlank");
			var urlSelf = this.urlSelf = this.menu.$$("input.urlSelf");
			this.menu.addBtnListener(this.urlBlank, function() {
				urlBlank.checked = "true";
				urlSelf.checked = "";
			});
			this.menu.addBtnListener(this.urlSelf, function() {
				urlSelf.checked = "true";
				urlBlank.checked = "";
			});
			
			this.menu.addBtnListener(".urlOk", this.onConfirm.bind(this));
			this.menu.addBtnListener(".urlCancel", this.onCancel.bind(this));
			
			var removeBtn = this.removeBtn = this.menu.$$(".remove");
			this.menu.addBtnListener(removeBtn, this.onRemove.bind(this));
		},
		onConfirm: function() {
			var url = this.getValidUrl(this.urlInput.value);
			if (!url) {
				alert("올바른 주소를 입력하세요.");
			}
			
			var wordInput = this.wordInput;
			var urlSelf = this.urlSelf;
			function stuffValue(alink) {
				var content = (wordInput.value && wordInput.value.length) ? wordInput.value : url;
				alink = $B.Util.addChildString(alink, content);
				alink.setAttribute("url", url);
				alink.target = (urlSelf.checked) ? "_self" : "_blank";
			}
			
			var editor = this.editor;
			if (this.modifyTarget) {
				var alink = this.modifyTarget;
				this.executeOnModifyMode(function() {
					stuffValue(alink);
				});
			} else {
				var alink = document.createElement("a");
				alink.setAttribute("onclick", "onBrontoLinkClicked(this)");
				this.executeOnInputMode(function() {
					stuffValue(alink);
					editor.caret.insertBeforeCaret(alink);
				});
			}
			this.afterExecute();
			this.cleanMenu();
		},
		cleanMenu: function() {
			this.urlInput.value = "";
			this.wordInput.value = "";
			delete this.modifyTarget;
			this.removeBtn.style.display = "none";
		},
		onCancel: function() {
			this.menu.hide();
			this.editor.caret.focus();
			this.cleanMenu();
		},
		onRemove: function() {
			if (this.modifyTarget) {
				var w = $B.Util.getWord(this.modifyTarget.innerHTML);
				this.modifyTarget.parentNode.replaceChild(w, this.modifyTarget);
				this.onCancel();
			}
		},
		onLinkClicked: function(alink) {
			this.menu.show();
			this.urlInput.value = alink.getAttribute("url");
			this.wordInput.value = alink.innerHTML;
			var t = alink.target;
			if (t == "_self") { 
				this.urlSelf.checked = "true";
				this.urlBlank.checked = "";
			} else {
				this.urlSelf.checked = "";
				this.urlBlank.checked = "true";
			}
			this.modifyTarget = alink;
			this.removeBtn.style.display = "inline-block";
			//this.urlInput.focus();
			this.urlInput.selectionStart = this.urlInput.selectionEnd = 0; 
		},
		getValidUrl: function(value) {
			if ( !/http[s]?:\/\//.test(value) ) {
				return "http://" + value;
			} else if (value) {
				return value;
			}
			return false;
		}
	}));