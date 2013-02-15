/*!
 * @overview Jigu Javascript Framework for Mobile, v0.1
 * Copyright (c) 2009 Front-end Technology Center, Daum Communications.
 * 
 * $Version : 0.1 $
 * $Date : 2010-06-21 17:52 $
 * $Revision : 14 $
 * $Build : 17 $
 * 
 * Project site: http://play.daumcorp.com/display/ftst/Jigu+Javascript+Framework
 * Licensed under Daum Common License : http://dna.daumcorp.com/forge/docs/daum-license-1.0.txt
 */

// End of Headers


(function(){
if(!window.daum || !window.daum.extend){
	/**
	 * @name daum
	 * @namespace Jigu Mobile Javascript Framework의 namespace
	 * <p>보고 계신 이 문서는 Jigu Mobile의 API문서입니다.
	 * <br />여기 기술된 내용들은 소스코드로부터 자동으로 추출되어 생성된 것입니다.
	 * 그래서 많은 내용이 생략되어 있습니다.
	 * <br /><a href="http://play.daumcorp.com/x/Npam" 
	 * target="_blank" style="font-weight:bold;">Jigu에 관한 더 자세한 내용은 
	 * play wiki를 참고하세요.</a></p>
	 * <p>이 문서의 최신 버전은 <a href="http://ftdev.daum.net/jigu_mobile/api" 
	 * target="_blank">http://ftdev.daum.net/jigu_mobile/api</a>에 있습니다.</p>
	 * Jigu Mobile Version은 Jigu v1.0_r179버전을 기반으로 만들어졋습니다.
	 */
	/** @ignore */
	var daum = window.daum = {};

	/**
	 * 목적객체에 원본객체의 속성과 메소드를 복사한다.
	 * @name daum.extend
	 * @function
	 * @param Object dest 목적객체
	 * @param Object source 원본객체
	 * @param Boolean overwrite overwrite 여부
	 * @return Object
	 */
	daum.extend = function(dest, source, overwrite){
		var ow = overwrite !== undefined ? overwrite: true, p;
		for(p in source){
			if(!dest[p] || ow){
				dest[p] = source[p];
			}
		}
		return dest;
	};
} else return;

daum.extend(daum,{
	/**
	 * Jigu Mobile Version
	 * @field
	 * @name daum.version 
	 */
	version: '0.1m_r14',
	/**
	 * Array 관련 메소드를 제공한다.
	 * @namespace Array 관련 메소드를 제공한다.
	 * @name daum.Array
	 *//** @ignore */
	Array: {}, 
	
	/**
	 * 사용자의 브라우저에 관련된 각종 property와 method를 제공한다.
	 * @namespace 사용자의 브라우저에 관련된 각종 property와 method를 제공한다.
	 * -- 아래와 같이 브라우저/OS정보를 Boolean으로 제공한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * daum.Browser.iemobile: IE
	 * daum.Browser.safari: Safari
	 * daum.Browser.opera: Opera
	 * daum.Browser.chrome: Chrome
	 * daum.Browser.webkit: Webkit
	 * daum.Browser.polaris: Polaris
	 * daum.Browser.iphone: iPhone
	 * daum.Browser.ipod: iPod
	 * daum.Browser.ipad: iPad
	 * daum.Browser.webviewer: webviewer(lgt,uzard,opera mini)
	 * daum.Browser.dolfin: dolfin
	 * daum.Browser.xperiax1: sonyericsson X1
	 * daum.Browser.uiwebview: UIWebView
	 * daum.Browser.android: Android platform
	 * </pre>
	 * @name daum.Browser
	 */	
	Browser: {
		/**
		 * user agent string, 즉 navigator.userAgent.toLowerCase()값을 반환한다.
		 * @name daum.Browser.ua
		 * @field
		 * @type String
		 */
		ua: navigator.userAgent.toLowerCase(),
		/**
		 * ua를 분석하여 browser값을 정의한다.
		 * @name daum.Browser.init
		 * @private
		 * @function
		 * @constructor
		 */
		init: function(){
			this.iemobile = this.ua_contains(['msie','!opera']);
			this.polaris = this.ua_contains('polaris') || this.ua_contains('natebrowser');
			this.chrome = this.ua_contains('chrome');
			this.webkit = this.ua_contains('applewebkit');
			this.opera = this.ua_contains('opera');
			this.android = this.ua_contains('android');
			this.safari = this.ua_contains('safari');
			this.iphone = this.ua_contains(['iphone','!ipod']);
			this.ipad = this.ua_contains('ipad');
			this.ipod = this.ua_contains('ipod');
			this.webviewer = this.ua_contains(['wv','lg']) || this.ua_contains('uzard') 
								|| this.ua_contains('opera mini');
			this.dolfin = this.ua_contains('dolfin');
			this.xperiax1 = this.ua_contains('sonyerricssonx1i');
			this.uiwebview = (this.iphone || this.ipad || this.ipod) && this.webkit && this.ua_contains('!safari');
			return;
		},
		/**
		 * ua에 해당 string이 있는지 여부를 반환한다.
		 * 파라미터로 배열을 넘길 경우 and조건으로 테스트하여 반환한다.
		 * <pre name="code" class="js:nogutter:nocontrols">
		 * // daum.ua == 'mozilla/5.0 (macintosh; u; intel mac os x 10_6_3; en-us) applewebkit/533.4 (khtml, like gecko) chrome/5.0.375.55 safari/533.4'
		 * duam.Browser.ua_contains('chrome') // true
		 * daum.Browser.ua_contains(['mac','applewebkit']) // true
		 * </pre>
		 * @name daum.Browser.ua_contains
		 * @function
		 * @param String||Array obj
		 * @return Boolean
		 * @private
		 * 
		 */
		ua_contains: function(obj){
			var con = (typeof obj == 'string') ? new Array(obj) : obj, r = 0;
			con.each(function(c){
				r += (c.substr(0,1)=='!') ? daum.Browser.ua.indexOf(c.substr(1)) === -1 : daum.Browser.ua.indexOf(c) > -1;
			});
			return con.length === r;
		}
	},
	
	/**
	 * DOM객체를 다루기 위한 편리한 인터페이스를 제공한다.
	 * @namespace DOM객체를 다루기 위한 편리한 인터페이스를 제공한다. 
	 * @name daum.Element
	 */	
	Element: {},

	/**
	 * Event 객체를 손쉽게 관리하기 위해 제공하는 객체이다.
	 * @namespace Event 객체를 손쉽게 관리하기 위해 제공하는 객체이다. 
	 * @name daum.Event
	 */	
	Event: {},

	/**
	 * Function 관련 메소드를 제공한다.
	 * @namespace Function 관련 메소드를 제공한다.
	 * @name daum.Function
	 */		
	Function: {},
	/**
	 * CSS 변환 효과와 관련된 메소드를 제공한다.
	 * @namespace 시각적 효과와 관련된 메소드를 제공한다. 
	 * @name daum.Fx 
	 */
	Fx: {},
	/**
	 * Number형에 관련된 유틸리티 메소드를 제공한다.
	 * @namespace Number형에 관련된 유틸리티 메소드를 제공한다. 
	 * @name daum.Number
	 */			
	Number: {},
	/**
	 * Object관련된 유틸리티 메소드를 제공한다.
	 * @namespace Object관련된 유틸리티 메소드를 제공한다. 
	 * @name daum.Object
	 */
	Object: {
		/**
		 * obj가 Array인지 반환한다.
		 * <pre name="code" class="js:nogutter:nocontrols">
		 * var x = [];
		 * alert(daum.Object.isArray(x)); // true
		 * </pre>
		 * @name daum.Object.isArray
		 * @function
		 * @param Object obj
		 * @return Boolean 
		 */
		isArray: function(obj){
			return (daum.Object.getType(obj)==='Array');
		},
		/**
		 * obj가 Boolean인지 반환한다.
		 * <pre name="code" class="js:nogutter:nocontrols">
		 * var x = true;
		 * alert(daum.Object.isBoolean(x)); // true
		 * </pre>
		 * @name daum.Object.isBoolean
		 * @function
		 * @param Object obj
		 * @return Boolean 
		 */
		isBoolean: function(obj){
			return (daum.Object.getType(obj)==='Boolean');
		},				
		/**
		 * obj가 Function인지 반환한다.
		 * <pre name="code" class="js:nogutter:nocontrols">
		 * var x = function();
		 * alert(daum.Object.isFunction(x)); // true
		 * </pre>
		 * @name daum.Object.isFunction
		 * @function
		 * @param Object obj
		 * @return Boolean 
		 */
		isFunction: function(obj){
			return (daum.Object.getType(obj)==='Function');
		},
		/**
		 * obj가 String인지 반환한다.
		 * <pre name="code" class="js:nogutter:nocontrols">
		 * var x = 'hello world';
		 * alert(daum.Object.isString(x)); // true
		 * </pre>
		 * @name daum.Object.isString
		 * @function
		 * @param Object obj
		 * @return Boolean 
		 */
		isString: function(obj){
			return (daum.Object.getType(obj)==='String');
		},
		/**
		 * obj가 Number인지 반환한다.
		 * <pre name="code" class="js:nogutter:nocontrols">
		 * var x = 123;
		 * alert(daum.Object.isNumber(x)); // true
		 * </pre>
		 * @name daum.Object.isNumber
		 * @function
		 * @param Object obj
		 * @return Boolean 
		 */
		isNumber: function(obj){
			return (daum.Object.getType(obj)==='Number');
		},
		/**
		 * obj가 Object인지 반환한다.
		 * <pre name="code" class="js:nogutter:nocontrols">
		 * var x = {a:'test',b:'yo'};
		 * alert(daum.Object.isObject(x)); // true
		 * </pre>
		 * @name daum.Object.isObject
		 * @function
		 * @param Object obj
		 * @return Boolean 
		 */		
		isObject: function(obj){
			return (daum.Object.getType(obj)==='Object');
		},
		/**
		 * obj의 type을 반환한다.
		 * <pre name="code" class="js:nogutter:nocontrols">
		 * var x = [];
		 * alert(daum.Object.getType(x)); // Array
		 * var y = 'Hello';
		 * alert(daum.Object.getType(y)); // String 
		 * </pre>
		 * @name daum.Object.getType
		 * @function
		 * @param Object obj
		 * @return String
		 */		
		getType: function(obj){
			return Object.prototype.toString.call(obj).toString()
				.match(/\[object\s(\w*)\]$/)[1];
		},
		/**
		 * object를 JSON string으로 반환한다.
		 * @name daum.Object.toJSON
		 * @function
		 * @param Object _obj
		 * @return String
		 * @see daum.toJSON
		 */
		toJSON: function(_obj){
			return daum.toJSON(_obj);
		}
	},	
	/**
	 * String에 관련된 유틸리티 메소드를 제공한다.
	 * @namespace String에 관련된 유틸리티 메소드를 제공한다. 
	 * @name daum.String
	 */				
	String: {},
	/**
	 * 주어진 옵션으로 엘리먼트를 만들어 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * // 사용법 1
	 * var el = daum.createElement('ul',{id:"gogo",style:"border:1px solid red"}); 	 
	 * // 사용법 2 - 태그가 앞뒤로 잘 닫혔는지(well-formed) 확인한다.
	 * var el = daum.createElement('<ul id="gogo" style="border:1px solid red"><li>test1</li><li><test2</li></ul>');
	 * // 위와 같이 만든 후 아래 처럼 삽입할 수 있다.
	 * document.body.appendChild(el);	 
	 * // TR태그는 IE에서 TBODY가 있어야 동적으로 삽입된다는 것을 유의할 것!
	 * </pre>
	 * @name daum.createElement
	 * @function
	 * @param String tagName
	 * @param Object [attributes]
	 * @return Element
	 * @since v1.0_r159
	 */
	createElement: function(cond, attr){
		var tag, opts = '', stack = daum.HTMLStack, ret, tagName, tagSupp, temp;
		if(!attr){
			tag = daum.String.startsWith(cond,'<') ? cond : ('<' + cond + '></' + cond + '>');
		} else {
			for(i in attr){opts += i +'="'+attr[i]+'" ';}
			tag = '<' + cond + ' ' + opts + '></' + cond + '>';
		}
		try{
			stack.innerHTML = tag;
			ret = stack.removeChild(stack.firstChild);
			if(ret.nodeType!==1){
				throw({"message":"shit browser!"});
			} else {
				return ret;
			}
		}catch(e){
			tagName = tag.match(/\w+/).toString().toLowerCase();
			tagSupp = {
				"tbody": ["<table>","</table>"],
				"tr": ["<table><tbody>","</tbody></table>"],
				"td": ["<table><tbody><tr>","</tr></tbody></table>"],
				"option": ["<select>","</select>"]
			};
			if(tagSupp[tagName]){
				stack.innerHTML = tagSupp[tagName][0] + tag + tagSupp[tagName][1];
				temp = stack.removeChild(stack.firstChild);
				return  temp.getElementsByTagName(tagName)[0]; 
			} else {
				return document.createElement(tag);
			}
		}
	},
	/**
	 * @private
	 * @name daum.loadedScripts
	 * @type Object
	 */
	loadedScripts : {},
	/**
	 * @private
	 * @name daum.loadTimer
	 * @type Object
	 */
	loadTimer : {},
	/**
	 * 자바스크립트 파일을 동적으로 페이지에 인클루드시킨다.
	 * 이때 페이지에 인클루드가 완료되면 onsuccess 콜백함수를 실행시킨다.
	 * options 파라메터로 적절한 옵션을 주면 script 테그에 해당하는 프로퍼티를 세팅할 수 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * 	daum.load("http://tvpot.daum.net/js/activeX.js", 
	 * 		function(){daumFlash("tvpot.swf");}, 
	 * 		{ charset : "utf-8" });  // activeX.js 를 불러들이고 완료되면 daumFlash를 실행시킨다.
	 * </pre>
	 * @name daum.load
	 * @function
	 * @param String jsurl Javascript파일의 url
	 * @param Function onsuccess 로드된 후에 실행될 함수
	 * @param Object [options]
	 */
	load : function(jsurl, onsuccess, options){
		if(daum.loadedScripts[jsurl]){ if(onsuccess){onsuccess();} return false; }
		var s, p;
		s = document.createElement("script");
		s.type = "text/javascript";
		for(p in options){
			if(options.hasOwnProperty(p)){
				s.setAttribute(p, options[p]);
			}
		}
		s.src = jsurl;
		daum.$T("head")[0].appendChild(s);
		
		if(!onsuccess){return false;}
		
		s.onreadystatechange = function(){
			if(this.readyState == "loaded" || this.readyState == "complete"){					
				if(!daum.loadedScripts[jsurl]){
					daum.loadedScripts[jsurl] = true;
					onsuccess();
				}
			}
			return;
		};
		s.onload = function(){
			if(!daum.loadedScripts[jsurl]){
				daum.loadedScripts[jsurl] = true; 
				onsuccess();
			}
			return;
		};
		if(daum.Browser.opera){
			daum.loadTimer[jsurl] = window.setInterval(function(){
				if(/loaded|complete/.test(document.readyState)){
					window.clearInterval(daum.loadTimer[jsurl]);
					if(!daum.loadedScripts[jsurl]){onsuccess();}
				}					
			}, 10);
		}
		return true;
	},
	/**
	 * 현재 페이지의 url 파라메터를 JSON형태로 저장하고 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * // http://ui.daum.net/index.html?q=javascript&year=2008&month=12
	 * daum.urlParameter = {
	 * 	q : "javascript",
	 * 	year : "2008",
	 * 	month : "12"
	 * }
	 * </pre>
	 * @name daum.urlParameter
	 * @field
	 * @type Object
	 */
	urlParameter : function(){
		var r={}, t=[], i,
			a=location.search.substr(1).split('&');
		for(i=0;i<a.length;i+=1){t=a[i].split("=");r[t[0]] = t[1];}
		return r;
	}(),
	
	/**
	 * urlParameter에서 name에 해당되는 값을 리턴한다. 일치하는 값이 없으면 null을 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * // http://ui.daum.net/index.html?q=javascript&year=2008&month=12
	 * alert(daum.getParam('year')); // '2008'
	 * alert(daum.getParam('star')); // null
	 * </pre>
	 * @name daum.getParam
	 * @function
	 * @param Sting _name
	 * @return String
	 */
	getParam : function(_name){
		return this.urlParameter[_name] || null;
	},
	/**
	 * DOM조작을 위해 버퍼로 사용할 수 있는 필드들을 생성한다.
	 * @private
	 * @name daum.useHTMLPrototype
	 */
	useHTMLPrototype : function(){
		/**
		 * DOM 조작을 위해 버퍼로 사용할 수 있는 여분의 Document Fragment
		 * @name daum.HTMLFragment
		 * @field
		 * @type Object document or DIV
		 */
		daum.HTMLFragment = (document.createDocumentFragment) ? document.createDocumentFragment() : document.createElement("div");
		/**
		 * DOM 조작을 위해 버퍼로 사용할 수 있는 여분의 div Element
		 * id는 daum_html_prototype
		 * @name daum.HTMLPrototype
		 * @field
		 * @type Element DIV
		 */
		daum.HTMLPrototype = document.createElement("div");
		/**
		 * DOM 조작을 위해 버퍼로 사용할 수 있는 여분의 div Element
		 * id는 daum_html_stack
		 * @name daum.HTMLStack
		 * @field
		 * @type Element DIV
		 */
		daum.HTMLStack = document.createElement("div");
	
		daum.HTMLPrototype.id = "daum_html_prototype";
		daum.HTMLStack.id = "daum_html_stack";
		
		daum.HTMLFragment.appendChild(daum.HTMLPrototype);
		daum.HTMLFragment.appendChild(daum.HTMLStack);
		
		daum.HTMLPrototype.style.position = daum.HTMLStack.style.position = "absolute";
		daum.HTMLPrototype.style.left = daum.HTMLStack.style.left = daum.HTMLPrototype.style.top = daum.HTMLStack.style.top = "-10000px";
		
		return true;		
	}(),
	/**
	 * 객체를 JSON String으로 변환하여 반환한다. 
	 * @name daum.toJSON
	 * @function
	 * @param Object _obj
	 * @return String
	 */
	/** @ignore */
	toJSON : function(obj){
		return JSON.stringify(obj);
	},
	/**
	 * XML도큐먼트를 object로 변환한다.
	 * v1.0_r161 이후 버전부터 attribute에도 접근할 수 있다.
	 * 예제 :
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * &lt;results&gt;
	 *   &lt;application&gt;
	 *       &lt;user_id&gt;vcG1&lt;/user_id&gt;
	 *       &lt;daum_id id="THIS_IS_ID" class="THIS_IS_CLASS"&gt;eighty80&lt;/daum_id&gt;
	 *       &lt;daum_name class="qwerty"&gt;toward43&lt;/daum_name&gt;
	 *       &lt;date&gt;2009-07-02 16:06:17.0 KST&lt;/date&gt;
	 *   &lt;/application&gt;
	 * &lt;/results&gt;
	 * 
	 * // xmlDoc 정의 
	 * xmlDoc = r.responseXML; // ajax로 받아온 xml
	 * x = daum.xmlToObject(xmlDoc); 
	 * alert(x.application.daum_id); // 'eighty80'
	 * alert(x.application['date']); // '2009-07-02 16:06:17.0 KST'
	 * alert(x.application['daum_id@id']); // 'THIS_IS_ID'
	 * alert(x.application['daum_id@class']); // 'THIS_IS_CLASS'
	 * alert(x.application['daum_id@query']); // undefined
	 * </pre>
	 * 
	 * @name daum.xmlToObject
	 * @function
	 * @param xmlDocument
	 * @return Object
	 */	
	xmlToObject : function(xmlDocument){
		var root = xmlDocument.documentElement,
		builder = function(node){
			var obj = {}, cNodes = daum.getChildElements(node), name, value;
			for(var i=0;i<cNodes.length;i+=1){
				name = cNodes[i].nodeName;
				value = (daum.getChildElements(cNodes[i]).length > 0) ? builder(cNodes[i]) : (cNodes[i].firstChild==null) ? '' : cNodes[i].firstChild.nodeValue;
				if(obj[name] != undefined || node.getElementsByTagName(name).length > 1){
					if(obj[name] == undefined){
						obj[name] = [];
					}
					obj[name].push(value);
				}else{
					obj[name] = value;
				}
				for(var j=0;j<cNodes[i].attributes.length;j+=1){
					obj[name + '@' + cNodes[i].attributes[j].nodeName] = (cNodes[i].attributes[j].nodeValue||"").toString();
				}
			}
			return obj;
		};
		return builder(root);
	},
	/**
	 * JSON string을 Object로 변환한다.
	 * firefox나 safari에서는 native JSON객체를 사용한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * // 내부에 double quotation이 있을때에는 \\를 사용
	 * var str = '{"title":"\\"따옴표\\""}';
	 * var obj = daum.jsonToObject( str );
	 * alert(obj.title); // "따옴표"
	 * </pre>
	 * @name daum.jsonToObject
	 * @function
	 * @param String jsonStr
	 * @return Object
	 */	
	jsonToObject : function(jsonStr){
		return JSON.parse(jsonStr);
	},	
	/**
	 * getElementById의 기능을 축약형으로 사용한다.
	 * @name daum.$
	 * @function
	 * @param String||Element
	 * @return Element
	 */
	$: function(obj){
		return typeof obj == 'string' ? document.getElementById(obj): obj;
	},

	/**
	 * 유사배열 형태의 iterator 객체를 배열처럼 사용 가능하도록 새로운 배열로 리턴해준다.
	 * 
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var atags = daum.$A( document.getElementsByTagName("a") );
	 * atags.push(document.createElement("a"));
	 * // atags는 push메소드를 사용할 수 있는 배열형태로 변환되었다.
	 * // 이 메소드는 string에도 유용하게 사용될 수 있다.
	 * daum.$A('HELLO'); // ['H','E','L','L','O'] 
	 * </pre>
	 * @name daum.$A
	 * @function
	 * @param Object unarray
	 * @return Array
	 */	
	$A: function(unarray){
		if(!unarray){return [];}
	    if(unarray instanceof Array && !daum.Browser.opera){return unarray;}
	    var u = (typeof unarray=='string' && (daum.Browser.iemobile || daum.Browser.opera)) ? unarray.split('') : unarray, result;
	    try{
	    	result = Array.prototype.slice.call(u);
	    }catch(e){
	    	result = [];
    	    for(var i=0; i<unarray.length;i+=1){
    	        result.push(unarray[i]);
    	    }
	    }
	    return result;
	},
	
	/**
	 * daum.Element.getElementsByClassName의 기능을 축약형으로 사용한다. el은 기준이 되는 HTML객체를 가리킨다.
	 * 해당되는 값이 없을 경우에는 null이 리턴된다. 
	 * <pre name="code" class="js:nogutter:nocontrols"> 
	 * var buttons = daum.$C(panel, "button"); 
	 * //panel 내부의 button이라는 class를 가짂 모든 객체를 가져온다.
	 * //아래와 같이 class를 space로 구분하여 여러 개를 and조건으로 가져올 수 있다.
	 * var imgs = daum.$C(panel, "imageA imageB");
	 * </pre> 
	 * @name daum.$C
	 * @function
	 * @param Element||String el 기준 엘리먼트
	 * @param String _cname class이름
	 * @return Object nodeList
	 */
	$C: function(el, _cname){
		var e = daum.$(el);
		return (e!==null) ? daum.Element.getElementsByClassName(e, _cname): null;
	},
	
	/**
	 * 객체에 daum.Element의 모든 멤버를 methodize시킨다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var topWrap = daum.$E("topWrap");
	 * topWrap.hide();
	 * //topWrap은 daum.Element의 모든 멤버를 사용할 수 있다.
	 *  
	 * // 1.0_r158 버전부터 아래도 가능하다.
	 * topWrap.addEvent('click',func);
	 * topWrap.removeEvent('click',func);
	 * </pre> 
	 * @name daum.$E
	 * @function
	 * @param Element||String obj 목적객체
	 * @return Element 
	 */
	$E: function(obj){
		var e = daum.$(obj);
		if(e){
			daum.extendMethods(e, daum.Element, false);
			e.addEvent = daum.methodize(daum.Event.addEvent);
			e.removeEvent = daum.methodize(daum.Event.removeEvent);
		}
		return e;
	},
	
	/**
	 * 엘리먼트 el의 value 값을 반환한다. type이 checkbox일 경우 혹은 
	 * select 태그이며, 속성이 multiple인 경우에는 선택된 값을 array로 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * //<input type="text" id="myid1" value="jihong" />
	 * //<input type="HIDDEN" id="myid2" value="yo_hidden" />
	 * //<input type="password" id="myid3" value="yo_password" />
	 * alert(daum.$F('myid1')); // jihong
	 * alert(daum.$F('myid2')); // yo_hidden
	 * alert(daum.$F('myid3')); // yo_password
	 * 
	 * //<input type="RADIO" id="myname1" name="myradio" value="imyours" />
	 * //<input type="radio" id="myname2" name="myradio" value="imnotyours" checked="checked" />
	 * //<input type="RADIO" id="myname3" name="myradio" value="imyoursewew" />
	 * // id로 element를 찾은 후, name값으로 검색하여 checked된 값만 가져온다. 
	 * alert(daum.$F('myname1')); // imnotyours
	 * alert(daum.$F('myradio')); // imnotyours - name값으로 검색한 결과
	 * 
	 * //<input type="checkbox" id="myname5" name="lucky" value="l5" />
	 * //<input type="checkbox" id="myname6" name="lucky" value="l6" checked="checked" />
	 * //<input type="checkbox" id="myname7" name="lucky" value="l7" checked="checked" />
	 * //<input type="checkbox" id="myname8" name="lucky" value="l8" />
	 * //<input type="checkbox" id="myname9" name="lucky" value="l9" checked="checked" />
	 * alert(daum.$F('myname5')); // ['l6','l7','l9']  array로 리턴된다.
	 * alert(daum.$F('lucky')); // ['l6','l7','l9']  array로 리턴된다.
	 * </pre>
	 * @name daum.$F
	 * @function
	 * @param Element||String el 해당 객체의 id, 혹은 name(checkbox/radio일 경우)
	 * @return String||Array
	 * 
	 */
	$F: function(el){
		var e = daum.$(el) || document.getElementsByName(el)[0], i, elm, ret;
		if(!e || (e.tagName !== 'INPUT' && e.tagName !== 'SELECT' && e.tagName !== 'TEXTAREA')){return '';}
		if(e.type=='radio' || e.type=='checkbox'){
			for(i=0,elm=document.getElementsByName(e.name),ret=new Array();i<elm.length;i+=1){
				if(elm[i].checked){ret.push(elm[i].value);}
			}
			ret = (e.type=='radio') ? ret[0]: ret;
		} else if(e.type =='select-multiple'){
			for(i=0,elm=daum.Element.getChildElements(e),ret=new Array();i<elm.length;i+=1){
				if(elm[i].selected){ret.push(elm[i].value);}
			}
		} else {
			if(e.value){ret = e.value;}
		}
		return ret;
	},
	/**
	 * getElementsByTagName의 기능을 축약형으로 사용한다. node는 기준이 되는 HTML객체를 가리킨다. 생략하면 document로 인식한다.
	 * 퍼포먼스상 이것보다는 daum.$$('div')를 사용하는 것이 좋다.
	 *  <pre name="code" class="js:nogutter:nocontrols">
	 *  var atags = daum.$T("a", panel);   // panel이라는 객체 내의 모든 a태그 엘리먼트를 가져온다.
	 *  var atags2 = daum.$$('#panel a'); // panel이라는 id를 가진 객체 내의 모든 a태그 엘리먼트를 가져온다.
	 *  </pre> 
	 * @name daum.$T
	 * @function
	 * @param String tagName 얻고자 하는 태그
	 * @param Element [node] document
	 * @return Element
	 */
	
	$T: function(tagName,node){
		return (node || document).getElementsByTagName(tagName);
	},
	/**
	 * document가 load되었는지 아닌지 담고있는 변수
	 * @name daum.documentLoaded
	 * @private
	 * @type Boolean
	 */
	documentLoaded: false,
	
	/**
	 * source 객체의 멤버함수의 첫번째 인자를 dest의 this로 인식 가능하도록 
	 * methodize된 함수를 복사한다.
	 * overwrite가 false이면 dest에 동일 멤버가 존재할 경우 복사하지 않는다. 기본값을 true
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * daum.extendMethods(Function.prototype, daum.Function, false);
	 * // daum.Function의 멤버들을 Function.prototype 으로 확장시켜서 native 
	 * Method로써 사용가능하게 한다.
	 * </pre>
	 * @name daum.extendMethods
	 * @function
	 * @param Object dest	목적객체
	 * @param Object source	원본객체
	 * @param Boolean [overwrite]	덮어쓰기(default true)
	 * @return Object
	 */
	extendMethods: function(dest, source, overwrite){
		var ow = overwrite !== undefined ? overwrite: true, p;
		for(p in source){ 
			if(!dest[p] || ow){
				if(typeof(source[p]) == "function"){dest[p] = daum.methodize(source[p]);}
			}
		}
		return dest;
	},

	/**
	 * method 인자로 받은 메소드의 첫번째 인자가 this를 가리키도록 조합한 새로운 메소드를 
	 * 리턴한다. native 확장을 위한 장치로써 주로 사용된다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * document.getElementById("panel").show = daum.methodize(daum.Element.show);
	 * // daum.Element.show의 첫번째 인자는 this. 즉 "panel" 을 가리키도록 수정된 함수가 생성 
	 * </pre>
	 * @name daum.methodize
	 * @function
	 * @param Function method 
	 * @return Function
	 */	
	methodize: function(method){
		if(navigator.userAgent.toLowerCase().indexOf('opera')>-1){
			// http://play.daumcorp.com/x/iBBGAQ
			var args = daum.$A(arguments);
			return function(args){
				return method.apply(null, [this].concat(args));
			};
		} else {
			return function(){
				return method.apply(null, [this].concat(daum.$A(arguments)));
			};
		}
		
	},

	/**
	 * jigu의 장점을 극대화 하기위하여 jigu의 native 확장 모듈을 javascript native 
	 * 객체들에 직접 확장을 해준다. 단. 이미 메소드가 존재할 경우는 무시된다.
	 * @name daum.nativeExtend
	 * @function
	 */
	nativeExtend: function(){
		var natives = [[daum.Object, Object],
		               [daum.String, String.prototype], 
		               [daum.Number, Number.prototype], 
		               [daum.Array, Array.prototype], 
		               [daum.Function, Function.prototype]], i;

//		Array.prototype.isArray = true; 
//		Number.prototype.isNumber = true; 
//		String.prototype.isString = true; 
//		Function.prototype.isFunction = true;
		
		for(i=0; i<natives.length; i+=1){
			daum.extendMethods(natives[i][1], natives[i][0], false);
		}
	},
	
	/**
	 * min 과 max 범위 내(min과 max를 포함한 값)에서 random 숫자값을 생성한다.
	 * @name daum.random
	 * @function
	 * @param Number min 최소값
	 * @param Number max 최대값
	 * @return Number
	 */
	random: function(min, max){
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
});
})();
daum.extend(daum.Array,{
	/**
	 * null 이나 undefined 값을 가지지 않는 배열을 리턴한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var arr = [];
	 * arr[0] = 1;  arr[10] = 11; //arr.length 는 11
	 * arr = daum.Array.compact(arr); //arr.length 는 2;
	 * </pre>
	 * @name daum.Array.compact
	 * @function
	 * @param Array a
	 * @return Array
	 */
	compact: function(a){
		if(!a)return [];
		var ret = [], i;
		for(i=0; i<a.length; i+=1){
			if(!(a[i] === null || typeof(a[i]) === "undefined")){
				ret.push(a[i]);
			}
		}
		return ret;
	},	
	/**
	 * 배열의 각 원소를 돌면서 함수 f를 실행한다. 
	 * 이때 함수 f의 첫번째 인자로 각 원소가 전달되고, 두번째 인자로 index가 전달된다.
	 * @name daum.Array.each
	 * @function
	 * @param Array a
	 * @param Function func
	 */
	each: function(a, func){
		if(Array.prototype.forEach){
			return a.forEach(func);
		}
		for(var i=0; i<a.length; i+=1){
			func(a[i], i);
		}
	},
	/**
	 * 배열 a에서 _find와 같은 값을 가진 원소의 index를 리턴한다. 
	 * _find는 어떠한 형식이든 올 수 있다. 일치하는 원소가 없으면 -1을 리턴한다.
	 * @name daum.Array.indexOf
	 * @function
	 * @param Array a
	 * @param Object _find
	 * @return Number position 
	 */
	indexOf: function(/*a, _find*/){
		if([].indexOf){
			return function(a, _find){
				return a.indexOf(_find);
			};
		}else{
			return function(a, _find){
				for(var i=0;i<a.length;i+=1){if(a[i] === _find){return i;}}
				return -1;
			};
		}
	}(),
	/**
	 * 배열 a에서 _find와 같은 값의 원소가 있는지를 리턴한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var arr = [1,2,3,4,5];
	 * alert(daum.Array.contains(arr,3)); // true
	 * alert(daum.Array.contains(arr,'q')); // false
	 * </pre>
	 * @name daum.Array.contains
	 * @function
	 * @param Array a
	 * @param Object _find
	 * @return Boolean
	 * @since v1.0_r126
	 */
	contains: function(a, _find){
		return a.indexOf(_find) > -1;
	},	
	/**
	 * 현재 배열과 같은 내용을 갖는 새로운 배열을 리턴한다.
	 * 새로 리턴된 배열은 현재 배열과 별개의 레퍼런스를 가진다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var arr = [1,2,3,4,5];
	 * var newarr = daum.Array.copy(arr);
	 * arr[0] = 10; //newarr[0] 은 10이 아니라 1이다.
	 * </pre> 
	 * @name daum.Array.copy
	 * @function
	 * @param Array a
	 * @return Array
	 */
	copy : function(a){
		var clone = [], i, p;
		for(i=0; i<a.length; i++){
			if (a[i].constructor == a.constructor){
				clone[i] = daum.Array.copy(a[i]);
			}else if(typeof(a[i]) == 'object'){
				if(typeof(a[i].valueOf()) == 'object'){
					clone[i] = a[i].constructor();		
					for (p in a[i]){clone[i][p] = a[i][p];}						
				}else{
					clone[i] = a[i].constructor(a[i].valueOf());
				}
			}else{
				clone[i] = a[i];
			}
		}
		return clone;
	},
	/**
	 * 배열 a의 각 원소에 f를 실행한 결과를 할당한 배열을 반환한다.
	 * Firefox/Safari 등 native에 Array.prototype.map이 구현되어 있는 경우는
	 * 그것을 사용한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * s = [1,2,3,4,5];
	 * f = function(x){return x+10;}
	 * r = s.map(f); // r은 [11,12,13,14,15]
	 * </pre>
	 * @name daum.Array.map
	 * @function
	 * @param Array a
	 * @param Function f
	 * @return Array
	 */
	map : function(a, f){
		if(typeof Array.prototype.map==='function' 
			&& Array.prototype.map.toString().indexOf('native') > 0){
			return a.map(f);
		}
		for (var b = [], i = 0, n = a.length; i < n; ++i){
			b[i] = f(a[i], i);
		}
		return b;
	},
	/**
	 * 현재 배열 a에서 null이나 undefined값을 지닌 원소를 제외한 배열의 실제크기를 리턴한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var arr = [];
	 * arr[0] = 1;  arr[10] = 11; //arr.length 는 11
	 * var s = daum.Array.size(arr); //s 는 2
	 * </pre>
	 * @name daum.Array.size
	 * @function
	 * @param Array a
	 * @return Number
	 * @see daum.Array.compact
	 */
	size : function(a){
		return daum.Array.compact(a).length;
	},
	/**
	 * 현재 배열 a의 원소중 중복된 값을 제거한 새로운 배열을 리턴한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var arr = [0,1,1,2,2,3,3,4,4];
	 * var uniqarr = daum.Array.uniq(arr); // uniqarr의 내용은 [0,1,2,3,4] 이다.
	 * </pre>
	 * @name daum.Array.uniq
	 * @function
	 * @param Array a
	 * @return Array
	 */
	uniq : function(a){
		var ret = [], i;
		for(i=0;i<a.length;i++){
			//if(daum.Array.indexOf(ret, a[i]) == -1){ret.push(a[i]);}
			if(!daum.Array.contains(ret, a[i])){ret.push(a[i]);}
		}
		return ret;
	},
	/**
	 * 현재배열 a의 첫번째 원소를 리턴한다.
	 * @name daum.Array.getFirst
	 * @function
	 * @param Array a
	 * @return Object
	 */
	getFirst : function(a){ return a[0];},
	/**
	 * 현재배열 a의 마지막 원소를 리턴한다.
	 * @name daum.Array.getLast
	 * @function
	 * @param Array a
	 * @return Object
	 */
	getLast : function(a){ return a[a.length-1];}
});
daum.extend(daum.Browser,{
	/**
	 * 현재 브라우저의 표시영역의 크기를 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var size = daum.Browser.getWindowSize();
	 * // size.width = 1024, size.height = 768
	 * </pre> 
	 * @name daum.Browser.getWindowSize
	 * @function
	 * @return Object {width:w,height:h}
	 */	
	getWindowSize : function(){
		var w = (document.documentElement.clientWidth || document.body.clientWidth || 1003) - 2,
			h = (document.documentElement.clientHeight || document.body.clientHeight || 650) - 2;		
		return {"width":w,"height":h};
	},
	
	/**
	 * 브라우저 화면의 스크롤값을 구한다.
	 * @name daum.Browser.getScrollOffsets
	 * @function
	 * @since v1.0_r116
	 * @return Object {left:0,top:0}
	 */
	getScrollOffsets : function(){
		return {
			'left' : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
			'top' :  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		};
	},
	/**
	 * Cookie 변수를 생성한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * daum.Browser.setCookie("nopop", "true", 30); 
	 * // 30일동안 지속되는 쿠키 "nopop" 생성
	 * </pre>
	 * @name daum.Browser.setCookie
	 * @function
	 * @param String name
	 * @param String value
	 * @param Number [expires day]
	 */
	setCookie : function(name,value,expires){
		var d = new Date(), day="";
		if(expires){
			d.setDate(d.getDate()+expires);
			day = "expires="+d.toGMTString()+";";
		}
		document.cookie = name+"="+escape(value)+"; path=/;"+day;
	},
	/**
	 * Cookie 변수값을 반환한다.
	 * @name daum.Browser.getCookie
	 * @function
	 * @param String name
	 * @return String
	 */
	getCookie : function(name){
		var _name = name + "=",
			cookie = document.cookie + ";", 
			start = cookie.indexOf(_name), end;
		if (start != -1){
			end = cookie.indexOf(";",start);
			return unescape(cookie.substring(start + _name.length, end));
		}
		return;
	},
	/**
	 * Cookie 변수를 삭제한다.
	 * @name daum.Browser.delCookie
	 * @function
	 * @param String name
	 */	
	delCookie : function(name){
		document.cookie = name + "=;expires=Fri, 31 Dec 1987 23:59:59 GMT;";
	}
});
daum.extend(daum.Element,{
	/**
	 * 객체 el의 하위 노드들중 빈 텍스트(스페이스,줄바꿈 등)를 가진 노드들을 삭제한다.
	 * 비IE브라우저에서는 el.childNodes에서 공백을 텍스트노드로 반환하는데, 
	 * 이들을 제거한 el을 반환한다.
	 * @name daum.Element.cleanBlankNodes
	 * @function
	 * @param Element el
	 * @return Element el
	 * @since v1.0_r135
	 */
	cleanBlankNodes: function(el){
		var e = daum.$(el), i = e.firstChild;
		try{
			do {
				if (i.nodeType === 3 && !/\S/.test(i.nodeValue)){
					e.removeChild(i);
				}
			} while(i = i.nextSibling);
		}catch(e){}
       return e;
	},
	/**
	 * 객체 el 하위에 존재하는 모든 노드들을 배열로 반환한다. 텍스트노드는 제외된다.
	 *  @name daum.Element.getChildElements
	 *  @function
	 *  @param Element el
	 *  @return Array
	 */
	getChildElements: function(el){
		var i = daum.$(el).firstChild, a = [];
		try{
			do {
				if (i.nodeType === 1){
					a.push(i);
				}
			} while(i = i.nextSibling);
		}catch(e){}
		return a;
	},		
	/**
	 * 객체 el의 자식노드들 중 class name이 cname인 노드들을 배열로 반환한다.
	 * 값이 없을 경우 null이 리턴된다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * buttons = daum.Element.getElementsByClassName(document, "button");
	 * // button이라는 클래스네임을 가진 document의 모든 노드를 얻어온다.
	 * </pre>
	 * @name daum.Element.getElementsByClassName
	 * @function
	 * @param Element el
	 * @param String cname
	 * @return {Array[Element]}
	 */
	getElementsByClassName: function(el, cname){
		// native code 가 있을 경우
		if(document.getElementsByClassName.toString().indexOf('code')>0){
			return daum.$A(el.getElementsByClassName(cname));
		}
		// sizzle selector를 이용
		var is = el == document || el == document.body || el == window;
		if(is || el.id){
			return daum.$$((is ? '' : '#'+el.id+' ') + '.'+daum.String.trim(cname).replace(/\s+/g,'.'));
		}
		// 많이 힘든 경우
		var nodes = daum.$(el).getElementsByTagName("*"), element = [], i;
		for(i=0; i<nodes.length; i+=1){
			if(daum.Element.hasClassName(nodes[i], cname)){
				element.push(nodes[i]);
			}
		}
		return (element.length > 0) ? element: [];
	},

	/**
	 * 객체 el의 firstChild를 반환한다. 
	 * 텍스트 노드일 경우는 무시하고 DOM 객체만을 반환한다.
	 * @name daum.Element.getFirstChild
	 * @function
	 * @param Element el
	 * @return Element
	 */		
	getFirstChild: function(el){
		var fchild = daum.$(el).firstChild;
		while(fchild && fchild.nodeType !== 1){fchild = fchild.nextSibling;}
		return fchild;
	},
	/**
	 * 객체 el의 lastChild를 반환한다. 
	 * 텍스트 노드일 경우는 무시하고 DOM 객체만을 반환한다.
	 * @name daum.Element.getLastChild
	 * @function
	 * @param Element el
	 * @return Element
	 */
	getLastChild: function(el){
		var lchild = daum.$(el).lastChild;
		while(lchild && lchild.nodeType !==1){
			lchild = lchild.previousSibling;
		}
		return lchild;
	},
	/**
	 * 현재 객체 el의 nextSibling을 반환한다. 
	 * 텍스트 노드일 경우는 무시하고 DOM 객체만을 반환한다.
	 * @name daum.Element.getNext
	 * @function
	 * @param Element el
	 * @return Element
	 */
	getNext: function(el){
		var next = daum.$(el).nextSibling;
		while(next && next.nodeType !== 1){next = next.nextSibling;}
		return next;
	},
	/**
	 * 현재 객체 el의 previousSibling을 반환한다. 
	 * 텍스트 노드일 경우는 무시하고 DOM 객체만을 반환한다.
	 * @name daum.Element.getPrev
	 * @function
	 * @param Element el
	 * @return Element
	 */
	getPrev: function(el){
		var prev = daum.$(el).previousSibling;
		while(prev && prev.nodeType !== 1){prev = prev.previousSibling;}
		return prev;
	},
	/**
	 * 현재 객체 el의 parentNode를 반환한다.
	 * @name daum.Element.getParent
	 * @function
	 * @param Element el
	 * @return Element
	 */		
	getParent: function(el){
		return daum.$(el).parentNode;
	},
	/**
	 * 현재 객체 e의 화면상의 절대 좌표를 반환해준다. 
	 * getBoundingClientRect와 기능상 유사하다.
	 * @name daum.Element.getCoords
	 * @function
	 * @param Element el
	 * @param Boolean [useOffset]
	 * @param Element [parent]
	 * @return Object {left:x,top:x,right:x,bottom:x}
	 */				
	getCoords: function(el, useOffset, parent){
		var uo = useOffset || false,
			pa = daum.$(parent) || false,
			e = daum.$(el),
			w = e.offsetWidth,
			h = e.offsetHeight,
			coords = { "left": 0, "top": 0, "right": 0, "bottom": 0 },
			p;
		while(e){
			coords.left += e.offsetLeft || 0;
			coords.top += e.offsetTop || 0;
			e = e.offsetParent;
			if(uo){
				if(e){
					if(e.tagName == "BODY"){break;}
					p = daum.Element.getStyle(e, "position");
					if(p !== "static"){break;}
				}
			}
			if(pa && pa == e ){ break;}
		}
		coords.right = coords.left + w;
		coords.bottom = coords.top + h;
		return coords;
	},
	/**
	 * 현재 객체 e의 상위 엘리먼트를 기준으로 한 좌표를 반환해 준다.
	 * @name daum.Element.getCoordsTarget
	 * @function
	 * @param Element el
	 * @param  Element parent
	 * @return Object {left:x,top:x,right:x,bottom:x}
	 * @see daum.Element.getCoords
	 */
	getCoordsTarget:function(el, parent){
		return daum.Element.getCoords(el, false, parent);
	},
	/**
	 * 현재 객체 e에 inline 혹은 cssRule등으로 표현된 style 속성 cssProp를 얻어온다.
	 * 모질라 계열에서 style 속성 이름이 다를경우 mozCssProperty를 사용할 수 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * // <div style="font-size:12px;background-color:red;" id="test"></div>
	 * var fs = daum.Element.getStyle('test','font-size') // 12px
	 * // 아래와 같이 쓸 수도 있다.
	 * var fs = daum.Element.getStyle('test','fontSize') // 12px
	 * </pre>
	 * <strong>warning: 느려질 수 있으니 조심해서 사용하세요!</strong> 
	 * @name daum.Element.getStyle
	 * @function
	 * @param Element el
	 * @param String cssProp
	 * @param String [mozCssProperty]
	 * @return String
	 */
	getStyle: function(el, cssProp, mozCssProperty){
		var e = daum.$(el), result, cp,
			cssProperty,
   			mozcssproperty = mozCssProperty || cssProp;
		if(cssProp.toLowerCase()=='float'){
			cssProperty = (daum.Browser.ie) ? 'styleFloat': 'cssFloat'; 
		} else {
			cssProperty = cssProp;
		}
		if(e.currentStyle){
			cp = (cssProperty.indexOf('-')!==-1) ? 
					cssProperty.replace(/[\-](.)/g, 
							function(s,t){return t.toUpperCase();}): 
					cssProperty;
			result = e.currentStyle[cp];
		} else {
			cp = (/[A-Z]/.test(mozcssproperty)) ? 
					mozcssproperty.replace(/([A-Z])/g, 
							function(s,t){return '-'+t.toLowerCase();}): 
					mozcssproperty;
			result = document.defaultView.getComputedStyle(e, null)
						.getPropertyValue(cp);
		}
   		return result;
	},		
	/**
	 * 객체 el이 cname이라는 class name을 가지면 true를 반환한다. 
	 * cname은 space로 구분되어 두 개 이상이 들어갈 수 있다. 그럴 경우 and 조건으로
	 * 체크된다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * // <div id="test" class="nana miso were">test</div>
	 * daum.Element.hasClassName('test','nana'); // true
	 * daum.Element.hasClassName('test','miso nana'); // true
	 * daum.Element.hasClassName('test','miso momo'); // false
	 * daum.Element.hasClassName('test','   miso nana  '); // true
	 * daum.Element.hasClassName('test','miso were nana'); // true
	 * </pre>
	 * 
	 * @name daum.Element.hasClassName
	 * @function
	 * @param Element el
	 * @param String cname
	 * @return Boolean
	 */
	hasClassName: function(el, cname){
		var cn = daum.String.trim(daum.$(el).className), ca = daum.String.trim(cname), 
			result = 0, x, xn, ret;
		if(ca.indexOf(' ')>0){
			x = ca.replace(/\s+/g,' ').split(' '), xn = cn.split(' ');
			x.each(function(mx){
				result += (xn.indexOf(mx) > -1) ? 1 : 0;
			});
			ret = x.length === result;
		} else {
			ret = cn.length > 0 && (cn == ca || 
				new RegExp("(^|\\s)" + ca + "(\\s|$)").test(cn));
		}
		return ret;
	},
	/**
	 * 현재 객체 el의 display style 속성을 검사하여 현재 보여지고 있는 객체인지를 검사한다.
	 * @name daum.Element.visible
	 * @function
	 * @param Element el
	 * @return Boolean
	 */		
	visible: function(el){
		var e = daum.$(el);
		return !(e.offsetWidth === 0 && e.offsetHeight === 0);
	},
	/**
	 * 현재 객체 el의 display style 속성을 조정하여 현재 객체를 보여지게 한다.
	 * default는 block이지만 display파라미터가 있을 경우는 그것으로 적용된다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var el = daum.$('div1');
	 * daum.Element.show(el); // display:block으로 정의된다.
	 * var el2 = daum.$('span1');
	 * daum.Element.show(el2,'inline'); // display:inline으로 정의된다.
	 * </pre>
	 * @name daum.Element.show
	 * @function
	 * @param Element el
	 * @param String [display] inline...
	 * @return Element el
	 */		
	show: function(el, display){
		var e = daum.$(el); 
		e.style.display = display || 'block';
		return e;
	},	
	/**
	 * 현재 객체 el의 display style 속성을 "none" 으로 조정하여 현재 객체를 보이지 않게 한다.
	 * @name daum.Element.hide
	 * @function
	 * @param Element el
	 * @return Element el
	 */				
	hide: function(el){
		var e = daum.$(el);
		e.style.display = "none";
		return e;
		
	},
	/**
	 * 현재 객체 el의 display style 속성을 검사하여 한번 호출할때 마다 
	 * show 혹은 hide를 번갈아 호출한다.
	 * 보이는 것은 보이지 않게, 보이지 않는 것은 보이게 토글한다.
	 * 옵션인 display파라미터로 inline으로 제어할 수 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var el = daum.$('div1');
	 * daum.Element.toggle(el); // display:none/block으로 토글된다.
	 * var el2 = daum.$('span1');
	 * daum.Element.toggle(el2,'inline'); // display:none/inline으로 토글된다.
	 * </pre>
	 * @name daum.Element.toggle
	 * @function
	 * @param Element el
	 * @param String [display] inline...
	 * @return Element el
	 */					
	toggle: function(el, display){
		var e = daum.$(el);
		return (daum.Element.visible(e)) ? 
				daum.Element.hide(e): 
				daum.Element.show(e, display || 'block');
	},
	
	/**
	 * 현재 객체 el에 cname이라는 클래스네임을 추가한다.
	 * @name daum.Element.addClassName
	 * @function
	 * @param Element||String el
	 * @param String el
	 * @return Element el
	 */
	addClassName: function(el, cname){
		var e = daum.$(el);
		if(daum.Element.hasClassName(e, cname)){return e;} 
		e.className = (daum.String.trim(e.className) === '') ? 
				cname: e.className + ' ' + cname;
		return e;
	},
	/**
	 * 객체 el에서 cname이라는 클래스네임을 제거한다.
	 * @name daum.Element.removeClassName
	 * @function
	 * @param Element el
	 * @param String cname
	 * @return Element el
	 */
	removeClassName: function(el, cname){
		return daum.Element.replaceClassName(el, cname, '');
	},
	/**
	 * 객체 el에서 src라는 className을 tgt라는 className으로 변경한다.
	 * @name daum.Element.replaceClassName
	 * @function
	 * @param Element el
	 * @param String src(className)
	 * @param String tgt(className)
	 * @return Element el
	 */
	replaceClassName: function(el, src, tgt){
		var e = daum.$(el),
			classNames =e.className.split(' '), i;
		for(i=0;i<classNames.length;i+=1){
			if(classNames[i]==src){classNames[i]=tgt;}
		}
		e.className = daum.String.replaceAll(
				daum.String.trim(classNames.join(' ')), /\s+/, ' ');
		return e;
	},
	/**
	 * 현재 객체 el의 투명도를 조정한다. 투명도 인자인 op는 1.0이 가장 큰 값이다
	 * @name daum.Element.setOpacity
	 * @function
	 * @param Element el
	 * @param Float op: 0~1.0
	 */
	setOpacity: function(el, op){
		var e = daum.$(el);
		e.style.filter='alpha(opacity='+op*100+')';
		e.style.opacity = e.style.MozOpacity = e.style.KhtmlOpacity = op;
		return e;
	},	
	/**
	 * 현재 객체 el의 위치 style값 left를 설정한다. 자동으로 "px" suffix를 추가한다.
	 * isOffset값이 true일 경우에는 el의 style.left값에 _left를 더한다.
	 * @name daum.Element.setLeft
	 * @function
	 * @param String||Element el
	 * @param Number _left
	 * @param Boolean [isOffset]
	 */
	setLeft : function(el, _left, isOffset){
		return daum.Element.setStyleProperty(el, 'left', _left, isOffset); 
	},
	/**
	 * 현재 객체 el의 위치 style값 top을 설정한다. 자동으로 "px" suffix를 추가한다.
	 * isOffset값이 true일 경우에는 el의 style.top값에 _top을 더한다.
	 * @name daum.Element.setTop
	 * @function
	 * @param String||Element el
	 * @param Number _top
	 * @param Boolean [isOffset]
	 */	
	setTop : function(el, _top, isOffset){
		return daum.Element.setStyleProperty(el, 'top', _top, isOffset);
	},
	/**
	 * 현재 객체 el의 가로넓이 style값 width를 설정한다. 자동으로 "px" suffix를 추가한다.
	 * isOffset값이 true일 경우에는 el의 style.width값에 _width를 더한다.
	 * @name daum.Element.setWidth
	 * @function
	 * @param String||Element el
	 * @param Number _width
	 * @param Boolean [isOffset]
	 */
	setWidth : function(el, _width, isOffset){
		return daum.Element.setStyleProperty(el, 'width', _width, isOffset);
	},
	/**
	 * 현재 객체 el의 세로높이 style값 height를 설정한다. 자동으로 "px" suffix를 추가한다.
	 * isOffset값이 true일 경우에는 el의 style.height값에 _height를 더한다.
	 * @name daum.Element.setHeight
	 * @function
	 * @param String||Element el
	 * @param Number _height
	 * @param Boolean [isOffset]
	 */
	setHeight : function(el, _height, isOffset){
		return daum.Element.setStyleProperty(el, 'height', _height, isOffset);	
	},
	/**
	 * 현재 객체 el의 위치 style값 left와 top을 설정한다. 자동으로 "px" suffix를 추가한다.
	 * isOffset값이 true일 경우에는 el의 기존 left, top값에 주어진 값을 더한다.
	 * @name daum.Element.setPosition
	 * @function
	 * @param String||Element el
	 * @param Number _left
	 * @param Number _top
	 * @param Boolean [isOffset]
	 */	
	setPosition : function(el, _left, _top, isOffset){
		daum.Element.setStyleProperty(el, 'left', _left, isOffset);
		return daum.Element.setStyleProperty(el, 'top', _top, isOffset);
	},
	/**
	 * 현재 객체 el의 크기 style값 width와 height을 설정한다. 자동으로 "px" suffix를 추가한다.
	 * isOffset값이 true일 경우에는 el의 기존 width, height값에 주어진 값을 더한다.
	 * @name daum.Element.setSize
	 * @function
	 * @param String||Element el
	 * @param Number _width
	 * @param Number _height
	 * @param Boolean [isOffset]
	 */	
	setSize : function(el, _width, _height, isOffset){
		daum.Element.setStyleProperty(el, 'width', _width, isOffset);
		return daum.Element.setStyleProperty(el, 'height', _height, isOffset);
	},

	/**
	 * style속성을 정의합니다.
	 * @private
	 * @name daum.Element.setStyleProperty
	 * @function
	 * @param String||Element el
	 * @param String name
	 * @param Number val
	 * @param Boolean [isOffset]
	 * @return Element e
	 */
	setStyleProperty : function(el, name, val, isOffset){
		var e = daum.$(el), r; 
		if(isOffset || false) {
			r = (isNaN(parseInt(e.style[name]))) ? 
				parseInt(e['offset' + (name.replace(/^(.)/g, 
						function(s,t){return t.toUpperCase();}) )]) + val :
				parseInt(e.style[name]) + val;
		} else {
			r = val;
		}
		e.style[name] = daum.String.px(r);
		return e;
	},
	/* for backward compatibility */
	setLeftByOffset : function(el,val){return daum.Element.setLeft(el,val,true);},
	setTopByOffset : function(el,val){return daum.Element.setTop(el,val,true);},
	setWidthByOffset : function(el,val){return daum.Element.setWidth(el,val,true);},
	setHeightByOffset : function(el,val){return daum.Element.setHeight(el,val,true);},
	setPositionByOffset : function(el,_l,_t){return daum.Element.setPosition(el,_l,_t,true);},
	setSizeByOffset : function(el,_w,_h){return daum.Element.setSize(el,_w,_h,true);},
	
	/**
	 * el을 화면에 보이지 않는 곳으로 치워버린다.
	 * @name daum.Element.posHide
	 * @function
	 * @param String||Element el
	 * @return Element el
	 */
	posHide : function(el){
		var e = daum.$(el);
		daum.Element.setPosition(e, -10000, -10000);
		return e;
	},
	/**
	 * 현재 객체 e의 style값을 일반적인 inline style을 사용하듯이 cssText를 사용하여 설정해준다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * daum.Element.setCssText(panel, "border:solid 1px red;background-color:#fefefe;");
	 * </pre>
	 * @name daum.Element.setCssText
	 * @deprecated daum.Element.setStyle을 사용하세요.
	 * @function
	 * @param Element e
	 * @param String cssText
	 * @see daum.Element.setStyle
	 */
	setCssText : function(/*e, _csstext*/){
		return (daum.Browser.ie) ? function(e, _csstext){ e.style.cssText = _csstext; } 
		: function(e, _csstext){ e.setAttribute("style", _csstext); };
	}(),
	/**
	 * 현재 객체 el의 style 속성을 정의해준다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * // <div style="font-size:12px;font-family:Daum;" id="d">Daum</div>
	 * var d = daum.$('d');
	 * daum.Element.setStyle(d,'background-color:red;color:yellow;');
	 * // div d의 style은 아래와 같이 정의된다.
	 * // font-size:12px;font-family:Daum;background-color:red;color:yellow;
	 * // 아래와 같이 객체로 정의해도 된다.
	 * daum.Element.setStyle(d,{backgroundColor:'red',color:'yellow'});
	 * // 아래와 같이 정의해도 작동된다. 그러나 deprecated
	 * daum.Element.setStyle(d, "display", "none");
	 * </pre>
	 * @name daum.Element.setStyle
	 * @function
	 * @param String||Element el
	 * @param String||Object styles
	 * @param String [opt]
	 * @return Element el
	 * 
	 */
	setStyle : function(el, styles, opt){
		if(opt){return daum.Element.setStyleProperty(el, styles, opt, false);}
		var e = daum.$(el), elStyle = e.style, property;
		if (styles.length < 1) {return e;}
	    if (daum.Object.isString(styles)) {
	        elStyle.cssText += ';' + styles;
	    } else if(daum.Object.isObject(styles)){
	    	for (property in styles) {
	    		elStyle[(property == 'float' || property == 'cssFloat') 
		        	? (undefined==elStyle.styleFloat ? 'cssFloat' : 'styleFloat') 
	    		       		: property] = styles[property];
	    	}
	    }
		return e;
	},
	/**
	 * 메모리릭(Pseudo-Leaks) 없이 엘리먼트를 제거한다.
	 * 참고 : <a href="http://play.daumcorp.com/x/wged">IE Memory Leak Pattern</a>
	 * @name daum.Element.destroy
	 * @function
	 * @param String||Element el
	 */
	destroy : function(el){
		var gbId = '__daumGB', garbageBin = daum.$(gbId), elem = daum.$(el);
		if(elem.id === gbId){return;}
	    if (!garbageBin) {
	    	garbageBin = daum.createElement('div',{"id":gbId,"style":"display:none;"});
	        document.body.appendChild(garbageBin);
	    }
	    garbageBin.appendChild(elem);
	    garbageBin.innerHTML = '';
	    elem = null;
	}
});
daum.extend(daum.Event, {
	/**
	 * Event Observer
	 * @name daum.Event.observer
	 * @field
	 * @type Array
	 */
	observer: [],
	EVENTID : 0,
	crossEvent : function(/*o*/){
		var methods = {};
		if(!!document.addEventListener){
			methods.add = function(o){					
				var type = o.type;
				if(type.toLowerCase()=="mousewheel" && daum.Browser.ff) type="DOMMouseScroll";
				o.src.addEventListener(type, o.handler, o.isCapture);					
			};
			methods.remove = function(o){
				var type = o.type;
				if(type.toLowerCase()=="mousewheel" && daum.Browser.ff) type="DOMMouseScroll";
				o.src.removeEventListener(type, o.handler, o.isCapture);
			};
		}else{
			methods.add = function(o){					
				var type = o.type;
				if(type.toLowerCase()=="dommousescroll") type="mousewheel";
				o.src.attachEvent("on"+type, o.handler);				
			};
			methods.remove = function(o){
				var type = o.type;
				if(type.toLowerCase()=="dommousescroll") type="mousewheel";
				o.src.detachEvent("on"+type, o.handler);
			};
		}
		return methods;
	}(),
	/**
	 * 특정 DOM 객체 el에 해당 이벤트 type을 listen하는 이벤트 handler를 등록한다. 
	 * isCapture를 true로 설정할경우 캡쳐링을 지원하는 브라우저에서 
	 * Capturing 이벤트모델로 동작한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var ob = daum.Event.addEvent(document, "keydown", handleKeyDown);
	 * // 위 이벤트를 삭제하고 싶을 경우 아래와 같이 한다.
	 * daum.Event.stopObserving(ob);
	 * </pre>
	 * @function
	 * @name daum.Event.addEvent
	 * @param Element el
	 * @param String type
	 * @param Function handler
	 * @param Boolean [isCapture] 
	 * @return Object Event Observer
	 */
	addEvent : function(el, type, handler, isCapture){
		var src = daum.$(el), flag = false, asserted_index = -1, eid = daum.Event.EVENTID++,		
			observer = {"src" : src, "type" : type, "handler" : handler, "isCapture" : isCapture || false};
		daum.Event.observer[eid] = observer;
		daum.Event.crossEvent.add(observer);
		return eid;
	},
	/**
	 * 특정 DOM 객체 el에 해당 이벤트 type을 listen하는 이벤트 handler를 해제한다.
	 * isCapture를 true로 설정할경우 캡쳐링을 지원하는 브라우저의 경우 Capturing 이벤트모델로 동작한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * daum.Event.removeEvent(document, "keydown", handleKeyDown);
	 * </pre>
	 * @function
	 * @name daum.Event.removeEvent
	 * @param Element el
	 * @param String type
	 * @param Function handler
	 * @param Boolean [isCapture] 
	 */		
	removeEvent : function(el, type, handler, isCapture){
		var observer = daum.Event.observer;
		if(!!el && !type && !handler){
			daum.Event.crossEvent.remove(observer[el]);
			delete daum.Event.observer[el];
		}else{
			var src = daum.$(el);
			daum.Event.crossEvent.remove({"src" : src, "type" : type, "handler" : handler, "isCapture" : isCapture || false});
			for(var p in observer){
				if(observer[p].src === src && observer[p].type === type && observer[p].handler === handler && observer[p].isCapture === (isCapture || false)){
					delete daum.Event.observer[p];
					break;
				}
			}
		}		
	},
	/**
	 * 특정 observer객체를 전달해서 이벤트를 해제하려 할경우 사용한다.
	 * addEvent 사용시 이벤트 핸들러를 익명함수로 사용하였을 경우 
	 * addEvent의 반환값을 사용할 수 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var ob = daum.Event.removeEvent(document, "keydown", function(){….});
	 * daum.Event.stopObserving(ob);
	 * </pre>
	 * @function
	 * @name daum.Event.stopObserving
	 * @param {EventObserver} observer
	 */				
	stopObserving : function(eid){
		if(daum.Event.observer[eid]) daum.Event.removeEvent(eid);			
	},
	/**
	 * observer가 있는지 여부를 반환한다.
	 * @function
	 * @name daum.Event.hasObserver
	 * @param Element|Number
	 * @param String type
	 * @return Boolean 
	 */
	hasObserver : function(src, type){
		if(typeof src === "number"){
			return !!daum.Event.observer[src];
		}else{
			var has = false, observer = daum.Event.observer;
			for(var p in observer){
				if(observer[p].src === src && observer[p].type === type){
					has = true;
					break;
				}
			}
			return has;
		}
	},
	/**
	 * 현재 이벤트의 흐름을 중단시킨다.
	 * daum.Event.stopPropagation과 daum.Event.preventDefault를 동시에 실행하는 것과 같다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * panel.onclick = daum.Event.stopEvent;
	 * </pre>
	 * @function
	 * @name daum.Event.stopEvent
	 * @param {Event} e
	 * @param Boolean 
	 * @return Boolean false
	 */
	stopEvent : function(e){
		daum.Event.stopPropagation(e);
		daum.Event.preventDefault(e);
		return false;
	},
	/**
	 * 브라우저의 기본기능을 현재 이벤트 핸들링 시점에 한해 제한한다.
	 * 탭이나 백스페이스키 같은 기능을 제한할 수 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * inputbox.onkeydown = daum.Event.preventDefault;
	 * </pre>
	 * @function
	 * @name daum.Event.preventDefault
	 * @param {Event} e
	 * @return Boolean false
	 */						
	preventDefault: function(e){
		var ev = e || window.event;
		if(ev.preventDefault){
			ev.preventDefault();
		} else {
			ev.returnValue = false;
		}
		return false;		
	},
	/**
	 * 이벤트가 상위의 element로 버블링 되는 것을 막는다.
	 * @function
	 * @name daum.Event.stopPropagation
	 * @param {Event} e
	 */
	stopPropagation: function(e){
		var ev = e || window.event;
		if(ev.stopPropagation){
			ev.stopPropagation();
		} else {
			ev.cancelBubble = true;	
		}
	},
	/**
	 * daum.Event 에서 관리하는 observer객체들을 Garbage Collection한다.
	 * DOM Level 2 이벤트 핸들링 방식에서 발생할 수 있는 메모리 누수 
	 * 문제를 해결하기 위한 가비지 컬렉션을 주기적으로 시행한다. 
	 * 기본적으로 1분에 한번 수행한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * window.JiguEventGC = daum.Function.interval(daum.Event.GC,60000,daum.Event);
	 * </pre>
	 * @name daum.Event.GC
	 * @function
	 * 
	 */
	GC : function(){
		if(daum.Browser.ie){
			return function(){
				for(var eid in daum.Event.observer){
					var e = daum.Event.observer[eid].src;
					if(e && e["ownerDocument"]){
		  				try{
		  					!e["offsetParent"] && daum.Event.stopObserving(eid);		  						
		  				}catch(e){
		  					daum.Event.stopObserving(eid);
		  				}
		  			}
				};
			};
		}else{
			return function(){
				for(var eid in daum.Event.observer){
					var e = daum.Event.observer[eid].src, isBodyElement = false;
					if(e && e.ownerDocument){
						if(!e.offsetParent){							
							do{
								if(e === document.body){
									isBodyElement = true;
									break;
								}
							}while(e = e.parentNode)
							!isBodyElement && daum.Event.stopObserving(eid);
						}
			  		}
				};
			};
		};		
	},	
	/**
	 * 현재 이벤트가 발생한 DOM 객체를 반환한다.
	 * @name daum.Event.getElement
	 * @function
	 * @param Event ev
	 * @return Element
	 */
	getElement : function(ev){
		var e = ev || window.event;
		return e.srcElement || e.target;
	}
});
daum.extend(daum.Function,{
	/**
	 * Function f내에서 사용하는 this키워드를 지정 Object를 가리키도록 하는 새로운 함수를 반환한다.
	 * 이때 모든 인자는 반환되는 함수에서도 그대로 사용할 수 있다
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * function notice(){ alert(this.name);}
	 * var member = { name: 'James'}
	 * member.getName = daum.Function.bind(notice, member);
	 * member.getName();
	 * </pre>
	 * @name daum.Function.bind
	 * @function
	 * @param Function f
	 * @param {Object...}
	 * @return Function
	 */		
	bind: function(f){
		var method = f, 
			args = daum.$A(arguments),
			object, binded; 
		args.shift();
		object = args.shift();
		/** @ignore */
		binded = function(){
			return method.apply(object, args.concat(daum.$A(arguments)));
		};
		binded.__Binded = true;
		return binded;
	},
	/**	
	 * Function f내에서 사용하는 this키워드를 지정 Object를 가리키도록 하는 새로운 함수를 반환한다.
	 * 이 때 반환된 함수에서 첫번째 인자로 Event 객체를 얻어올 수 있다
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var member = { name: 'James';}
	 * function keyInspector(event){
	 *     alert(this.name ':' event.keyCode);
	 * }
	 * window.onkeydown = daum.Function.bindAsEventListener(keyInspector, member);
	 * </pre>
	 * @name daum.Function.bindAsEventListener
	 * @function
	 * @param Function f
	 * @return Function
	 */
	bindAsEventListener: function(f){
		var method = f, 
			args = daum.$A(arguments), object, binded; 
		args.shift();
		object = args.shift();
		/** @ignore */
		binded = function(e){
			return method.apply(object, [e || window.event].concat(args));
		};
		binded.__Binded = true;
		return binded;
	},
	/**
	 * 인자로 주어진 ms 밀리세컨드시간 간격으로 함수(f)를 반복 실행하며 
	 * 함수의 실행을 취소할 수 있는 timeoutID를 반환한다.  
	 * object인자를 주면 현재 함수의 context를 지정해줄 수 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var sayHello = function(){ alert("hello");}
	 * var tid = daum.Function.interval(sayHello, 1000);
	 * window.clearInterval(tid);
	 * </pre>
	 * @name daum.Function.interval
	 * @function
	 * @param Function f
	 * @param Number ms
	 * @param Object [object]
	 * @reutrn Number
	 */
	interval: function(f, ms, _object){
		var func = (_object) ? daum.Function.bind(f, _object): f;
		return window.setInterval(func, ms);
	},
	/**
	 * 인자로 주어진 ms 밀리세컨드시간 동안 함수(f)의 실행을 지연시키며 
	 * 함수의 실행을 취소 할 수 있는 timeoutID를 반환한다.  
	 * object인자를 주면 현재 함수의 context를 지정해줄 수 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var sayHello = function(){ alert("hello"); }
	 * var tid = daum.Function.timeout(sayHello, 1000);
	 * window.clearTimeout(tid);
	 * </pre>
	 * @name daum.Function.timeout
	 * @function
	 * @param Function f
	 * @param Number ms
	 * @param Object [object]
	 * @reutrn Number
	 */	
	timeout: function(f, ms, _object){
		var func = (_object) ? daum.Function.bind(f, _object): f;		
		return window.setTimeout(func, ms);
	},	
	/**
	 * 해당함수 f와 callBack 함수를 차례로 실행하는 새로운 함수를 생성하여 반환한다.
	 * 파라미터로 전달되는 값들도 동일하게 전달된다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var result = '';
	 * var func = function(){ result += 'Hello'; }
	 * var callbackFunc = daum.Function.callBack(func, function(){ result+='World'; } );
	 * callbackFunc();
	 * alert(result); // HelloWorld
	 * </pre>
	 * @name daum.Function.callBack
	 * @function
	 * @param Function f
	 * @param Function callback
	 * @param Object args...
	 * @return Function
	 */
	callBack : function(f){
		var that = f, args = daum.$A(arguments), func, ret;
		args.shift(); func = args.shift();
		return function(){
			args = args.concat(daum.$A(arguments));
			ret = that.apply(null, args);
			func.apply(null, args);
			return ret;
		};
	},
	/**
	 * callFore함수와 해당함수 f를 차례로 실행하는 새로운 함수를 생성하여 반환한다.
	 * 파라미터로 전달되는 값들도 동일하게 전달된다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var result = '';
	 * var func = function(){ result += 'Hello'; }
	 * var callforeFunc = daum.Function.callFore(func, function(){ result+='World'; } );
	 * callbackFunc();
	 * alert(result); // WorldHello
	 * </pre>
	 * @name daum.Function.callFore
	 * @function
	 * @param Function f
	 * @param arg...
	 * @return Function
	 */	
	callFore : function(f){
		var that = f, args = daum.$A(arguments), func;
		args.shift(); func = args.shift();
		return function(){
			args = args.concat(daum.$A(arguments));
			func(args);
			return that(args);
		};
	},		
	/**
	 * 함수 클래스 f가 _parent 함수 클래스를 상속받게 한다. 함수 f 자신을 리턴한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var ClassA = function(name, department){
	 * 	//initialize
	 * }
	 * ClassA.prototype = {
	 * 	methods ...
	 * }
	 * var ClassB = function(name, department){
	 * 	this.$super(name, department); //수퍼클래스의 생성자 호출
	 * }
	 * daum.Function.inherit(ClassB, ClassA);
	 * // ClassB는 ClassA의 모든 멤버를 상속받게 됨
	 * </pre>
	 * @name daum.Function.inherit
	 * @function
	 * @param Function f
	 * @param Function _parent_
	 * @param Object [_members]
	 * @return Function
	 */		
	inherit : function (f, parent, /*optional*/ members){
		var s  = function(){}, c;
	
		s.prototype = parent.prototype;
		f.prototype = new s(), f.prototype.constructor = f;
		
		f.prototype.parent = (parent.prototype.parent || []).concat(parent);
		f._parent = parent;
		c = f.prototype.parent.length;

		f.prototype.$super = function(){
			this.constructor.prototype.parent[--c].apply(this, arguments);
			c = c==0?this.constructor.prototype.parent.length:c;
		};
		
		if(members){ daum.Function.members(f, members); }
		
		return f;
	},

	/**
	 * 현재 함수 f의 prototype 으로 등록할 멤버(members)들을 지정한다. 
	 * 주로 inherit, clone 등과 함께 사용된다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * daum.Function.inherit(ClassB, ClassA);
	 * daum.Function.members(ClassB, {
	 * 	methodA : ... , methodB: ... });   // ClassB에 methodA와 methodB의 구현을 추가한다.
	 * </pre>
	 * @name daum.Function.members
	 * @function
	 * @param Function f
	 * @param Object _members
	 * @return Function
	 */			
	members : function(f, _members){
		var name, fp = f._parent || f;
		for(var name in _members){
			f.prototype[name] = (typeof(_members[name]) == "function") ? (fp.prototype[name]) ? (function(name, fn){
				if(fn.toString().indexOf('this.$super(') > -1){
					return function(){
						this.$prev_super = this.$super;
				
						this.$super = function(){
							this.$super = this.$prev_super;
							return fp.prototype[name].apply(this, arguments);
						}
						return fn.apply(this, arguments);
					}
				}
	
				return function(){			
					return fn.apply(this, arguments);
				}

			})(name, _members[name]) : (function(name, fn){
				if(fn.toString().indexOf('this.$super(') > -1){
					throw new Error(name +' function is not defined in ' + f);
				}
				return function(){
					return fn.apply(this, arguments);
				}
		
			})(name, _members[name]) : _members[name];
	
		}

		return f;
	},
	/**
	 * 현재 함수 f의 prototype 으로 등록할 단일 메소드 impl을 name 이라는 이름으로 추가한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * daum.Function.inherit(ClassB, ClassA);
	 * daum.Function.method(ClassB, "methodA", function(){
	 * 	alert("this is methodA");}
	 * );  // ClassB에 methodA를 추가하였다.
	 * </pre>
	 * @name daum.Function.method
	 * @function
	 * @param Function f
	 * @param String name
	 * @param Function impl
	 * @return Function
	 */		
	method : function(f, name, impl){
		var fp = f._parent || f;
		f.prototype[name] = (typeof(impl) == "function") ? (fp.prototype[name]) ? (function(name, fn){
			return function(){
				/** @ignore */
				this.$super = function(){
					return fp.prototype[name].apply(this, arguments);
				};
				return fn.apply(this, arguments);
			};
		})(name, impl) : (function(name, fn){
			return function(){
				/** @ignore */
				this.$super = function(){return true;};
				return fn.apply(this, arguments);
			};
		})(name, impl) : impl;
		
		return f;
	}	
});
/**
 * @name daum.createFunction
 * @function
 * @param Array param
 * @param String body
 * @return Function
 */
daum.createFunction = function(param, body){
	var statement = 'return function(', i;
	for(i=0;i<param.length;i++){
		statement += '' + param[i] + ',';
	}
	statement = statement.replace(/,$/,'');
	statement = statement + '){' + body + '}';
	return (new Function(statement))();
};
daum.extend(daum.Fx,{ // thanks, emile!
	/**
	 * 주어진id의 엘리먼트가 현재 동작중인지를 체크하기 위한 변수
	 * @private
	 * @name daum.Fx.running
	 */
	running:{},
	/**
	 * 엘리먼트의 속성을 반환한다.
	 * 일반적으로 {value:32,unit:'px'}와 같은 형태가 된다. 
	 * @private
	 * @name daum.Fx.parse
	 * @param String value
	 * @param String key
	 * @param Element el 
	 * @return Object
	 */
	parse : function(value, key, el){
		if(key==='opacity' && daum.ie){value = value===undefined ? 1 : value;}
		else if(value==='transparent'||value.startsWith('rgba')){value = 'rgb(255,255,255)';}
		else if(value==='auto'){
			//log.info(key);value = daum.String.px(daum.Element.getCoords(el)[key]);
			value = daum.String.px(el['scroll' + key.charAt(0).toUpperCase() + key.substr(1)]);
		}
		var v = parseFloat(value), u = value.toString().replace(/^\-?[\d\.]+/,'');
		return { value: isNaN(v) ? u : v, unit: isNaN(v) ? u.startsWith('rgb')||u.startsWith('#')?'color':'' : u };
	},
	/**
	 * 빈 div에 속성을 적용시켜보고, 속성 값을 리턴한다.
	 * @name daum.Fx.normalize
	 * @private
	 * @param String style
	 * @return Object
	 */
	normalize : function(style){
		var rules = {}, v, st = (typeof style==='object') ? '' : style, tgt,
			parseEl = document.createElement('div'), props = ('borderStyle backgroundColor borderBottomColor '+
			'borderBottomWidth borderLeftColor borderLeftWidth borderRightColor borderRightWidth '+
			'borderSpacing borderTopColor borderTopWidth bottom color fontSize fontWeight height '+
			'left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight '+
		    'maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth '+
		    'paddingBottom paddingLeft paddingRight paddingTop right textIndent top width '+
		    'wordSpacing zIndex').split(' '), i = props.length, p;
		parseEl.innerHTML = '<div style="'+st+'"></div>';
		tgt = parseEl.childNodes[0];
		if(''===st){for(p in style){tgt.style[p] = style[p].toString();}}
		while(i--) if(v = tgt.style[props[i]]){rules[props[i]] = this.parse(v, props[i]);}
		return rules;
  	},
  	/** @ignore */
	s : function(str, p, c){ return str.substr(p,c||1); },
	/**
	 * 움직임을 정지한다.
	 * @private
	 */
	stop : function(el,callback){
		clearInterval(this.running[el.id]);	
		delete daum.Fx.running[el.id];
		callback && callback(el);
		el.id = el.id.toString().startsWith('__t') ? '' : el.id;
	},
	/**
	 * 변화하는 color값을 parsing한다.
	 * @private
	 * @name daum.Fx.color
	 * @param String source
	 * @param String target
	 * @param Float pos
	 * @return String
	 */
	color : function(source, target, pos){
		var i = 2, j, c, tmp, v = [], r = [];
		while(j=3,c=arguments[i-1],i--)
			if(this.s(c,0)==='r') {c = c.match(/\d+/g); while(j--) v.push(~~c[j]);
			} else {
				if(c.length===4) c='#'+this.s(c,1)+this.s(c,1)+this.s(c,2)+this.s(c,2)+this.s(c,3)+this.s(c,3);
				while(j--) v.push(parseInt(this.s(c,1+j*2,2), 16));
			}
		while(j--) { tmp = ~~(v[j+3]+(v[j]-v[j+3])*pos); r.push(tmp<0?0:tmp>255?255:tmp); }
		return 'rgb('+r.join(',')+')';
	},
	/**
	 * 주어진 CSS와 옵션에 따라 엘리먼트를 변화시킨다.
	 * 기본적으로 아래와 같은 형태로 사용한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 *  // 첫 번째 인자로 엘리먼트를, 두 번째 인자로 변화하고자 하는 스타일을 스트링으로 정의한다.  
	 *  daum.Fx.animate('element_id','height:100px;width:200px;left:500px;background-color:#fff;');
	 *  // 위 코드는 아래와 같이 표현할 수도 있다. 
	 *  daum.Fx.animate('element_id',{height:'100px',width:'200px','left':'500px',backgroundColor:'#fff'});
	 * </pre>
	 * 두번째 인자는 완전한 형태의 css string으로 할 수도 있고, 객체형태로 입력할 수 있다. 
	 * 그러나, css string형태로 할 것을 권장한다. 
	 * color 값은 반드시 #fff 혹은 #ffffff형태나 rgb(10,10,10)형태만 사용 가능하다.(red, yellow 같은 이름은 안됨) 
	 *   
	 * 아래와 같이 옵션값을 세번째 인자로 객체로 정의해 줄 수 있다. 
	 * <pre name="code" class="js:nogutter:nocontrols">
	 *  // animation이 끝나고 실행될 콜백 정의
	 * function after_animate(){
	 * 		alert('wow!');
	 * }
	 *  daum.Fx.animate('element_id','left:100px', {callback:after_animate});
	 * </pre>
	 * 위 코드는 실행후 after_animate 함수를 실행할 것이다.
	 * after_animate 함수를 실행할때 인자로 해당 element를 넘겨준다.(since v1.0_r152)
	 * 세 번째 인자에는 아래와 같이 애니메이션 시간을 정의할 수 있다.
	 * default 값은 0.7초이다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 *  // 0.5초동안 효과가 일어나고 나서 callback함수가 실행된다.
	 *  daum.Fx.animate('element_id','left:100px', {duration:0.5, callback:after_animate});
	 * </pre>
	 * 
	 * 더 자세한 내용은 <a href="http://play.daumcorp.com/x/hauz" target="_blank">http://play.daumcorp.com/x/hauz</a> 에서 알아보세요.
	 * @name daum.Fx.animate
	 * @function
	 * @param Element elem
	 * @param String styles
	 * @param Object options  
	 */
	animate : function(elem, styles, options){
		var el = daum.$(elem), opts = options || {}, target = this.normalize(styles), 
		comp = el.currentStyle ? el.currentStyle : getComputedStyle(el, null),
		prop, current = {}, start = +new Date, 
		dur = (opts.duration && opts.duration <= 10 ? opts.duration * 1000 : opts.duration) || 700, 
		finish = start+dur, interval, easing = opts.easing || function(t, b, c, d) { return -c *(t/=d)*(t-2) + b;};
		
		el.id = (!el.id) ? '__t'+ +new Date + daum.random(1,10000): el.id;
		if(daum.ie6){el.style.zoom = '1';} // for opacity bug(FTJIGU-73)
		
		if(this.running[el.id]){
			clearInterval(this.running[el.id]);	
			delete daum.Fx.running[el.id];
		}
		
		for(prop in target){current[prop] = this.parse(comp[prop], prop, el);}

		if(daum.toJSON(current)===daum.toJSON(target)){
			this.stop(el, opts.callback);
			return;
		}
		interval = setInterval(function(){
			var time = +new Date;
			for(prop in target){
				try{el.style[prop] = target[prop].unit === 'color' ?
						daum.Fx.color(current[prop].value,target[prop].value,easing(time-start,0,1,dur)) :
						easing(time-start,current[prop].value,target[prop].value-current[prop].value,dur).toFixed(3)+target[prop].unit;
				}catch(e){el.style[prop] = target[prop].value;delete target[prop];}
				if(prop==='opacity' && daum.ie){el.style.filter = 'alpha(opacity=' + el.style[prop]*100 + ')';}
			}
			if(time>finish) {
				for(prop in target){
					el.style[prop] = target[prop].unit === 'color' ? daum.Fx.color(current[prop].value,target[prop].value,1) : target[prop].value + target[prop].unit;			
				}
				this.stop(el, opts.callback);
			}
		}.bind(this),13);
		this.running[el.id] = interval;
	},
	/**
	 * 원하는 엘리먼트가 있는 곳까지 부드럽게 스크롤 시킨다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * daum.Event.addEvent('bt','click',function(){daum.Fx.scrollTo('kara');}); // 클릭하면 id가 kara인 Element까지 scroll한다.
	 * //options 값은 아래와 같이 정의할 수 있다.
	 * //{duration:700,easing:function(t, b, c, d) {return c*(t/=d)*t + b;}, offset:100}
	 * // - duration : 모션이 일어나는 시간(milliseconds)
	 * // - easing : easing transition함수
	 * // - offset : 이동했을때 더하거나 뺄 값을 정의
	 *  daum.Fx.scrollTo('kara', {duration:500, offset:-100});
	 * </pre>
	 * @since v1.0_r156
	 * @function
	 * @name daum.Fx.scrollTo
	 * @param Element elem
	 * @param Object options
	 */
	scrollTo : function(elem, options){
		var el = daum.$E(elem), opts = options || {},
			currentTop = (daum.ie) ? document.documentElement.scrollTop : window.pageYOffset,
			start = +new Date,
			toTop = el.getCoords()['top'] + ((opts.offset) ? opts.offset : 0), 
			dur = opts.duration || 700,
			finish = start + dur,
			easing = opts.easing || function(t, b, c, d) { return -c *(t/=d)*(t-2) + b;},
			effect = setInterval(function(){
				var time = +new Date;
				window.scrollTo(0, easing(time - start, currentTop, toTop - currentTop, dur));
				if(time>finish) {
					window.scrollTo(0, toTop);
					clearInterval(effect);
				}
			},13);
	}
});
daum.extend(daum.Number, {
	/**
	 * 현재 number값 n을 String형으로 변환하고 "px" suffix를 추가한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var left_width = 180;
	 * leftWrap.style.width = daum.Number.px(left_width);
	 * //"180px"의 값이 할단된다.
	 * </pre> 
	 * @name daum.Number.px
	 * @function
	 * @param String||Number st
	 * @return String
	 */
	/** @ignore */
	px : function(st){
		return daum.String.px(st);
	},
	/**
	 * 현재 number값 n을 String형으로 변환한다.
	 * 자릿수 cipher 값을 할당하면 그 자릿수 만큼 "0"을 String 앞쪽에 추가해준다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var jamesBond = 7;
	 * jamesBond = daum.Number.fillZero(jamesBond, 3);
	 * //jamesBond의 값은 "007"이 할당된다.
	 * </pre>
	 * @name daum.Number.fillZero
	 * @function
	 * @param Number n 수
	 * @param Number [cipher] 자릿수
	 */
	fillZero : function(n, cipher){
		var c = cipher || 0,
			ret = n.toString();
		if(c < ret.length){return ret;}
		while(ret.length < c){ret = "0"+ret;}			
		return ret;
	},
	/**
	 * n을 int 형식의 10진수 값으로 변환한다.
	 * 두번째 인자 l은 주어진 n이 몇 진수인지 표시한다.(default는 10)
	 * <pre name="code" class="js:nogutter:nocontrol">
	 * var a = daum.String.toInt('10'); // a = 10;
	 * var b = daum.String.toInt('F', 16); // b = 15;
	 * </pre>
	 * @name daum.Number.toInt
	 * @function
	 * @param String||Number n 숫자값
	 * @param [l] 진법(10진법 기본)
	 * @return Number
	 * @see daum.String.toInt
	 */	
	/** @ignore */
	toInt : function(n, l){
		return daum.String.toInt(n,l);
	},
	/**
	 * n을 float 형식의 값으로 변환한다.
	 * @name daum.Number.toFloat
	 * @function
	 * @param String||Number n 숫자값
	 * @return Number
	 * @see daum.String.toFloat
	 */
	/** @ignore */
	toFloat : function(n){
		return daum.String.toFloat(n);
	}
});
daum.extend(daum.String,{
	/**
	 * 현재 string값 s의 좌,우 공백문자를 제거한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var d = "  hello world! ";
	 * d = daum.String.trim(daum);
	 * //d의 값은 "hello world!"
	 * </pre>
	 * @name daum.String.trim
	 * @function
	 * @param String s
	 * @return String
	 * @see 성능관련: <a href="http://play.daumcorp.com/x/t8mm">http://play.daumcorp.com/x/t8mm</a>
	 */
	trim: function(s){
		return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},
	/**
	 * 현재 string값 s에서 find 값과 일치하는 문자열을 new 값으로 대체한 새로운 string을 리턴한다.
	 * findstr은 정규식이 가능하다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var d = "hello World!, good World!";
	 * d = daum.String.replaceAll(d, "World!", "Daum!");
	 * // d의 값은 "hello Daum!, good Daum!"
	 * x = daum.String.replaceAll(d, /^hello/, "Hi");
	 * // x의 값은 "Hi Daum!, good Daum!"
	 * </pre>
	 * @name daum.String.replaceAll
	 * @function
	 * @param String s
	 * @param String findstr
	 * @param String new
	 * @return Number
	 */		
	replaceAll: function(/* s, findstr, newstr */){
		return function(s, findstr, newstr){
			if(findstr.constructor==RegExp) {
				return s.replace(new RegExp(findstr.toString()
						.replace(/^\/|\/$/gi,''), "gi"), newstr);
			}
			return s.split(findstr).join(newstr);
	};}(),
	/**
	 * 현재 string값 s의 byte단위의 크기를 리턴한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var s1 = "다음";
	 * alert(s1.length);      //2
	 * alert(daum.String.byteLength(s1));     //4
	 * </pre>
	 * @name daum.String.byteLength
	 * @function
	 * @param String s
	 * @return Number
	 */
	byteLength: function(s){
		var result = 0;
		daum.$A(s.toString()).each(function(chr){
			result += (escape(chr).length > 3) ? 2 : 1;
		});
		return result;
	},	
	/**
	 * 현재 string값 s를 byte단위 크기 limit의 길이만큼 잘라낸다. 
	 * 세번째 인자 suffix가 주어지면 잘라낸 string에 suffix를 붙여준다. 기본값은 ""
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var s1 = "지구는 둥그니까 자꾸 걸어 나아가면";
	 * alert(daum.String.cutString(s1, 18, "..."));   // "지구는 둥그니까…"
	 * </pre>
	 * @name daum.String.cutString
	 * @function
	 * @param String s
	 * @param Number limit
	 * @param String [suffix]
	 * @return String
	 */
	cutString: function(s, limit, suff){
		var suffix = suff || '',
			_limit = limit - suffix.length,
			_byte = 0, _str = '', temp;
		daum.$A(s.toString()).each(function(chr){
			temp = (escape(chr).length > 3) ? 2 : 1;
			_byte += temp;
			_limit -= temp;
			if(_limit>=0)_str+=chr;
		});
		return (limit >= _byte) ? s : _str += suffix;
	},	
	/**
	 * 현재 string값 s가 비어있는지를 확인한다. 비어있으면 true를 리턴한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * alert(daum.String.isEmpty(' x ')); // false
	 * alert(daum.String.isEmpty('')); // true
	 * alert(daum.String.isEmpty(undefined)); // true
	 * alert(daum.String.isEmpty(null)); // true
	 * </pre>
	 * @name daum.String.isEmpty
	 * @function
	 * @param String s
	 * @return Boolean
	 */
	isEmpty : function(s){
		return (!s || s.length === 0);
	},
	/**
	 * 현재 number값 n을 String형으로 변환하고 "px" suffix를 추가한다.
	 * number값이 아닌 값(string  등)이 전달될 때에는 값을 그대로 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var left_width = 180;
	 * leftWrap.style.width = daum.Number.px(left_width);
	 * //"180px"의 값이 할당된다.
	 * </pre> 
	 * @name daum.String.px
	 * @function
	 * @param String st
	 * @return String
	 * @see daum.Number.px
	 */	
	px : function(st){
		var ret = parseInt(st); 
		return (!isNaN(ret)) ? ret +'px' : st;
	},
	/**
	 * 현재 string s에서 줄바꿈 문자를 제거한다.
	 * <pre name="code" class="js:nogutter:nocontrol">
	 * var d = "hello World!,
	 * hello Daum!";
	 * d = daum.String.removeCR(d);
	 * // d의 값은 "hello World!, hello Daum!";
	 * </pre>
	 * @name daum.String.removeCR
	 * @function
	 * @param String s
	 * @return String
	 */
	removeCR : function(s){
		return (s) ? daum.String.replaceAll(s, /\n|\r/, '') : null;
	},
	/**
	 * n을 int 형식의 10진수 값으로 변환한다.
	 * 두번째 인자 l은 주어진 n이 몇 진수인지 표시한다.(default는 10)
	 * <pre name="code" class="js:nogutter:nocontrol">
	 * var a = daum.String.toInt('10'); // a = 10;
	 * var b = daum.String.toInt('F', 16); // b = 15;
	 * </pre>
	 * @name daum.String.toInt
	 * @function
	 * @param String||Number n 숫자값
	 * @param [l] 진법(10진법 기본)
	 * @return Number
	 * @see daum.Number.toInt
	 */	
	toInt : function(n, l){
		return parseInt(n, l || 10);
	},
	/**
	 * n을 float 형식의 값으로 변환한다.
	 * @name daum.String.toFloat
	 * @function
	 * @param String||Number n 숫자값
	 * @return Number
	 * @see daum.Number.toFloat
	 */
	toFloat : function(n){
		return parseFloat(n);
	},
	/**
	 * 문자열의 시작이 주어진 st와 같은지 여부를 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrol">
	 * var a = "daum communications";
	 * daum.String.startWith(a,'daum'); // true
	 * daum.String.startWith(a,'comm'); // false
	 * </pre>
	 * @name daum.String.startsWith
	 * @function
	 * @param String s
	 * @param String st
	 * @return String
	 */	
	startsWith : function(s, st){
		return s.indexOf(st) === 0;
	},
	/**
	 * 문자열의 끝이 주어진 st와 같은지 여부를 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrol">
	 * var a = "daum communications";
	 * daum.String.endsWith(a,'communications'); // true
	 * daum.String.endsWith(a,'daum'); // false
	 * </pre>
	 * @name daum.String.endsWith
	 * @function
	 * @param String s
	 * @param String se
	 * @return String
	 */	
	endsWith : function(s, se){
		var l;
		return 	(l = s.length - se.length) >= 0 && s.lastIndexOf(se) === l;
	},
	/**
	 * 현재 string값 s의 HTML특수문자를 표현 가능한 특수문자로 escape시킨 값을 리턴한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * alert(daum.String.escapeHTML('<div id="daum">daum & lycos</div>'));
	 * // '&lt;div id=&quot;daum&quot;&gt;daum &amp; lycos&lt;/div&gt;'
	 * alert(daum.String.escapeHTML('foo <span>bar</span>'));
	 * // 'foo &lt;span&gt;bar&lt;/span&gt;' 
	 * </pre>
	 * @name daum.String.escapeHTML
	 * @function
	 * @param String s
	 * @return String
	 */
	escapeHTML : function(s){
		return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')
			.replace(/>/g,'&gt;').replace(/"/g,'&quot;')
			.replace(/'/g,'&#39;');
	},
	/**
	 * string s의 특수문자를 HTML parsing가능한 문자로 변환한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * 	var s1 = '&lt;div id=&quot;daum&quot;&gt;daum &amp; lycos&lt;/div&gt;';
	 * alert(daum.String.toHTML(s1));
	 * // "<div id="daum">daum & lycos</div>"
	 * </pre>
	 * @name daum.String.unescapeHTML
	 * @function
	 * @param String s
	 * @return String
	 */
	unescapeHTML : function(s){
		return daum.String.stripTags(s).replace(/&lt;/g,'<')
			.replace(/&gt;/g,'>').replace(/&amp;/g,'&')
			.replace(/&quot;/g,'"').replace(/&#39;/g,"'");
	},
	/**
	 * string s에서 HTML 태그를 모두 제거한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var s = 'h<b><em>e</em></b>l<i>l</i>o w<span class="moo" id="x"><b>o</b></span>rld';
	 * alert(daum.String.stripTags(s));
	 * // hello world
	 * </pre>
	 * @name daum.String.stripTags
	 * @function
	 * @param String s
	 * @return String
	 */
	stripTags : function(s){
		return s.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
	}
});

/**
 * Ajax를 쉽게 사용할 수 있게 해 준다.
 * <pre name="code" class="js:nogutter:nocontrols">
 * // option Default
 * this.options = {
 * 	url: "test.xml", // 호출할 url
 * 	method: "GET", // method: get or post
 * 	async: true, // asynchronous
 * 	timeout: 5000,
 * 	paramString: "", //  파라미터로 넘겨줄 변수 ex)name=test&age=20 
 * 	encoding: "utf-8",
 * 	onsuccess: function(){}, // 성공일때 실행될 함수
 * 	onfailure: function(){}, // 실패일때 실행될 함수
 * 	onloading: function(){}, // 로딩중일때 실행될 함수
 * 	ontimeout: function(){}, // 타임아웃일때 실행될 함수
 *  link: 'ignore' // instance의 request가 실행중일때 동작 정의
 * }
 * 
 * // 사용법
 * // 단순히 콜백 없이 url을 호출만 하기 위해서는 아래와 같이 하시면 됩니다.
 * (new daum.Ajax({url:'test.xml'})).request();
 * // 또는 아래와 같이 사용이 가능합니다. 
 * new daum.Ajax({url:'test.xml'}).request();
 * // URL 을 아래와 같이 지정해 줄 수 있습니다.
 * new daum.Ajax({url:'test.xml'}).request('test2.xml'); // test2.xml 을 호출
 * new daum.Ajax().request('test.xml'); // 기본옵션으로 test.xml을 호출
 * new daum.Ajax().request('test.xml',options); // options 객체를 넘겨줄 수 있습니다.
 * 
 *  // 아래와 같이 콜백을 실행할 수 있습니다.
 * new daum.Ajax({onsuccess:function(r){alert(r.responseText);}}).request('test.xml');
 * 
 * 1.0_r169 이상 버전에서 option에 link속성을 사용할 수 있습니다. 
 * 하나의 instance로 ajax call을 하는 중, 다른 request를 실행하면 어떻게 동작할지를 나타냅니다.
 * 이 속성은 async가 true일때만 적용됩니다.
 * ignore : default 값으로, 새로운 request를 무시합니다.
 * cancel : 실행중인 request를 취소하고, 새로운 request를 실행합니다.
 * </pre>
 * @class
 * @name daum.Ajax
 * @param Object _options
 */
daum.Ajax = function(_options){
	this.options = {
		url: '',
		method: 'get',
		async: true,
		timeout: 5000,
		paramString: '',
		encoding: 'utf-8',
		onsuccess: function(){},
		//onfailure: function(r){alert('error: ' + r.status + ' ' + r.statusText);},
		onfailure: function(){},
		onloading: function(){},
		ontimeout: function(){},
		headers: {},
		link: 'ignore'
	};
	daum.extend(this.options, _options || {});
	this.init();
};
daum.Ajax.prototype = {
	/**
	 * XHR객체를 생성한다.
	 * @name daum.Ajax.init
	 * @function
	 * @private
	 * @return
	 */
	init: function(){
		if(window.XMLHttpRequest){
			this.XHR = new XMLHttpRequest();
		}else if(window.ActiveXObject){	
			try{
				this.XHR = new ActiveXObject("Msxml2.XMLHTTP");			
			}catch(e){
				try{
					this.XHR = new ActiveXObject("Microsoft.XMLHTTP");				
				}catch(e){				
					this.XHR = null;
				}
			}
		}
		if(!this.XHR){return false;};
		this.running = false;
	},
	/**
	 * url로 request를 보낸다.
	 * @name daum.Ajax.request
	 * @function
	 * @param String url1 호출할 URL
	 * @param Object options 옵션
	 * @return
	 */
	request: function(url1, options){
		if(this.running){
			if(this.options.link === 'cancel'){
				this.abort();
			} else {
				return ;
			}
		}
		this.setOptions(options);
		var url = url1 || this.options.url;
		if(this.options.paramString.length > 0 && this.options.method=='get'){
			url = url+((url.indexOf('?')>0) ? '&':'?')+this.options.paramString;
		}
		this.open(url);
	},
	/**
	 * @name daum.Ajax.open
	 * @function
	 * @private
	 * @param String url
	 * @return
	 */
	open: function(url){
		this.running = true;
		if(this.options.async){this.XHR.onreadystatechange = 
			daum.Function.bindAsEventListener(this.stateHandle, this);}
		this.options.timer = daum.Function.timeout(this.abort, this.options.timeout, this);
		this.XHR.open(this.options.method, url, this.options.async);
		var headers = this.options.headers;
		for(var v in headers){
			this.XHR.setRequestHeader(v,headers[v]);
		}
		this.XHR.send(this.options.paramString);
		if(!this.options.async) this.stateHandle();
	},
	/**
	 * 취소한다.
	 * @name daum.Ajax.abort
	 * @function
	 * @private
	 * @return
	 */
	abort: function(){
		if(this.XHR && this.running){
			this.XHR.abort();
			this.callTimeout();
			this.running = false;
		}
	},
	/**
	 * @name daum.Ajax.stateHandle
	 * @private
	 * @function
	 * @param e
	 * @return
	 */
	stateHandle: function(e){
		switch(this.XHR.readyState){
			case 4:
				window.clearTimeout(this.options.timer);
				this.options.timer = null;
				if(this.XHR.status == 200 || this.XHR.status == 304){
					this.callSuccess();
				}else if(this.XHR.status >= 400){
					this.callFailure(this.XHR.status);
				}
				this.running = false;
				break;
				
			case 1:
				this.callLoading();
				break;			
		}			
	},
	/**
	 * @name daum.Ajax.callSuccess
	 * @function
	 * @private
	 * @return
	 */
	callSuccess: function(){
		this.options.onsuccess(this.XHR);		
	},
	/**
	 * @name daum.Ajax.callFailure
	 * @function
	 * @private
	 * @return
	 */
	callFailure: function(){
		this.options.onfailure(this.XHR);		
	},
	/**
	 * @name daum.Ajax.callLoading
	 * @function
	 * @private
	 * @return
	 */	
	callLoading: function(){
		this.options.onloading(this.XHR);		
	},
	/**
	 * @name daum.Ajax.callTimeout
	 * @function
	 * @private
	 * @return
	 */	
	callTimeout: function(){
		this.options.ontimeout(this.XHR);
	},
	/**
	 * @name daum.Ajax.setOptions
	 * @function
	 * @private
	 * @param Object options
	 * @return
	 */	
	setOptions: function(options){
		daum.extend(this.options, options || {});
		this.options.method = this.options.method.toLowerCase();
		// header 정의
		this.setHeader('charset',this.options.encoding);
		if(this.options.method=='post'){
			this.setHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
	},
	/**
	 * request의 header를 정의한다. 
	 * 값은 {x:'y',z:'a'}처럼 object하나만 던질 수도 있고, 각각 string으로 던질 수도 있다.
	 * <pre name="code" class="js:nogutter:nocontrols">	 
	 * c = new daum.Ajax('/test.html',method:'post',headers:{key1:'val1',key2:'val2'});
	 * c.request();
	 * // 혹은 아래와 같이 할 수 있다.
	 * c = new daum.Ajax('/test.html',method:'post');
	 * c.setHeader({key1:'val1',key2:'val2'});
	 * c.request();	 
	 * // 또한 아래처럼 할 수 있다.
	 * c = new daum.Ajax('/test.html',method:'post');
	 * c.setHeader('key1','val1').setHeader('key2','val2');
	 * c.request();	 
	 * </pre>	 
	 * @name daum.Ajax.setHeader
	 * @function
	 * @param Object|String key or object
	 * @param String value 
	 * @return
	 */	
	setHeader: function(key, value){
		if(typeof key === 'object'){
			// header를 셋팅하고 이것을 open시에 첨가한다.
			daum.extend(this.options.headers, key || {}, true);
		} else {
			this.options.headers[key] = value;
		}
		return this;
	},
	/**
	 * response의 header값을 읽어온다.
	 * 이 값은 당연히 response를 받았을때 출력된다.
	 * @name daum.Ajax.getHeader
	 * @function
	 * @param String key
	 * @return
	 */		
	getHeader: function(key){
		return this.XHR.getResponseHeader(key);
	}
};
/**
 * XML도큐먼트를 object로 변환한다.
 * @name daum.Ajax.xmlToObject
 * @deprecated daum.xmlToObject를 사용하세요. 
 * @function
 * @param xmlDocument
 * @return Object
 */
daum.Ajax.xmlToObject = function(xmlDocument){return daum.xmlToObject(xmlDocument);};
/**
 * JSON string을 Object로 변환한다.
 * @name daum.Ajax.jsonToObject
 * @deprecated daum.jsonToObject를 사용하세요.
 * @function
 * @param String jsonStr
 * @return Object
 */
daum.Ajax.jsonToObject = function(jsonStr){return daum.jsonToObject(jsonStr);};

/**
 * 생성자에 전달되는 template 인자를 사용하여 template을 초기화 한다.
 * @constructor
 * @name daum.Template
 * @class
 * @param String template
 */
daum.Template = function(template){
	this.template = template;
};
daum.Template.prototype = {
	/**
	 * 현재 template에 JSON 객체 data를 적용하여 완성된 innerHTML 문자열을 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var linkt = new daum.Template('<div><a href="#{href}">#{text}</a></div>');
	 * panel.innerHTML = linkt.evaluate({
	 *     href : "http://www.daum.net",
	 *     text : "우리들의 UCC세상 다음"
	 * }); // <div><a href="http://www.daum.net">다음</a></div>
	 * var source = '#{name} #{manager.name} #{manager.age} #{manager.undef} #{manager.age.undef} #{colleagues.first.name}';
	 * var subject = { manager: { name: 'John', age: 29 }, name: 'Stephan', age: 22, colleagues: { first: { name: 'Mark' }} };
	 * alert(new daum.Template('#{colleagues.first.name}').evaluate(subject)); //Mark
	 * </pre>
	 * 
	 * @name daum.Template.evaluate
	 * @function
	 * @param Object JSON data
	 * @return String
	 */
	evaluate: function(data) {
	    return this.template.replace(/#\{([A-Z_][\dA-Z_]*(?:\.[A-Z_][\dA-Z_]*)*)?\}/ig, function(_, s) {
	        var a = s ? s.split('.') : '';
	        var v = data || '';
	        while (a.length) {
	            v = v[a.shift()];
	            if (v === undefined || v === null) return '';
	        }
	        return v;
	    });
	},	
	/**
	 * 현재 template에 JSON 객체 data를 적용하여 완성된 DOM객체를 반환한다.
	 * <pre name="code" class="js:nogutter:nocontrols">
	 * var linkt = new daum.Template('<div><a href="#{href}">#{text}</a></div>');
	 * var objLink = linkt.toElement({
	 *     href : "http://www.daum.net",
	 *     text : "우리들의 UCC세상 다음"
	 * }); // <div><a href="http://www.daum.net">다음</a></div>
	 * panel.appendChild(objLink);
	 * </pre>
	 * 
	 * @name daum.Template.toElement
	 * @function
	 * @param Object JSON data
	 * @return Element
	 */	
	toElement : function(data){
		return daum.createElement(this.evaluate(data));
	}	
};
/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false;

var Sizzle = function(selector, context, results, seed) {
	results = results || [];
	var origContext = context = context || document;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var parts = [], m, set, checkSet, check, mode, extra, prune = true, contextXML = isXML(context);
	
	// Reset the position of the chunker regexp (start from head)
	chunker.lastIndex = 0;
	
	while ( (m = chunker.exec(selector)) !== null ) {
		parts.push( m[1] );
		
		if ( m[2] ) {
			extra = RegExp.rightContext;
			break;
		}
	}

	if ( parts.length > 1 && origPOS.exec( selector ) ) {
		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );
		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] )
					selector += parts.shift();

				set = posProcess( selector, set );
			}
		}
	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
			var ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ? Sizzle.filter( ret.expr, ret.set )[0] : ret.set[0];
		}

		if ( context ) {
			var ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
			set = ret.expr ? Sizzle.filter( ret.expr, ret.set ) : ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray(set);
			} else {
				prune = false;
			}

			while ( parts.length ) {
				var cur = parts.pop(), pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}
		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		throw "Syntax error, unrecognized expression: " + (cur || selector);
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );
		} else if ( context && context.nodeType === 1 ) {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}
		} else {
			for ( var i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}
	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function(results){
	if ( sortOrder ) {
		hasDuplicate = false;
		results.sort(sortOrder);

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[i-1] ) {
					results.splice(i--, 1);
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function(expr, set){
	return Sizzle(expr, null, null, set);
};

Sizzle.find = function(expr, context, isXML){
	var set, match;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var type = Expr.order[i], match;
		
		if ( (match = Expr.match[ type ].exec( expr )) ) {
			var left = RegExp.leftContext;

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );
				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName("*");
	}

	return {set: set, expr: expr};
};

Sizzle.filter = function(expr, set, inplace, not){
	var old = expr, result = [], curLoop = set, match, anyFound,
		isXMLFilter = set && set[0] && isXML(set[0]);

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.match[ type ].exec( expr )) != null ) {
				var filter = Expr.filter[ type ], found, item;
				anyFound = false;

				if ( curLoop == result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;
					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;
								} else {
									curLoop[i] = false;
								}
							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr == old ) {
			if ( anyFound == null ) {
				throw "Syntax error, unrecognized expression: " + expr;
			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],
	match: {
		ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
	},
	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},
	attrHandle: {
		href: function(elem){
			return elem.getAttribute("href");
		}
	},
	relative: {
		"+": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test(part),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag && !isXML ) {
				part = part.toUpperCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},
		">": function(checkSet, part, isXML){
			var isPartStr = typeof part === "string";

			if ( isPartStr && !/\W/.test(part) ) {
				part = isXML ? part : part.toUpperCase();

				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName === part ? parent : false;
					}
				}
			} else {
				for ( var i = 0, l = checkSet.length; i < l; i++ ) {
					var elem = checkSet[i];
					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},
		"": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( !/\W/.test(part) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
		},
		"~": function(checkSet, part, isXML){
			var doneName = done++, checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				var nodeCheck = part = isXML ? part : part.toUpperCase();
				checkFn = dirNodeCheck;
			}

			checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
		}
	},
	find: {
		ID: function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? [m] : [];
			}
		},
		NAME: function(match, context, isXML){
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [], results = context.getElementsByName(match[1]);

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},
		TAG: function(match, context){
			return context.getElementsByTagName(match[1]);
		}
	},
	preFilter: {
		CLASS: function(match, curLoop, inplace, result, not, isXML){
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").indexOf(match) >= 0) ) {
						if ( !inplace )
							result.push( elem );
					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},
		ID: function(match){
			return match[1].replace(/\\/g, "");
		},
		TAG: function(match, curLoop){
			for ( var i = 0; curLoop[i] === false; i++ ){}
			return curLoop[i] && isXML(curLoop[i]) ? match[1] : match[1].toUpperCase();
		},
		CHILD: function(match){
			if ( match[1] == "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] == "even" && "2n" || match[2] == "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},
		ATTR: function(match, curLoop, inplace, result, not, isXML){
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},
		PSEUDO: function(match, curLoop, inplace, result, not){
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( chunker.exec(match[3]).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);
				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
					if ( !inplace ) {
						result.push.apply( result, ret );
					}
					return false;
				}
			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},
		POS: function(match){
			match.unshift( true );
			return match;
		}
	},
	filters: {
		enabled: function(elem){
			return elem.disabled === false && elem.type !== "hidden";
		},
		disabled: function(elem){
			return elem.disabled === true;
		},
		checked: function(elem){
			return elem.checked === true;
		},
		selected: function(elem){
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			return elem.selected === true;
		},
		parent: function(elem){
			return !!elem.firstChild;
		},
		empty: function(elem){
			return !elem.firstChild;
		},
		has: function(elem, i, match){
			return !!Sizzle( match[3], elem ).length;
		},
		header: function(elem){
			return /h\d/i.test( elem.nodeName );
		},
		text: function(elem){
			return "text" === elem.type;
		},
		radio: function(elem){
			return "radio" === elem.type;
		},
		checkbox: function(elem){
			return "checkbox" === elem.type;
		},
		file: function(elem){
			return "file" === elem.type;
		},
		password: function(elem){
			return "password" === elem.type;
		},
		submit: function(elem){
			return "submit" === elem.type;
		},
		image: function(elem){
			return "image" === elem.type;
		},
		reset: function(elem){
			return "reset" === elem.type;
		},
		button: function(elem){
			return "button" === elem.type || elem.nodeName.toUpperCase() === "BUTTON";
		},
		input: function(elem){
			return /input|select|textarea|button/i.test(elem.nodeName);
		}
	},
	setFilters: {
		first: function(elem, i){
			return i === 0;
		},
		last: function(elem, i, match, array){
			return i === array.length - 1;
		},
		even: function(elem, i){
			return i % 2 === 0;
		},
		odd: function(elem, i){
			return i % 2 === 1;
		},
		lt: function(elem, i, match){
			return i < match[3] - 0;
		},
		gt: function(elem, i, match){
			return i > match[3] - 0;
		},
		nth: function(elem, i, match){
			return match[3] - 0 == i;
		},
		eq: function(elem, i, match){
			return match[3] - 0 == i;
		}
	},
	filter: {
		PSEUDO: function(elem, match, i, array){
			var name = match[1], filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || "").indexOf(match[3]) >= 0;
			} else if ( name === "not" ) {
				var not = match[3];

				for ( var i = 0, l = not.length; i < l; i++ ) {
					if ( not[i] === elem ) {
						return false;
					}
				}

				return true;
			}
		},
		CHILD: function(elem, match){
			var type = match[1], node = elem;
			switch (type) {
				case 'only':
				case 'first':
					while ( (node = node.previousSibling) )  {
						if ( node.nodeType === 1 ) return false;
					}
					if ( type == 'first') return true;
					node = elem;
				case 'last':
					while ( (node = node.nextSibling) )  {
						if ( node.nodeType === 1 ) return false;
					}
					return true;
				case 'nth':
					var first = match[2], last = match[3];

					if ( first == 1 && last == 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 
						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;
					if ( first == 0 ) {
						return diff == 0;
					} else {
						return ( diff % first == 0 && diff / first >= 0 );
					}
			}
		},
		ID: function(elem, match){
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},
		TAG: function(elem, match){
			return (match === "*" && elem.nodeType === 1) || elem.nodeName === match;
		},
		CLASS: function(elem, match){
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},
		ATTR: function(elem, match){
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value != check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},
		POS: function(elem, match, i, array){
			var name = match[2], filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS;

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + /(?![^\[]*\])(?![^\(]*\))/.source );
}

var makeArray = function(array, results) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 );

// Provide a fallback method if it does not work
} catch(e){
	makeArray = function(array, results) {
		var ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );
		} else {
			if ( typeof array.length === "number" ) {
				for ( var i = 0, l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}
			} else {
				for ( var i = 0; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder;

if ( document.documentElement.compareDocumentPosition ) {
	/** @ignore */
	sortOrder = function( a, b ) {
		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return 0;
		}

		var ret = a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( "sourceIndex" in document.documentElement ) {
	/** @ignore */
	sortOrder = function( a, b ) {
		if ( !a.sourceIndex || !b.sourceIndex ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return 0;
		}

		var ret = a.sourceIndex - b.sourceIndex;
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
} else if ( document.createRange ) {
	/** @ignore */
	sortOrder = function( a, b ) {
		if ( !a.ownerDocument || !b.ownerDocument ) {
			if ( a == b ) {
				hasDuplicate = true;
			}
			return 0;
		}

		var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
		aRange.selectNode(a);
		aRange.collapse(true);
		bRange.selectNode(b);
		bRange.collapse(true);
		var ret = aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
		if ( ret === 0 ) {
			hasDuplicate = true;
		}
		return ret;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date).getTime();
	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	var root = document.documentElement;
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( !!document.getElementById( id ) ) {
		Expr.find.ID = function(match, context, isXML){
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
			}
		};

		Expr.filter.ID = function(elem, match){
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );
	root = form = null; // release memory in IE
})();
// POLARIS에서 제대로 동작하지 않아 주석처리
//(function(){
//	// Check to see if the browser returns only elements
//	// when doing getElementsByTagName("*")
//
//	// Create a fake element
//	var div = document.createElement("div");
//	div.appendChild( document.createComment("") );
//
//	// Make sure no comments are found
//	if ( div.getElementsByTagName("*").length > 0 ) {
//		Expr.find.TAG = function(match, context){
//			var results = context.getElementsByTagName(match[1]);
//
//			// Filter out possible comments
//			if ( match[1] === "*" ) {
//				var tmp = [];
//
//				for ( var i = 0; results[i]; i++ ) {
//					if ( results[i].nodeType === 1 ) {
//						tmp.push( results[i] );
//					}
//				}
//
//				results = tmp;
//			}
//
//			return results;
//		};
//	}
//
//	// Check to see if an attribute returns normalized href attributes
//	div.innerHTML = "<a href='#'></a>";
//	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
//			div.firstChild.getAttribute("href") !== "#" ) {
//		Expr.attrHandle.href = function(elem){
//			return elem.getAttribute("href", 2);
//		};
//	}
//
//	div = null; // release memory in IE
//})();
if ( document.querySelectorAll ) (function(){
	var oldSizzle = Sizzle, div = document.createElement("div");
	div.innerHTML = "<p class='TEST'></p>";

	// Safari can't handle uppercase or unicode characters when
	// in quirks mode.
	if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
		return;
	}
	
	Sizzle = function(query, context, extra, seed){
		context = context || document;

		// Only use querySelectorAll on non-XML documents
		// (ID selectors don't work in non-HTML documents)
		if ( !seed && context.nodeType === 9 && !isXML(context) ) {
			try {
				return makeArray( context.querySelectorAll(query), extra );
			} catch(e){}
		}
		
		return oldSizzle(query, context, extra, seed);
	};

	for ( var prop in oldSizzle ) {
		Sizzle[ prop ] = oldSizzle[ prop ];
	}

	div = null; // release memory in IE
})();

if ( document.getElementsByClassName && document.documentElement.getElementsByClassName ) (function(){
	var div = document.createElement("div");
	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	if ( div.getElementsByClassName("e").length === 0 )
		return;

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 )
		return;

	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function(match, context, isXML) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	div = null; // release memory in IE
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ){
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	var sibDir = dir == "previousSibling" && !isXML;
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];
		if ( elem ) {
			if ( sibDir && elem.nodeType === 1 ) {
				elem.sizcache = doneName;
				elem.sizset = i;
			}
			elem = elem[dir];
			var match = false;

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}
					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

var contains = document.compareDocumentPosition ?  function(a, b){
	return a.compareDocumentPosition(b) & 16;
} : function(a, b){
	return a !== b && (a.contains ? a.contains(b) : true);
};

var isXML = function(elem){
	return elem.nodeType === 9 && elem.documentElement.nodeName !== "HTML" ||
		!!elem.ownerDocument && elem.ownerDocument.documentElement.nodeName !== "HTML";
};

var posProcess = function(selector, context){
	var tmpSet = [], later = "", match,
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

window.Sizzle = Sizzle;

})();
/*

	이 파일은 수정되었습니다. 원본 파일은 json2.js.bak 입니다.
	브라우저간 문제 때문에 성능을 포기하고 Native JSON객체를 사용하지 못하게 하였습니다.
	http://ftdev.daum.net/ezhong/temp/ss.html
	
    http://www.JSON.org/json2.js
    2010-03-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.


// Disable Native JSON Object 
if(!daum.Browser.webkit){JSON=undefined;}

if (!this.JSON) {
    this.JSON = {};
    //console.log('use json2');
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
// jigu default initialization


/*!
 * Jigu Initialization
 *  more information: http://play.daumcorp.com/display/ftst/Jigu+Initialization
 */
/* @ cc_on _d = document; eval(‘var document = _d’) @*/
(function(){
	if(!document.getElementsByClassName){document.getElementsByClassName = daum.methodize(daum.Element.getElementsByClassName);}
	if(String.prototype.trim){daum.String.trim = function(s){return s.trim();};}
	if(!window.$) window.$ = daum.$;	
	if(!window.$A) window.$A = daum.$A;
	if(!window.$E) window.$E = daum.$E;
	if(!window.$T) window.$T = daum.$T;
	if(!window.$C) window.$C = daum.$C;
	if(window.Sizzle) window.$$ = daum.$$ = window.Sizzle;
	daum.extend(daum, daum.Event);
	daum.extend(daum, daum.Browser);
	daum.extend(daum, daum.Element);
	if(daum.Event.GC!=undefined){window.JiguEventGC = daum.Function.interval(daum.Event.GC, 60000, daum.Event);}
	daum.Event.addEvent(window, "load", function(){ daum.documentLoaded = true; });
	daum.nativeExtend();
	daum.Browser.init();
	if(!window.console){window.console={debug:function(){},log:function(){}}}else{if(!window.console.log){window.console.debug=window.console.log=function(){}}else{if(!window.console.debug){window.console.debug=function(){for(var b=0,a=arguments.length;b<a;b++){window.console.log(arguments[b])}}}}};
	return true;
})();
