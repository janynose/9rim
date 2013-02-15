	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'specialCharacter',
			'class': 'specialCharacter', 
			'title': '특수문자'
		});
		this.menu = this.createMenu();
		this.draw();
		
		this.button.addListener(this.menu.toggle.bind(this.menu));
		this.menu.addListener(function(ev) {
			var el = ev.target;
			if(ev.target.nodeType == 1) {
				el = ev.target.firstChild;
			}
			this.execute(el.nodeValue);
		}.bind(this));
		
	}.inherit($B.Tool).members({	
		menuConfig: {
			id: "specialCharacterMenu",
			className: "grid",
			value: [
				["\u203b", "\u2606", "\u2605", "\u25cb", "\u25cf", "\u25a1", "\u25a0", "\u2664", "\u2661", "\u2667", "\u2668", "\u260e", "\u261c", "\u261e", "\u266c", "\u2669", "\u2192", "\u2190", "\u2191", "\u2193", "\u2197", "\u2199", "\u2196", "\u2198"], 
				['\u2460', '\u2461', '\u2462', '\u2463', '\u2464', '\u2465', '\u2466', '\u2467', '\u2468', '\u2469', '\u246a', '\u246b', '\u246c', '\u246d', '\u246e', '\u2026', '\u3010', '\u3011', '\u300C', '\u300D', '\u300E', '\u300F', '\u24D0','\u24D1',],
				['\u24D2','\u24D3','\u24D4','\u24D5','\u24D6','\u24D7','\u24D8','\u24D9','\u24DA','\u24DB','\u24DC','\u24DD','\u24DE','\u24DF','\u24E0','\u24E1','\u24E2','\u24E3','\u24E4','\u24E5','\u24E6','\u24E7','\u24E8','\u24E9']
			]
		},
		createMenu: function() {
			var menu = this.menu = new $B.MenuPage(this.menuConfig, null);
			var pageEnd = this.menuConfig.value.length;
			var div = daum.createElement('<div></div>');
			for (var i = 0; i < pageEnd; i++) {
				var ul = new Template('<ul>#{for:list}<li><a onclick="">#{_}</a></li>#{/for:list}</ul>').evaluateAsDom({
					'list': this.menuConfig.value[i]
				});
				i == 0 ? daum.show(ul) : daum.hide(ul);
				div.appendChild(ul);
			}
			this.menu.addSubElement(div);
			this.menu.addPage(pageEnd, div);
			return menu;
		},
		execute: function(text) {
			var editor = this.editor;
			this.executeOnInputMode(function() {
				editor.caret.setValue(text);
				editor.caret.setClassName("");
			}, text);
			this.afterExecute(text);
		}
	}));