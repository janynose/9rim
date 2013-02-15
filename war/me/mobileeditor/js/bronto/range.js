(function() {
	
	$B.Range = function(editor) {
		this.editor = editor;
		this.panel = editor.panel;
	}.members({
		range: null,
		restoreRange: function() {
			var selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(this.range);
		},
		saveRange: function() {
			var selection = window.getSelection();
			var rng = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
			this.range = rng;
		},
		getStartContaner: function() {
			if (this.range) {
				var res = this.range.startContainer;
				if (res.nodeType == 1) {
					return res;
				} else if (res.nodeType == 3) {
					return res.parentNode;
				}
			}
		},
		startEndTargetNode: function() {
			var sNode = this.findStartRangeNode(this.range.startContainer);
			var eNode = this.findEndRangeNode(this.range.endContainer);
			
			if (eNode == sNode.previousSibling) {
				sNode = eNode;
			}
			return [sNode, eNode];
		},
		findStartRangeNode: function(target) {
			if (target.nodeType == 1) {
				if (target.nodeName == "SPAN") {
					return target;
				} else if (target.nodeName == "P") {
					var list = this.panel.getTextNodesOf(target);
					return (list.length > 0) ? list[0] : this.panel.getTextNodesOf()[0];
				}
			} else if (target.nodeType == 3) {
				return this.splitStartNode(target);
			}
		},
		splitStartNode: function(target) {
			var offset = $B.Util.indexOf(target);
			var srcEl = target.parentNode;
			if (offset == 0) {
				return srcEl;
			} else {			
				var newNode = srcEl.cloneNode(false);
				for (var i = 0; i < offset; i++) {
					newNode.appendChild(srcEl.firstChild);
				}
				srcEl.parentNode.insertBefore(newNode, srcEl);
				return srcEl;
			}
		},
		findEndRangeNode: function(target) {
			if (target.nodeType == 1) {
				if (target.nodeName == "P") {
					var list = this.panel.getTextNodesOf(
						(this.range.endOffset == 0) ? target.previousSibling : target
					);
					return (list.length > 0) ? list[list.length - 1] : this.panel.getTextNodesOf().last();
				} else if (target.nodeName == "SPAN") {
					return target;
				}
			} else if (target.nodeType == 3) {
				return this.splitEndNode(target);
			}
		},
		splitEndNode: function(target) {
			var offset = $B.Util.indexOf(target);
			var srcEl = target.parentNode;
			if (offset == srcEl.childNodes.length - 1) {
				return srcEl;
			} else {			
				var newNode = srcEl.cloneNode(false);
				for (var i = 0; i <= offset; i++) {
					newNode.appendChild(srcEl.firstChild);
				}
				srcEl.parentNode.insertBefore(newNode, srcEl);
				return newNode;
			}
		},
		getTargetList: function() {
			var tmp = this.startEndTargetNode();
			var s = tmp[0], e = tmp[1], res = [];
			var nodes = this.panel.getTextNodesOf();

			var start = false;
			for (var i=0,len=nodes.length; i < len; i++) {
				var el = nodes[i];
				if (s == el) {
					start = true;
				}
				if(!!start) {
					res.push(el);
				}
				if (e == el) {
					break;
				}
			}
			return res;
		},
		isInputMode: function() {
			var rng = this.range;
			if (!rng || !this.panel.isDescendant(rng.startContainer)) {
				return true;
			}
			
			var cfg = this.editor.config;
			try {
				if (cfg.apple && cfg.osversion >= 4) {
					if(rng.startContainer.nodeType == 1) {
						var target = rng.startContainer.childNodes[rng.startOffset];
						if (target && target.nodeType == 1 && target.nodeName.toLowerCase() == "textarea") {
							return true;
						}
					}
				} else {
						return (!rng || rng.startContainer.contentEditable == "plaintext-only" // caret 값이 없을 때
							 || rng.startContainer.parentNode.contentEditable == "plaintext-only"); 
				}
			} catch(e) {
				$B.JobObserver.executeJob($B.Ev.ERROR, e, "range-isInputMode");
				return true;
			}
		}
	});
})();	
	