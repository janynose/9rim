	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'emoticon',
			'class': 'emoticon', 
			'title': '이모티콘'
		});
		this.menu = this.createMenu();
		
		this.draw();
		
		this.button.addListener(this.menu.toggle.bind(this.menu));
		this.menu.addListener(function(ev) {
			var el = ev.target;
			if(ev.target.nodeName.toLowerCase() == 'li') {
				el = ev.target.firstChild;
			}
			this.execute(el.cloneNode(false));
		}.bind(this));
		
	}.inherit($B.Tool).members({	
		menuConfig: {
			id: "emoticonMenu",
			value: [ // http://deco.daum-img.net/contents/emoticon/
				'http://deco.daum-img.net/contents/emoticon/per_01.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/per_02.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/per_03.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/per_04.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/per_05.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/per_06.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/per_07.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_02.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_03.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_04.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_05.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_06.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_07.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_08.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_09.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_10.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_11.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_12.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_13.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_14.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_15.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_16.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_17.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_18.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_19.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_20.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_21.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_22.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_23.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_24.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_25.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_26.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_27.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_28.gif?rv=1.0.1',
				'http://deco.daum-img.net/contents/emoticon/etc_29.gif?rv=1.0.1'
				]
		},
		createMenu: function() {
			var elTable = new Template('<ul>#{for:list}<li><img src="#{_}"/></li>#{/for:list}</ul>').evaluateAsDom({
				'list': this.menuConfig.value
			});
			return new $B.Menu(this.menuConfig.id, elTable);
		},
		execute: function(newNode) {
			var editor = this.editor;
			this.executeOnInputMode(function() {
				editor.caret.insertBeforeCaret(newNode);
				editor.caret.restoreCursor();
			});
			this.afterExecute();
		}
	}));