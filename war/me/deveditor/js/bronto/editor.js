var Editor = {};
var $B = {};
(function() {
	
	String.prototype.nbspToSpace = function() {
		return this.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
	}
	
	String.prototype.spaceToNbsp = function() {
//		return this.replace(/\s/g,"&nbsp;");
		return this.replace(/\s/g,"\u00A0");
	}
	
	Editor = function(config) {
		//ua check
		daum.extend(Editor, new Bronto.Editor(config)); 
		
	};
	
	var Bronto = $B;
	Bronto.Editor = function(config) {
		this.config = config;
		
		this.elLegacy = daum.$$('#' + config.textareaId)[0];
		this.el = new Template('<div class="editorWrap">\
			<ul id="toolbar" class="toolbar moveToolbar"></ul>\
			<div class="dummybar"></div>\
			<div id="panel" class="panel"><p><span><input type="text" id="caret" value="" autocorrect="off" autocapitalize="off"/></span></p></div>\
		</div>').evaluateAsDom({});
		this.elLegacy.parentNode.insertBefore(this.el, this.elLegacy);
		daum.hide(this.elLegacy);
		
		this.toolbar = new $B.Toolbar(this);
		this.panel = new $B.Panel(this);
		this.caret = new $B.Caret(this);
		this.range = new $B.Range(this);
		this.history = new $B.History(this);
		this.save = new $B.Save(this, config.formId);
		this.storage = new $B.LocalStorage(this);
		//this.autosave = $B.AutoSave.init(this, config.autosave);
		
		this.toolbar.initMenues();
		
		new $B.Events(this);

		window.name = "DaumBrontoEditor";
		//daum.$$("body")[0].className = "landscape";
		
	}.members({
		modify: function(data) {
			this.save.modify(data);
		},
		recover: function() {
			this.storage.load();
		},
		$$: function(selector) {
			return daum.$$(selector, this.el)[0];
		}
	});
	
})();
