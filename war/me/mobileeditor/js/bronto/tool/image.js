	$B.registerTool(function(editor) {
		this.$super(editor);
		this.button = new $B.Button({
			'id': 'image',
			'class': 'image', 
			'title': '사진'
		});
		this.draw();
		
		if (!this._available(editor.config)) {
			daum.Element.hide(this.el);
			return;
		}
		this.thumSize = "T120x120";
		this.editor = editor;
		this.initGlueProps();
		
		this.button.addListener(this.onButtonClicked.bind(this));
		
		if (daum.Browser.uiwebview) {
			this.webviewInit();
		}
	}.inherit($B.Tool).members({
		glueUrl: "daumglue://daum.editor/uploadImage",
		initGlueProps: function() {
			var config = this.editor.config;
			// GlueUrl		
			var params = {
				defaultSize: 1024,
				service: config.serviceCode,
				onSuccess: "onSuccessImageUpload",
				onError: "onErrorEditor"
			};
			params = daum.extend(params, config.glueParam, true);
			this.glueUrl = $B.Util.toQueryStr(params, this.glueUrl);
			
			// current url & Daumapp url
			this.returnUrl = $B.Util.toQueryStr({"fromSafari":"true"}, location.href);
			this.appUrl = "daumapps://web?url=" + encodeURIComponent(this.returnUrl) + "&loginDaumId=" + config.daumId;
			
			// bind global functions
			window.onSuccessImageUpload = this.onPasteImage.bindAsEventListener(this);
			window.onErrorEditor = function(errorInfo) {
				try{
					var msg = "ErrorCode["+errorInfo.code+"]";
					$B.JobObserver.executeJob($B.Ev.UNHANDLED, ["imageAttach", msg, $B.Util.toQueryStr(params).replace(/&/g,"-")], true);
				} catch(e){msg = e.message;}
				alert("이미지 첨부 실패(" + msg + ")");
			};
		},
		callGlueAttacher: function() {
			document.location = this.glueUrl;
		},
		callDaumApps: function() {
			document.location = this.appUrl;
		},
		callAppStore: function() {
			document.location = "http://itunes.apple.com/kr/app/daum/id365494029?mt=8";
		},
		webviewInit: function() {
			if (location.search.indexOf("fromSafari=true") > 0) {
				this.editor.autosave.load(this.callGlueAttacher.bind(this));
			}
		}, 
		onButtonClicked: function() {
			if (daum.Browser.uiwebview) {
				this.callGlueAttacher();
			} else if (daum.Browser.safari) {
				this.executeAppsAttach();
			}
		},
		executeAppsAttach: function() {
			var self = this;
			if (confirm("사진첨부를 위해 Daum앱과 연결합니다. 작성중 글도 자동연결됩니다.\n(Daum앱 실행시 계정이 다를 경우는 로그인화면으로 이동됩니다.)")) {
				this.editor.autosave.save(function () {
					this.editor.autosave.stop();
					this.editor.clear();
					self.showNotice();
					self.callDaumApps();
				}.bind(this));
			}
		},
		showNotice: function() {
			this.notice  = this.notice || new Template(
				'<blockquote>\
					<div class="infoMsg">\
						<h4><em>안내</em><span>Daum앱 환경체크</span></h4>\
						<p>글을 계속 쓰려면 <u>[글쓰기복귀]</u>를<br/>Daum앱의 설치는 <u>[Daum앱 설치]</u>를<br/>선택하세요.</p>\
						<p>Daum앱에서 첨부완료후, 브라우저 재실행시 현재의 안내창이 보일 수 있으며, 사진첨부는 Daum앱이 설치되어 있어야 가능합니다.</p>\
					</div>\
					<div class="infoBtns">\
						<button class="blue">글쓰기복귀</button>\
						<button class="white">Daum앱 설치</button>\
						<button class="white">닫기</button>\
					</div>\
					<a class="btn_close_modal_x" title="닫기" href="javascript:;">닫기</a>\
				</blockquote>'
			).evaluateAsDom({});
			var notice = this.notice;
			var btns = $$(".infoBtns button", notice)
			daum.addEvent(btns[0], "click", this.stayCurrent.bind(this));
			daum.addEvent(btns[1], "click", this.callAppStore.bind(this));
			daum.addEvent(btns[2], "click", this.stayCurrent.bind(this));
			daum.addEvent($$(".btn_close_modal_x", notice)[0], "click", this.stayCurrent.bind(this));
			daum.addEvent($$(".infoMsg p u", notice)[0], "click", this.stayCurrent.bind(this));
			daum.addEvent($$(".infoMsg p u", notice)[1], "click", this.callAppStore.bind(this));
			
			var modal = this.modal = $B.Util.getModalDialog();
			modal.show(notice);
		},
		closeNotice: function() {
			this.modal.hide();
		},
		stayCurrent: function() {
			this.closeNotice();
			this.editor.autosave.load();
			this.editor.caret.focus();
			this.editor.autosave.start();
		},
		onPasteImage: function(uploadResult) {
			var data = this.parseImageData(uploadResult);
			if (!data) {
				alert("Error: 이미지 업로드 실패");
				$B.JobObserver.executeJob($B.Ev.UNHANDLED, ["imageAttach", uploadResult, uploadResult.encodedXml]);
				return;
			}
			var self = this;
			var img = document.createElement("img");
			img.onload = function() {
				img.className="txc-image";
				self.afterExecute();
			};
			img.src = data.url.replace(/image/, this.thumSize || "T120x120");
			img.className="txc-image-preloading";
			
			var editor = this.editor;
			this.executeOnInputMode(function() {
				editor.caret.newParagraph();
				editor.caret.insertBeforeCaret(img);
				editor.caret.newParagraph();
			});
			this.saveMeta({
				attacher: "image",
				fileName: data.fname,
				imageUrl: data.url,
				fileSize: data.size
			});
		},
		parseImageData: function(uploadResult) {
			var xmlStr = uploadResult.encodedXml;
			var xmlDoc = (new DOMParser()).parseFromString(new String(unescape(xmlStr)), "text/xml");
			var response = $B.Util.getTextBySelector(xmlDoc, 'result>header>response_code');
			if (response != "200") {
				return false;
			}
			return {
				fname: $B.Util.getTextBySelector(xmlDoc, 'result>item>fileinfo>property[name="realname"]'),
				url: $B.Util.getTextBySelector(xmlDoc, 'result>item>urls>property[name="image"]'),
				size: $B.Util.getTextBySelector(xmlDoc, 'result>item>fileinfo>property[name="filesize"]')
			};
		},
		saveMeta: function(obj) {
			this.editor.save.pushAttachment(obj);
		},
		_available: function(config) {
			if (!(daum.Browser.iphone || daum.Browser.ipad || daum.Browser.ipod)) {
				return false;
			} else {
				if (daum.Browser.uiwebview) {
					return (daum.getCookie("daumGlueSupport") || "").indexOf("editor") > -1;
				}
				return parseFloat(daum.Browser.osversion.replace(/_/g, ".")) >= 3.1;	
			}
		}
	}));