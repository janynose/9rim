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
			value: ['\uff03', '\uff06', '\uff0a', '\uff20', '\xa7', '\u203b', '\u2606', '\u2605', '\u25cb', '\u25cf', '\u25ce', '\u25c7', '\u25c6', '\u25a1', '\u25a0', '\u25b3', '\u25b2', '\u25bd', '\u25bc', '\u2192', '\u2190', '\u2191', '\u2193', '\u2194', '\u3013', '\u25c1', '\u25c0', '\u25b7', '\u25b6', '\u2664', '\u2660', '\u2661', '\u2665', '\u2667', '\u2663',  '\u25a6', '\u25a9', '\u2668', '\u260f', '\u260e', '\u261c', '\u261e', '\xb6', '\u2020', '\u2021', '\u2195', '\u2197', '\u2199', '\u2196', '\u2198', '\u266d', '\u2669', '\u266a', '\u266c']
		},
		createMenu: function() {
			var elTable = new Template('<ul>#{for:list}<li>#{_}</li>#{/for:list}</ul>').evaluateAsDom({
				'list': this.menuConfig.value
			});
			return new $B.Menu(this.menuConfig.id, elTable);
		},
		execute: function(text) {
			var editor = this.editor;
			this.executeOnInputMode(function() {
				editor.caret.setValue(text);
				editor.caret.setClassName("");
			});
			this.afterExecute();
		}
	}));