(function() {

	$B.Save = function(editor, elForm) {
		this.editor = editor;
		this.elForm = elForm;
		this.panel = editor.panel;
		this.attachMeta = [];
	}.members({	
		submit: function() {
			this.editor.caret.addCharacter();
			this.editor.elLegacy.value = this.getSaveContent();
			try {
				if (typeof isValidForm == "function") {
					if (!isValidForm(this.editor)) {
						return false;
					}
				}
				if (typeof setFormField == "function") {
					if (!setFormField(this.editor)) {
						return false;
					}
				}
				this.elForm.submit();
			} catch(e) {
				$B.JobObserver.executeJob($B.Ev.ERROR, e, "submit");
				throw e.message;
			}
		},
		hasContent: function () {
			if (this.editor.caret.getValue()) {
				return true;
			} else if (this.panel.getNode().textContent.replace(/(^\s+)|(\s+$)/, "").replace(/&nbsp;/gi, "").length > 0) {
				return true;
			} else if (this.panel.getContent().indexOf("<img") >= 0) {
				return true;
			}
			return false;
		},
		getSaveContent: function() {
			var content = filtering("link@url2href", this.panel.getContent());
			return content.replace(/<textarea[^>]+>[^<]*<\/textarea>/gi, "").replace(/(^\s+)|(\s+$)/, "").replace(/T120x120/gi, "image");
		},
		/**
			[{ 
				attacher: "image",
				fileName: "blue.gif",
				fileSize: "1000",
				imageUrl: "http://daum.net/blue.gif",
				thumUrl: "http://daum.net/thumb/blue.gif",
			}, ...]
		 */
		getAttachments: function() {
			var nodes = this.panel.getImageNodes();
			this.attachMeta = this.attachMeta.filter(function(data) { // TODO: loop
				for (var i = 0, len = nodes.length; i < len; i++) {
					if (data.attacher == "image") {
						if (nodes[i].src == data.imageUrl.replace(/\/image\//, "/T120x120/")) {
							return true;
						}
					}
				}
				return false;
			});
			return this.attachMeta;
		},
		setAttachments: function(attch) {
			this.attachMeta = attch || [];
		},
		pushAttachment: function(obj) {
			if (obj) {
				this.attachMeta.push(obj);
			}
		},
		/**
		 * Editor.modify({
		 * 	content: "<p>내용..</p>",
		 * 	attachments: [{}, {}, ...]
		 * });
		 */
		modify: function(data) {
			var thSize = this.editor.getTool("image").thumSize || "T120x120";
			var content = data.content.replace(/(<[iI][mM][gG]\s*[^>]+src=['"].+?daum\.net\/)(image)(\/.+?['"][^>]+>)/g, "$1"+thSize+"$3")
			content = filtering("link@href2url", content);
			content && this.panel.setContent(content);
			this.panel.appendCaret();
			data.attachments && this.setAttachments(data.attachments);
		}
	});
	
	function filtering(command, content) {
		var filter = {
			"link@href2url": function() {
				return content.replace(/<a\s+[^>]*(href=)["']?[^"']*["']?[^>]*>|<\/a>/gi, function(match, a, b){
				    return match.replace(/\bhref=/, "url=");
				});
			},
			"link@url2href": function() {
				return content.replace(/<a\s+[^>]*(url=)["']?[^"']*["']?[^>]*>|<\/a>/gi, function(match, a, b){
				    return match.replace(/\burl=/, "href=");
				});
			}
		};
		try {
			return filter[command]();
		} catch(e) {
			$B.JobObserver.executeJob($B.Ev.ERROR, e, "filter");
			return content;
		}
	}
	
	$B.PlainSave = function(config) {
		this.config = config;
		this.elTextarea = $(config.textareaId);
		this.elForm = $(config.formId);
	}.members({
		submit: function() {
			var content = this.getContent();
			
			if (typeof isValidForm == "function") {
				if (!isValidForm(Editor)) {
					return false;
				}
			}
			if (typeof setFormField == "function") {
				if (!setFormField(Editor)) {
					return false;
				}
			}
			this.elForm.submit();
		},
		modify: function(data) {
			this.elTextarea.value = this.plainStr(data.content);
		},
		getContent: function() {
			return this.elTextarea.value;
		},
		isEmpty: function() {
			return this.elTextarea.value.trim().length == 0;
		},
		getAttachments: function() {
			return [];
		},
		plainStr: function(str) {
			return str.replace(/<p>\s?<img[^>]*\/?>\s?<\/p>/gi, "").replace(/&nbsp;/gi, " ").
				replace(/<\/p>/gi, "\n").replace(/<br.?\/?>/gi, "\n").stripTags();
		}
	});

})();