$B.getCookie = function(name){
	var _name = " " + name + "=",
		cookie = document.cookie + ";", 
		start = cookie.indexOf(_name), end;
	if (start != -1){
		end = cookie.indexOf(";",start);
		return unescape(cookie.substring(start + _name.length, end));
	}
	return;
}

$B.AutoSave = function(editor, elForm) {
	this.timer = null;
	this.editor = editor;
	this.elForm = elForm;
	this.el = editor.$$(".autosavebar");
	
	this.initBottomBtns();
	this.initRadioBtn();
	this.url = editor.config.autosaveUrl || "http://file.uf.daum.net/autosave";
	this.basicParam = {
		service: this.editor.config.serviceCode,
		asid: this.editor.config.avkey
	};
	this.start();
	if (location.search.indexOf("fromSafari=true") == -1) {
		this.checkAndLoad();
	}
	this.ERROR_MAP = {
		"321": "오류: WRONG_PARAMETER",
		"403": "로그아웃 되었습니다.",
		"404": "자동저장된 글이 없습니다.",
		"521": "오류: I/O error"
	};
	
}.members({
	AUTOSAVE_DELAY: 15000,
	AUTOSAVE_SAFETY_DELAY: 2000,
	initBottomBtns: function () {
		var loadBtn = this._drawSaveBtn();
		var self = this;
		daum.addEvent(loadBtn, "click", function () {
			self.save(function () {alert('저장되었습니다.');});
		});
	},
	_drawSaveBtn: function(label) {
		var btn = new Template('<button type="button" class="btn_autosave_save">#{label}</button>').evaluateAsDom({label:label||"임시저장"});
		this.editor.$$(".bottombtnbar").appendChild(btn);
		return btn;
	},
	initRadioBtn: function () {
		var elRadioBtnWrap, clearLine, autoSaveOnList, autoSaveOffList;
		/* li 에 붙어있는 onclick="" 은 iPhone 에서 label 을 동작시키기 위함. */
		elRadioBtnWrap = new Template('<ul class="autosaveWrap">\
			<li class="autosaveSubject"><label>자동저장</label></li>\
			<li onclick=""><input type="radio" name="autosavebtn" id="autosaveon"/><label for="autosaveon">켜기</label></li>\
			<li onclick=""><input type="radio" name="autosavebtn" id="autosaveoff"/><label for="autosaveoff">끄기</label></li>\
			<li class="saveStatus"></li>\
		</ul>').evaluateAsDom({});
		clearLine = new Template('<div class="autosaveBottom"></div>').evaluateAsDom({});
		this.autoSaveOnBtn = $$('#autosaveon', elRadioBtnWrap)[0];
		this.autoSaveOffBtn = $$('#autosaveoff', elRadioBtnWrap)[0];
		daum.addEvent(this.autoSaveOnBtn, "click", this.start.bind(this));
		daum.addEvent(this.autoSaveOffBtn, "click", this.stop.bind(this));
		this.el.appendChild(elRadioBtnWrap);
		this.el.appendChild(clearLine);
		this.saveStatus = $$('.saveStatus', elRadioBtnWrap)[0];
	},
	start: function() {
		var thisP;
		this.stop();
		thisP = this;
		this.timer = setInterval(function() {
			var saveDelayForAppUnload;
			saveDelayForAppUnload = new Date();
			setTimeout(function () {
				var now, safetyDelay;
				now = new Date();
				/* 앱이 백그라운드로 있다가 다시 떴을 때는 save 하지 않아야 함(Safari에서 작성하다가 넘어온 경우 save 하면 Safari 에서 작성하던 것 덮어써지는 문제있음). */
				safetyDelay = thisP.AUTOSAVE_SAFETY_DELAY + 500;
				if (now - saveDelayForAppUnload < safetyDelay) {
					thisP.save();
				}
			}, thisP.AUTOSAVE_SAFETY_DELAY);
		}, this.AUTOSAVE_DELAY);
		this.autoSaveOnBtn.checked = true;
		this.autoSaveOffBtn.checked = false;
	},
	stop: function() {
		if (this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}
		this.autoSaveOnBtn.checked = false;
		this.autoSaveOffBtn.checked = true;
	},
	sendRequest: function(otherParam, onSuccess) {
		daum.addClassName(this.saveStatus, "loading");
		var param = $B.Util.toQueryStr(daum.extend(this.basicParam, otherParam, true));
		var xhr = new XMLHttpRequest();
		var self = this;
        xhr.open("post", this.url, true);
    	xhr.onreadystatechange = function() {
    		if (xhr.readyState == 4) {
				daum.removeClassName(self.saveStatus, "loading");
				var xmlDoc = (new DOMParser()).parseFromString(xhr.responseText, "text/xml");
				var rcode = $B.Util.getTextBySelector(xmlDoc, 'result>header>response_code');
				switch (rcode) {
					case "200":
						onSuccess && onSuccess(xmlDoc);
						break;
					default:
						self.exceptionHandler(rcode, otherParam.type);
				}
    		}
    	};
    	if ("withCredentials" in xhr) {
			xhr.withCredentials = "true";
		} else {
			xhr.setRequestHeader('X-Bronto-Editor', 'ufautosave');
			var authValue = "PROF=" + $B.getCookie("PROF") + ";TS=" + $B.getCookie("TS") + ";HTS=" + $B.getCookie("HTS") + 
							";HIP=" + $B.getCookie("HIP") + ";IP=" + $B.getCookie("IP") + ";HM_CU="+$B.getCookie("HM_CU");
			param += "&daum_cookie=" + encodeURIComponent(authValue);
		}
		
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    xhr.send(param);
	},
	/**
	 * @param {function} customCallback 지정시 콜백을 받음. 세이브할 내용이 없으면 콜백이 바로 실행됨. 
	 */
	save: function(customCallback) {
		var notice = this.notice;
		var baseCallback = function () {
			// hide img
		};
		if (this.editor.save.hasContent()) {
			// show img
			this.sendRequest({
				type: "save",
				contents: this.encodedContent()
			}, customCallback ? customCallback : baseCallback);
		}
		else {
			if (customCallback) {
				customCallback();
			}
		}
	},
	remove: function() {
		this.sendRequest({
			type: "delete"
		});
	},
	load: function(handler) {
		var self = this;
		this.sendRequest({type: "load"}, function(xmlDoc) {
			var contents = $B.Util.getTextBySelector(xmlDoc, 'result>contents').trim();
			contents = JSON.parse(decodeURIComponent(contents));
			self.editor.panel.setContent(contents.content);
			self.setFormField(contents.formfield);
			self.editor.caret.restoreValue();
			self.editor.save.setAttachments(contents.attachments);
			if (handler) {
				setTimeout(handler, 1000);
			}
		});
	},
	checkAndLoad: function() {
		var self = this;
		this.sendRequest({type: "check"}, function(result) {
			if (confirm("이전에 작성중이던 글이 있습니다. 해당 글을 불러오시겠습니까?")) {
				self.load();
			} else {
				self.remove();
			}
		});
	},
	exceptionHandler: function(code, type) {
		switch (code) {
			case "403":
				$B.Util.loginAlert();
			case "404":
			case "321":
			case "521":
			default:
				$B.JobObserver.executeJob($B.Ev.UNHANDLED, ["farm", type, code]);
		}
	},
	encodedContent: function() {
		this.editor.caret.saveValue();
		return  encodeURIComponent(encodeURIComponent(daum.toJSON({
			"content": this.editor.panel.getContent().replace(/(^\s+)|(\s+$)/, "").replace(/tx-daum-image-preloading/g, "tx-daum-image"),
			"attachments": this.editor.save.getAttachments(),
			"formfield": this.getFormField()
		})));
	},
	setFormField: function(formfield) {
		if(!formfield) {
			return;
		}
		var fields = this.elForm;
		var field;
		var value;
		for (var i = 0; i < fields.length; i++) {
			field = fields[i];
			if (!["select", "input", "textarea"].contains(field.tagName.toLowerCase())) {
				continue;
			}
			if (field.name === null || field.name.length === 0) {
				continue;
			}
			if (!formfield[field.name]) {
				continue;
			}
			value = formfield[field.name];
			if (field.tagName.toLowerCase() == "select") {
				for (var j=0; j<field.options.length; j++) {
					if (field.options[j].value == value) {
						field.options[j].selected = true;
						break;
					}
				}
			} else {
				if(field.type == "radio" || field.type == "checkbox") {
					if(field.value == value) {
						field.checked = true;
					}
					continue;
				} else {
					field.value = value;
				}
			}
		}
	},
	getFormField: function() {
		var formfield = {};
		
		var fields = $(this.editor.config.formId);
		var field;
		for (var i=0; i<fields.length; i++) {
			field = fields[i];
			if (!["select", "input", "textarea"].contains(field.tagName.toLowerCase())) {
				continue;
			}
			if (!field.name && !field.id) {
				continue;
			}
			if (field.tagName.toLowerCase() == "select") {
				if (field.selectedIndex > 0) {
					formfield[field.name] = field.options[field.selectedIndex].value;
				}
			} else {
				if (field.type == "radio" && !field.checked) {
					continue;
				} else if (field.type == "checkbox" && !field.checked) {
					continue;
				} else {
					formfield[field.name || field.id] = field.value;
				}
			}
		}
		return formfield;
	}
});