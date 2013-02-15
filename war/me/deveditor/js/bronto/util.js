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
	}
};
