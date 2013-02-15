(function() {
	var _APPLE = daum.Browser.iphone || daum.Browser.ipod || daum.Browser.uiwebview || false;
	var _VERSION = (function(){
		try {
			return parseFloat(daum.Browser.osversion.replace(/_/g, "."));
		} catch(e){}
	})();
	
	function initCondition() {
		if (_APPLE) {
			return _VERSION >= 3;
		}
		return false;
	}
	
	Editor = function(config, serviceCondition) {
		try {
			var check = serviceCondition || initCondition;
			if (check() === true) {
				config.useEditor = true;
				return daum.extend(Editor, new Bronto.Editor(config)).loaded();
			}
			config.useEditor = false;
			return daum.extend(Editor, new $B.PlainSave(config));
		} catch(e) {
			$B.JobObserver.executeJob($B.Ev.ERROR, e, "init");
		}
	};
	
	var Bronto = $B;
	$B.USE_IME = _APPLE && _VERSION >= 4;
	Bronto.Editor = function(config) {
		this.config = this.setConfig(config);
		
		this.elLegacy = daum.$$('#' + config.textareaId)[0];
		if (!this.elLegacy) {
			return;
		}
		this.el = new Template('<div id="bronto-wrap" class="editorWrap">\
			<ul id="toolbar" class="toolbar moveToolbar"></ul>\
			<div class="dummybar"></div>\
			<div id="panel" class="panel"><p><span><textarea id="caret" autocorrect="off" autocapitalize="off" wrap="off"></textarea></span></p></div>\
			<div class="bottombtnbar"><button type="button" class="btn_content_clear"><a href="javascript:;" class="ico_content_clear"></a>내용삭제</button></div>\
			<div class="autosavebar"></div>\
		</div>').evaluateAsDom({});
		this.elLegacy.parentNode.insertBefore(this.el, this.elLegacy);
		daum.hide(this.elLegacy);
		
		var elForm = this.elForm = $(config.formId);
		this.panel = new $B.Panel(this);
		this.caret = new $B.Caret(this);
		this.range = new $B.Range(this);
		this.autosave = new $B.AutoSave(this, elForm);
		this.toolbar = new $B.Toolbar(this);
		this.history = new $B.History(this);
		this.save = new $B.Save(this, elForm);
		
		new $B.Events(this);
		this.toolbar.initMenues();
		this.initBottomBtns();
		return this;
	}.members({
		setConfig: function(config) {
			return daum.extend(config, {
				osversion: _VERSION,
				apple: _APPLE,
				android: daum.Browser.android,
				useIme: $B.USE_IME
			}, false);
		},
		submit: function() {
			return this.save.submit();
		},
		modify: function(data) {
			if (location.search.indexOf("fromSafari=true") == -1) {
				this.save.modify(data);
			}
		},
		getContent: function() {
			return this.save.getSaveContent();
		},
		isEmpty: function() {
			return this.save.hasContent() === false;
		},
		clear: function() {
			this.panel.setContent("<p></p>");
			this.panel.appendCaret();
			this.caret.setValue("");
		},
		loaded: function() {
			try {
				if (daum.Browser.uiwebview) {
					daum.Element.addClassName(this.el, "brt_uiwebview");
				}
				var version = this.config.osversion;
				if (version == 4) {
					daum.Element.addClassName(this.el, "brt_ios4_0");
				}
				if (Math.floor(version) == 3) {
					daum.Element.addClassName(this.el, "brt_ios3");
				}
				$B.JobObserver.executeJob($B.Ev.EDITOR_LOADED, this);
			} catch(e){console.log(e);}
		},
		$$: function(selector) {
			return daum.$$(selector, this.el)[0];
		},
		initBottomBtns: function () {
			var thisP = this, clearBtn = this.$$(".bottombtnbar .btn_content_clear");
			var toggle = function() {
				thisP.isEmpty() ?  clearBtn.disabled = "disabled" : clearBtn.removeAttribute("disabled");
			};
			setInterval(function(){
				toggle();
			}, 1000);
			$B.Events.observeEvent("CARET>KEY.UP", function onKeyUp(editor, ev) {
				toggle();
			});
			daum.addEvent(clearBtn, "click", function () {
				if (confirm('작성중인 본문 내용을 삭제합니다.')) {
					thisP.clear();
					toggle();
				}
			});
		},
		getAttachments: function() {
			return this.save.getAttachments();
		}
	});
	
})();
