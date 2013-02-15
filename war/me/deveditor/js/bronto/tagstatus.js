(function() {	
	$B.TagStatus = function(editor) {
	}.members({	
		getStatusByEv: function(ev) {
			var target = ev.target;
			if(target.nodeType == 3) {
				if (target.parentNode.nodeName.toLowerCase() == "a") {
					return new _Link(target.parentNode);
				} else {
					return new _Word(target);
				}
			} else if(target.nodeName.toLowerCase() == "span") {
				return new _Word(target.lastChild);
			} else if(target.nodeName.toLowerCase() == "a") {
				return new _Link(target);
			} else if(target.nodeName.toLowerCase() == "img") {
				return new _Image(target);
			} else if(target.nodeName.toLowerCase() == "p") {
				return new _Paragraph(target);
			} else if(target.nodeName.toLowerCase() == "div") {
				return new _Paragraph(target.lastChild);
			} else { //img, a
				throw new Error('who are you? ' + target.nodeName.toLowerCase()); // TODO
			}
		},
		getStatusByCaret: function(caret) {
			var target = caret.el;
			if(caret.hasValue()) { //input
				return new _Word(target);
			} else {
				target = caret.getValidPrevious(); //span, img, a
				if(!target) {
					return new _Paragraph(caret.el.parentNode.parentNode);
				}
				if(target.nodeName.toLowerCase() == "span") {
					return new _Word(target);
				} else if(target.nodeName.toLowerCase() == "img") {
					return new _Image(target);
				} else if(target.nodeName.toLowerCase() == "a") {
					return new _Link(target);
				}
			}
		}
	});
	
	function isTexteditable(node) {
		return node && node.nodeName.toLowerCase() == "span";
	}
	
	var _Word = function(node) {
		this.node = node;
	}.members({
		savable: false,
		moveCaretTo: function(ev, caret) { //target==TEXTNODE
			var target = this.node;
			var word = target.parentNode;
			caret.setValue(target.textContent);
			caret.setAttribute("style", word.getAttribute("style") || "");
			word.insertBefore(caret.el, target);
			word.removeChild(target);	
			caret.focus();		
			setTimeout(function(){
				caret.el.moveCursorToEnd();
			}, 800);
		},
		remove: function(caret) {
			this.beforeRemove(caret);
			this.afterRemove(caret);
		},
		beforeRemove: function(caret) {
			if(this.node.nodeName.toLowerCase() != "input") {
				var target = this.node;
				var word =  caret.el.parentNode;
				var targetStyle = target.getAttribute("style");
				
				caret.setValue(target.lastChild.textContent);
				target.removeChild(target.lastChild);
				while(target.firstChild) {
					word.insertBefore(target.firstChild, caret.el);
				}
				if (targetStyle) {
					caret.setAttribute("style", targetStyle);
					word.setAttribute("style", targetStyle);
				} else {
					caret.removeAttribute("style");
					word.removeAttribute("style");
				}
				target.parentNode.removeChild(target);
				this.savable = true;
			}
			caret.setValue(HangulUtil.remove(caret.getValue()));
		},
		afterRemove: function(caret) {
			if(!caret.hasValue()) {
				var word = caret.el.parentNode;
				if (caret.el.previousSibling) { //TextNode
					caret.el.value = caret.el.previousSibling.textContent.nbspToSpace();
					word.removeChild(caret.el.previousSibling);
				}
			}
		}
 	});

	var _Image = function(node) {
		this.node = node;
	}.members({
		savable: true,
		moveCaretTo: function(ev, caret) {
			var target = this.node;
			if(!ev.offsetX) {
				return;
			}
			if (ev.offsetX > 60) {
				if (target.nextSibling) {
					target.parentNode.insertBefore($B.Util.getWord(caret.el), target.nextSibling);
				} else {
					target.parentNode.appendChild($B.Util.getWord(caret.el));
				}
			} else {
				target.parentNode.insertBefore($B.Util.getWord(caret.el), target);
				var t = caret.getValidPrevious();
				if (isTexteditable(t)) {
					var word = caret.el.parentNode;
					caret.el.value = t.lastChild.textContent.nbspToSpace();
					t.removeChild(t.lastChild);
					while(t.firstChild) {
						word.insertBefore(t.firstChild, caret.el);
					}
					t.parentNode.removeChild(t);
				}
			}
		},
		remove: function(caret) {
			this.beforeRemove(caret);
			this.afterRemove(caret);
		},
		beforeRemove: function(caret) {
			var target = this.node;
			target.parentNode.removeChild(target);
		}, 
		afterRemove: function(caret) {
			caret.restoreCursor();
		}
	});
	
	var _Link = function(node) {
		this.node = node;
	}.members({
		savable: true,
		moveCaretTo: function(ev, caret) {
			var target = this.node;
			onBrontoLinkClicked(target);
		},
		remove: function(caret) {
			this.beforeRemove(caret);
			this.afterRemove(caret);
		},
		beforeRemove: function(caret) {
			var target = this.node;
			target.parentNode.removeChild(target);
		}, 
		afterRemove: function(caret) {
			caret.restoreCursor();
		}
	});
	
	var _Paragraph = function(node) {
		this.node = node;
	}.members({
		savable: true,
		moveCaretTo: function(ev, caret){
			var target = this.node;
			target.appendChild($B.Util.getWord(caret.el));
			caret.focus();
		},
		remove: function(caret) {
			this.beforeRemove(caret);
			this.afterRemove(caret);
		},
		beforeRemove: function(caret) {
			var word = caret.el.parentNode;
			var curP = this.node;
			var preP = curP.previousSibling;
			if (!preP || preP.nodeType != 1)  {
				throw "current <P> is at the first line.";
			}
			while(preP.firstChild) {
				curP.insertBefore(preP.firstChild, word);
			}
			if (preP.getAttribute("style")) {
				curP.setAttribute("style", preP.getAttribute("style"));
			}
			preP.parentNode.removeChild(preP);
		}, 
		afterRemove: function(caret) {
			caret.restoreCursor();
		}
	});
	
})();