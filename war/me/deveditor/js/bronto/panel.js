(function() {
	
	$B.Panel = function(editor) {
		this.editor = editor;
		this.el = editor.$$("#panel");
	}.members({	
		getContent: function() {
			return this.el.innerHTML;
		},
		setContent: function(content) {
			this.el.innerHTML = content;
			this.toTextNode();
		},
		appendCaret: function() {
			var caret = this.editor.caret.getNode();
			this.el.lastChild.appendChild($B.Util.getWord(caret));
		},
		getNode: function() {
			return this.el;
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
		}
	});
})();	