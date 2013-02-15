	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'foreColor',
			'class': 'backgroundColor', 
			'title': '글자색'
		});
		this.menu = this.createMenu();
		
		this.draw();
		
		this.button.addDownListener(this.beforeClick.bind(this));
		this.button.addListener(this.menu.toggle.bind(this.menu));
		this.menu.addListener(function(ev) {
			this.execute(ev.target.style.backgroundColor);
		}.bind(this));
		
	}.inherit($B.Tool).members({
		menuConfig: {
			id: "foreColorMenu",
			value: [
				"#ff0000", "#ff5e00", "#ffbb00", "#ffe400", "#abf200", "#1fda11", "#00d8ff", 
				"#0055ff", "#0900ff", "#6600ff", "#ff00dd", "#ff007f", "#000000", "#ffffff", 
				"#980000", "#993800", "#997000", "#998a00", "#6b9900", "#2f9d27", "#008299", 
				"#003399", "#050099", "#3d0099", "#990085", "#99004c", "#4c4c4c", "#d5d5d5"
			]
		},
		createMenu: function() {
			var elTable = new Template('<ul>#{for:list}<li style="background-color:#{_};">&nbsp;</li>#{/for:list}</ul>').evaluateAsDom({
				'list': this.menuConfig.value
			});
			return new $B.Menu(this.menuConfig.id, elTable);
		},
		execute: function(value) {
			var editor = this.editor;
			if (this.isInputMode()) {
				this.executeOnInputMode(function() {
					editor.caret.startFromNewWord();
					editor.caret.applyStyle({"color": value});
				});
			} else {
				try {
					this.executeOnSelectionMode(function(){
						editor.range.getTargetList().each(function(node){
							node.style.color = value;
							if (node == editor.caret.el.parentNode) {
								editor.caret.el.style.color = value;
							}
						});
					});
				} catch(e) {
					console.log(e);
				}
			}
			this.afterExecute();
		}
	}));
	