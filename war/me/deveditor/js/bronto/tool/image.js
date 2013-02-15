	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'image',
			'class': 'image', 
			'title': '사진'
		});
		
		this.draw();
		
		this.button.addListener(this.onButtonClicked.bind(this));
		window.onSuccessImageUpload = this.onPasteImage.bindAsEventListener(this);
		window.onErrorEditor = function() {
			alert("ERROR");
		};
	}.inherit($B.Tool).members({
		onButtonClicked: function() {
//			if (daum.Browser.uiwebview) {
			var cook = daum.Browser.getCookie("daumGlueSupport")
			if (cook.indexOf("editor") > -1) {
				this.button.el.href = "daumglue://daum.editor/uploadImage?onSuccess=onSuccessImageUpload&onError=onErrorEditor";
			} else {
				alert("editor not supported : "+cook);
			}
//			} else {
//				this.button.el.href = "daumglue://daum.editor/uploadImage?onSuccess=onSuccessImageUpload&onError=onErrorEditor";
//				setTimeout(function(){
//					if (confirm('Daum 아이폰 어플을 설치하시겠습니까?')) {
//						document.location = 'http://itunes.apple.com/kr/app/daum/id365494029?mt=8';
//					}
//				}, 500);
//				return true;
//			}
		},
		onPasteImage: function(text) {
			var data = this.parseImageData(text);
			if (!data) {
				alert("Error: 업로드 실패");
			}
			var self = this;
			var img = document.createElement("img");
			img.onload = function() {
				img.className="tx-daum-image";
				self.afterExecute();
			};
			img.src = data.url.replace(/image/, "R120x120");
			img.className="tx-daum-image-preloading";
			
			var editor = this.editor;
			this.executeOnInputMode(function() {
				editor.caret.newParagraph();
				editor.caret.insertBeforeCaret(img);
				editor.caret.newParagraph();
			});
			this.saveMeta({
				attacher: "image",
				filename: data.fname,
				imageurl: data.url,
				thumurl: img.src,
				filesize: data.size
			});
		},
		parseImageData: function(xmlText) {
//			var xmlDoc = (new DOMParser()).parseFromString(new String(unescape(xmlText)), "text/xml");
			var xmlDoc = (new DOMParser()).parseFromString(new String(unescape(xmlText.encodedXml)), "text/xml");
			var response = xmlDoc.evaluate('/result/header/response_code', xmlDoc , null, XPathResult.STRING_TYPE, null).stringValue;
			if (response != "200") {
				return false;
			}
			return {
				fname: xmlDoc.evaluate('/result/item/fileinfo/property[@name="realname"]', xmlDoc , null, XPathResult.STRING_TYPE, null).stringValue,
				url: xmlDoc.evaluate('/result/item/urls/property[@name="image"]', xmlDoc , null, XPathResult.STRING_TYPE, null).stringValue,
				size: xmlDoc.evaluate('/result/item/urls/property[@name="size"]', xmlDoc , null, XPathResult.STRING_TYPE, null).stringValue
			};
		},
		saveMeta: function(obj) {
			this.editor.attachMeta.push(obj);
		}
	}));