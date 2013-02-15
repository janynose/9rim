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
				$B.JobObserver.executeJob($B.Ev.UNHANDLED, ["getStatusByEv", target.nodeName.toLowerCase()]);
				throw new Error("target is not handled.");
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
	
	var _Word = function(node) {
		this.node = node;
	}.members({
		savable: false,
		focusPrev: function(node, caret) {
			if (node.previousSibling) {
				return node.previousSibling;
			} else {
				if (node.parentNode.previousSibling && node.parentNode.previousSibling.nodeName == "SPAN") {
					if (node.parentNode.previousSibling.lastChild == caret.getNode()) {
						return false;
					}
					return node.parentNode.previousSibling.lastChild;
				} else { // IMG, A, P
					caret.setClassName("hide");
					node.parentNode.parentNode.insertBefore($B.Util.getWord(caret.el), node.parentNode);
					caret.setValue("");
					return false;
				}
			}
			return this.node;
		},
		moveCaretTo: function(ev, caret) { //target==TEXTNODE
			var target = this.focusPrev(this.node, caret);
			if ((target == false) || (target == this.node)) {
				return;
			}
			var word = target.parentNode;
			caret.setValue(target.textContent);
			
			var c = caret.getValue().charCodeAt(0);
			(c >= 12593 && c <= 12643) || (c >= 44032 && c <= 55203) ? caret.setClassName("") : caret.setClassName("en"); 
			
			caret.setAttribute("style", word.getAttribute("style") || "");
			word.insertBefore(caret.el, target);
			word.removeChild(target);	
		},
		remove: function(caret) {
			this.beforeRemove(caret);
			this.afterRemove(caret);
		},
		beforeRemove: function(caret) {
			if(this.node.nodeName.toLowerCase() != "textarea") {
				var target = this.node;
				var word =  caret.el.parentNode;
				if (target === word) {
					return;
				}
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
			var c = caret.getValue().charCodeAt(0);
			(c >= 12593 && c <= 12643) || (c >= 44032 && c <= 55203) ?
				caret.setValue($B.Util.getImeInstance().getWordWithRemove(caret.getValue())) : caret.setValue("");
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
				caret.insertRight(target);
			} else {
				caret.insertLeft(target);
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
			caret.setValue(""); // FTDUEDTR-1028 (iOS3)
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
				return;
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