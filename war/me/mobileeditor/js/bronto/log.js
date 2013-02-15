(function() {
	$B.Ev = {
		ERROR: "runtime.error",
		UNHANDLED: "runtime.unhandled",
		EDITOR_LOADED: "stats.loaded"
	};
	var LOG_PATH = "http://rialog.daum-img.net:8080/bronto/?";
	
	function postLog(param) {
		setTimeout(function() {
			var img = new Image();
			img.onerror = function(){
				img = null;
			};
			img.onload = function(){
				img = null;
			};
			img.src = LOG_PATH + param;
		}, 50);
	};
	
	function serializeMsg(msg) {
		return encodeURIComponent(msg);
	}
	
	var sessionId = Math.floor(Math.random() * 100000);
	var defaultParam = "-default";
	var onSendRequest = function() {
		if ($B.LogStack.exist()) {
			postLog("&type=onajax" + defaultParam + "::" + $B.LogStack.get());
			$B.LogStack.clear();
		}
	};
	
	$B.JobObserver.addJob($B.Ev.EDITOR_LOADED, function(editor) {
		var avkey = editor.config.avkey;
		var version = editor.config.version;
		var daumId = editor.config.daumId;
		
		defaultParam = ["&did=", daumId, "&sid=", sessionId, "&av=", avkey, "&ver=", version].join("");
		
        postLog("&type=loading" + defaultParam);
		
		try {
			jQuery.aop.after({
				target: editor.autosave,
				method: "sendRequest"
			}, onSendRequest);
		} catch(e) {
			var msg = serializeMsg("[" + e.name + "]" + e.message + "_"  + e.sourceURL + "_" + e.line);
			 postLog("&type=loading" + defaultParam + "&error=rightAfterLoading-" + msg);
		}
	});
	
	$B.JobObserver.addJob($B.Ev.UNHANDLED, function(info, force) {
		$B.LogStack.push("&unhandle=" + info.join("-"));
		if (force === true) {
			try {
				onSendRequest();
			} catch(e){
				console.log(e.message);
			}
		}
	});
	
	$B.JobObserver.addJob($B.Ev.ERROR, function(e, etc) {
		try{
			console.error(e.sourceURL+ "_" + e.line);
			console.error(e);
		} catch(e1) {}
		var msg = null;
		if (e && e.message || etc) {
			msg = serializeMsg("[" + e.name + "]" + e.message + "_"  + e.sourceURL + "_" + e.line);
			etc ? msg + "_" + etc : null;
			$B.LogStack.push("&error=" + msg);
			onSendRequest();
		}
	});
	
})();

