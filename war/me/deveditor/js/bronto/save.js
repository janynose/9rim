(function() {

	$B.Save = function(editor, formId) {
		this.editor = editor;
		this.panel = editor.panel;
		if($(formId)) {
			$(formId).onsubmit = function() {
				return this.submit();
			}.bind(this);
		}
	}.members({	
		attachMeta: [],
		/**
		 * Editor.submit(document.getElementById("formId"));
		 */
		submit: function(form) {
			this.editor.caret.addCharacter();
			var content = this.getContent();
			var attachments = this.getAttachments();
			try {
				if(!this.save.isNotEmpty(content)) {
					return false;
				} 
				
				if (typeof isValidForm == "function") {
					if (!isValidForm()) {
						return false;
					}
				}
				if (typeof createFormField == "function") {
					if (!createFormField(content, attachments)) {
						return false;
					}
				}
				return true;
			} catch(e) {
				throw e.message; // TODO: logging?
			}
		},
		getContent: function() {
			filtering("link@url2href", this.panel.getLinkNodes());
			return this.panel.getContent().replace(/<input[^>]+>/gi, "").replace(/(^\s+)|(\s+$)/, "");
		},
		/**
			[{ 
				type: "img",
				fileName: "blue.gif",
				size: "1000",
				imageUrl: "http://daum.net/blue.gif",
				thumUrl: "http://daum.net/thumb/blue.gif",
			}, ...]
		 */
		getAttachments: function() {
			var nodes = this.panel.getImageNodes();
			return this.attachMeta.filter(function(data) { //TODO
				for (var i = 0, len = nodes.length; i < len; i++) {
					if (data.thumurl == nodes[i].src) {
						return true;
					}
				}
				return false;
			});
		},
		/**
		 * Editor.modify({
		 * 	content: "<p>내용..</p>",
		 * 	attachments: [{}, {}, ...]
		 * });
		 */
		modify: function(data) {
			this.panel.setContent(data.content + "<p></p>");
			this.panel.appendCaret();
			this.attachMeta = data.attachments || [];
			filtering("link@href2url", this.panel.getLinkNodes());
		}
	});
	
	function isNotEmpty(content) {
		if (content.replace(/<\/?[^>]+>/g, "").replace(/(^\s+)|(\s+$)/, "").replace(/&nbsp;/gi, "").length > 0) {
			return true;
		} else if (content.indexOf("<img") >= 0) {
			return true;
		}
		return false;
	}
		
	function filtering(command, nodes) {
		var filter = {
			"link@href2url": function() {
				nodes.each(function(node) {
					node.setAttribute("url", node.href);
					node.removeAttribute("href");
					node.setAttribute("onclick", "onBrontoLinkClicked(this);");
				});
			},
			"link@url2href": function() {
				nodes.each(function(node) {
					node.href = node.getAttribute("url");
					node.removeAttribute("url");
					node.removeAttribute("onclick");
				});
			}
		};
		try {
			filter[command]();
		} catch(e) {console.log(e);}
	}

})();