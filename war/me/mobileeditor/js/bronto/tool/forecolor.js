	$B.registerTool(function(editor) {
		this.$super(editor);
		
		this.button = new $B.Button({
			'id': 'foreColor',
			'class': 'foreColor', 
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
				"#cccccc", "#e7c991", "#ffe409", "#dfb7ee", "#b1c4fc", "#b8d63d", 
				"#888888", "#e7c991", "#ff8b16", "#af65dd", "#7293fa", "#5fb626", 
				"#333333", "#9d6c08", "#e31600", "#801fbf", "#3058d2", "#2b8400", 
				"#000000", "#463003", "#5b0000", "#320251", "#112a75", "#174600"
			]
		},
		createMenu: function() {
			var elTable = new Template('<ul>#{for:list}<li><a style="background-color:#{_};" onclick=""></a></li>#{/for:list}</ul>').evaluateAsDom({
				'list': this.menuConfig.value
			});
			return new $B.Menu(this.menuConfig, elTable);
		},
		execute: function(value) {
			var editor = this.editor;
			if (this.isInputMode()) {
				this.executeOnInputMode(function() {
					editor.caret.startFromNewWord();
					editor.caret.applyStyle({"color": value});
				}, value);
			} else {
				try {
					this.executeOnSelectionMode(function(){
						editor.range.getTargetList().each(function(node){
							node.style.color = value;
							if (node == editor.caret.el.parentNode) {
								editor.caret.el.style.color = value;
							}
						});
					}, value);
				} catch(e) {
					$B.JobObserver.executeJob($B.Ev.ERROR, e, "foreColor");
				}
			}
			this.afterExecute(value);
		}
	}));
	