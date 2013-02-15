String.prototype.nbspToSpace = function() {
	return this.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}

String.prototype.spaceToNbsp = function() {
	return this.replace(/\s/g,"\u00A0");
}
	
$B.LogStack = new (function(editor) {
		this.stack = [];
	}.members({	
		push: function(str) {
			this.stack.push(str);
		},
		get: function() {
			return this.stack.join("");
		},
		exist: function() {
			return this.stack.length > 0;
		},
		clear: function() {
			this.stack = [];
		}
	}));
	
$B.ModalDialog = function() {
	var bg = this.bg = daum.createElement("div", {id: "modalBg", style:"display:none;height:" + document.body.clientHeight + "px"});
	var container = this.container = daum.createElement("div", {id: "modalContent", style: "display:none;"});
	document.body.appendChild(bg);
	document.body.appendChild(container);
	
	daum.addEvent(bg, "click", this.hide.bind(this));
	daum.addEvent(document.body, 'orientationchange', this.resetPosition.bind(this));
}.members({
	show: function(elContent) {
		this.elContent = elContent;
		this.container.appendChild(elContent);
		daum.show(this.bg);
		daum.show(this.container);
		this.resetPosition();
	},
	hide: function() {
		daum.hide(this.bg);
		daum.hide(this.container);
	},
	resetPosition: function(){
		var elContent = this.elContent;
		if (!elContent) {
			return;
		}
		
		var top = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
		if (top == 0) {
			window.scrollTo( 0, 0 );
		}
		var posY = 20;
		if (window.innerHeight) { 
			posY = ( window.innerHeight - this.container.clientHeight ) / 2;
		}
		daum.setTop(this.container, top + Math.min(posY, 200))
		
		if (window.innerWidth) {
			var posX = (window.innerWidth - elContent.clientWidth) / 2;
		}
		daum.setLeft(this.container, posX-3);
	}
});

$B.LoginAlert = function() {
	this.$super();
	this.init();
}.inherit($B.ModalDialog).members({
	init: function() {
		this.elContent = this.elContent || function(){
			var tmp = new Template(
				'<blockquote>\
					<div class="infoMsg">\
						<h4><span>로그인 하세요.</span></h4><br>\
					</div>\
					<div class="infoBtns">\
						<button class="white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;닫기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>\
					</div>\
					<a class="btn_close_modal_x" title="닫기" href="javascript:;">닫기</a>\
				</blockquote>'
			).evaluateAsDom({});
			return tmp;
		}();
		this.container.appendChild(this.elContent);
		daum.addEvent(this.elContent, "click", this.hide.bind(this));
		daum.addEvent(this.bg, 'click', this.hide.bind(this));
	},
	show: function() {
		daum.show(this.bg);
		daum.show(this.container);
		this.resetPosition();
	}
});
	
$B.Util = {
	getWord: function() {
		var arg = arguments[0], el = document.createElement("span");
		if (!arg) return el;
		(typeof arg == "string") ? this.addChildString(el, arg)  : el.appendChild(arg);
//			(typeof arg == "string") ? el.appendChild(document.createTextNode(arg)) : el.appendChild(arg);
		return el;
	},
	copyWord: function(word, child) {
		var el = word.cloneNode(false);
		if (!child) return el;
		if(typeof child == "string") {
			for(var i=0,len=child.length;i<len;i++) {
				el.appendChild(document.createTextNode(child.charAt(i)));
			}
		} else {
			el.appendChild(child);
		} 
		return el;
	},
	addChildString: function(node, child) {
		node.innerHTML = "";
		for (var i=0, len=child.length; i < len; i++) {
			node.appendChild(document.createTextNode(child.charAt(i)));
		}
		return node;
	},
	getTexteditableNodes: function(node) {
		var results = [], tags = daum.$T("*", node);
		for (var i = 0, len = tags.length; i < len; i++) {
			if (tags[i].nodeName.toLowerCase() == "span")
				results.push(tags[i]);
		}
		return results;
	},
	isTexteditable: function(node) {
		return node && node.nodeName.toLowerCase() == "span";
	},
	indexOf: function(node){
		if(!node) {
			return -1;
		}
		var _inx = -1;
		var _pNode = node.parentNode;
		var _cNode = _pNode.firstChild;
		while(_cNode) {
			_inx++;
			if(_cNode == node) {
				break;
			}
			_cNode = _cNode.nextSibling;
		}
		return _inx;
	},
	splitWord: function(tNode) {
		var _offset = this.indexOf(tNode);
		var _sNode = tNode.parentNode;
		if(_sNode.childNodes.length == 0 || _offset == 0) {
			return _sNode;
		}
		var _newNode = _sNode.cloneNode(false);
		_sNode.parentNode.insertBefore(_newNode, _sNode);
		for(var i=0; i<_offset; i++) {
			_newNode.appendChild(_sNode.firstChild);
		}
		return _sNode;
	},
	positionedOffset: function(element) {
		var _getStyle = function(element, style) {
			var value = element.style[style];
			if (!value) {
				var css = document.defaultView.getComputedStyle(element, null);
				value = css ? css[style] : null;
			}
			return value == 'auto' ? null : value;
		};
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
			if (element) {
				if (element.tagName == 'BODY') 
					break;
				var p = _getStyle(element, 'position');
				if (p == 'relative' || p == 'absolute') 
					break;
			}
		} while (element);
		return [valueL, valueT];
	},
	/**
	 * $B.Util.getTextBySelector
	 * @param {DOMParser} xmlDoc 도큐먼트. html or xml.
	 * @param {string} selectorString 선택하고자 하는 셀렉터. (참고: http://www.w3.org/TR/selectors-api/ )
	 * @return {string} 노드를 못찾으면 null.
	 */
	getTextBySelector: function (xmlDoc, selectorString) {
		var elem, nodes, node, i, len, result;
		elem = xmlDoc.querySelector(selectorString);
		if (elem) {
			result = "";
			nodes = elem.childNodes;
			len = nodes.length;
			for (i = 0; i < len; i += 1) {
				node = nodes[i];
				/* Node.TEXT_NODE or Node.CDATA_SECTION_NODE */
				if (typeof node.data === "string") {
					result += node.data;
				}
			}
			return result;
		}
		return null;
	},
	/**
	 * $B.Util.getImeInstance
	 */
	getImeInstance: function() {
		this._imeIns = this._imeIns || new $B.ImeHangul();
		return this._imeIns;
	},
	/**
	 * $B.Util.getModalDialog
	 */
	getModalDialog: function() {
		this._dailogIns = this._dailogIns || new $B.ModalDialog(); 
		return this._dailogIns;
	},
	loginAlert: function() {
		this._alertLogin = this._alertLogin || new $B.LoginAlert();
		this._alertLogin.show();
	},
	toQueryStr: function(obj, url) {
		var res = [];
		for(var p in obj) {
			res.push([p, '=', obj[p]].join(""));
		}
		var param = res.join('&');
		if (url) {
			url += (url.indexOf("?") == -1) ? "?" : "&";
			url += param;
			return url;
		}
		return param;
	},
	isJapanese: function(code) {
		return ((19968 <= code) && (code <= 40895)) || ((12352 <= code) && (code <= 12543));
	}
};

