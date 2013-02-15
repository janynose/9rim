var DEVELLIBS = [
	"global.js",
	/** common library */
	"lib/template.js",
	"lib/imehangul.js",
	"lib/aop.js",
	/** editor core */
	"bronto/editor.js",
	"bronto/observer.js",
	"bronto/util.js",
	"bronto/event.js",
	"bronto/save.js",
	"bronto/panel.js",
	"bronto/caret.js",
	"bronto/menu.js",
	"bronto/range.js",
	"bronto/tagstatus.js",
	"bronto/autosave.js",
	"bronto/toolbar.js",
	"bronto/history.js", 
	"bronto/log.js", 
	
	"bronto/event_iphone.js",
	
	/** each > tool */
	"bronto/tool/forecolor.js", 
	"bronto/tool/emoticon.js", 
	"bronto/tool/specialchar.js", 
	"bronto/tool/link.js", 
	"bronto/tool/image.js", 
	"bronto/tool/undo.js", 
	
	'' /*dummy*/
];

(function() {
	var _importScript = function(filename) { 
		if (filename) {
			document.write('<script type="text/javascript" src="/me/mobileeditor/js/' + filename + "?ver=" + new Date().getTime().toString() + '" charset="utf-8"></s' + 'cript>');
		}
	};
	for(var i=0; i<DEVELLIBS.length; i++) {
		_importScript(DEVELLIBS[i]);
	}
})();
