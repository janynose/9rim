(function() {
	
	$B.Panel = function(editor) {
		this.editor = editor;
		this.el = editor.$$("#panel");
	}.members({	
		getContent: function() {
			return this.el.innerHTML;
		},
		setContent: function(content) {
			if (content.trim().match(/^<p>.*<\/p>$/i)) { // content from editor
				this.el.innerHTML = content;
				this.toTextNode();
			} else { // content from textarea
				this.textToHtml(content);
			}
			/* 내용 변경시 패널 크기가 달라져서 툴바 재배치시켜줘야함. */
			this.editor.toolbar.movePosition(true);
		},
		appendCaret: function() {
			var caret = this.editor.caret.getNode();
			var p = daum.getLastChild(this.el);
			var s = daum.getLastChild(p);
			if (s && s.nodeName.toLowerCase() == "span") {
				s.appendChild(caret);
			} else {
				p.appendChild($B.Util.getWord(caret));
			}
		},
		getNode: function() {
			return this.el;
		},
		/**
		 * @return {int} 현재 panel 의 폭 수치.
		 */
		getWidth: function () {
			return this.el.offsetWidth;
		},
		getImageNodes: function() {
			return daum.$$('img', this.el);
		},
		getLinkNodes: function() {
			return daum.$$('a', this.el);
		},
		getTextNodesOf: function(node) {
			return $B.Util.getTexteditableNodes(node || this.el);
		},
		toTextNode: function() {
			daum.$$('span', this.el).each(function(node) {
				for (var i=0, len=node.childNodes.length; i < len; i++) {
					var child = node.childNodes[i];
					if (child.nodeType == 3) {
						var str = child.textContent;
						for (var j = 0, end = str.length; j < end; j++) {
							node.insertBefore(document.createTextNode(str.charAt(j)), child);
						}
						node.removeChild(child);
					}
				}
			});
		},
		isDescendant: function(el) {
			var elPanel = this.el, body = document.body, target = el;
			var isDesc = false;
			try {
				while (target && (target != body)) {
					if (target == elPanel) {
						isDesc = true;
						break;
					}
					target = target.parentNode;
				}
			} catch(e) {}
			return isDesc;
		},
		textToHtml: function(text) {
			var self = this;
			var word = this.editor.caret.getParent();
			text.replace(/&nbsp;/gi, " ").replace(/<br.?\/?>/g, "\n").split(/\n\r?/).each(function(line, idx) {
				if (idx != 0) {
					self.editor.caret.newParagraph();
				}
				var curP = word.parentNode;
				line.split(/\s/).each(function(piece) {
					curP.insertBefore(self._makeInline(piece), word);
				});
			});
		},
		_makeInline: function(piece) {
			if (piece===""){
				piece = "\u00A0";
			}
			if (/^https?:\/\//.test(piece)) {
				var aTag = daum.createElement("a", {url: piece});
				aTag.innerHTML = piece;
				return aTag;
			}
			return $B.Util.copyWord(this.editor.caret.getParent(), piece + " ");
		}
	});
})();	