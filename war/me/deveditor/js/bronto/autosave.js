
	$B.AutoSave = {
		url: "http://file.uf.daum.net/autosave_list",
		init: function(editor, config) {
			var self = this;
			var f = $("autosaveForm");
			setInterval(function() {
				f.action = self.url;
				f.type.value = "save";
				f.service.value = config.service;
				f.filename.value = config.filename;
				f.asid.value = config.asid;
				f.seq.value = config.seq;
				f.meta.value = encodeURIComponent(daum.toJSON(typeof makeAutoSaveMate == "function" ? makeAutoSaveMate() : {}));
				f.contents.value = encodeURIComponent(content);
				f.submit();
			}, 30000);
		}
	}

	$B.LocalStorage = function(editor) {
		this.editor = editor;
		this.key = "DaumBrontoEditorData1.0";
		this.start();
	}.members({
		start: function() {
			this.intervalId = setInterval(this.save.bind(this), 15000);	
		},
		stop: function() {
			clearInterval(this.intervalId);
		},
		save: function() {
			var saveData = {
				"content": this.editor.save.getContent(),
				"attachments": this.editor.save.getAttachments(),
				"formfield": this.getFormField()
			};
			localStorage.setItem(this.key, daum.toJSON(saveData));
		},
		load: function() {
			var saveData = eval('(' + localStorage.getItem(this.key) + ')');
			this.editor.modify(saveData);
			this.setFormField(saveData.formfield);
		},
		test: function() {
			var bt_save = '';
			if(localStorage.getItem('bt_save')){
				bt_save = localStorage.getItem('bt_save');
			}
			var bt_save_list = bt_save.split('\n').concat((new Date()).getMinutes() + ':' + (new Date()).getSeconds());
			if(bt_save_list.length > 2) {
				bt_save_list.shift();
			}
			localStorage.setItem(
				'bt_save', 
				bt_save_list.join('\n')
			);			
			var div = document.createElement("div");
			div.innerHTML = localStorage.getItem('bt_save')
			document.body.appendChild(div);
		},
		getFormField: function() {
			var formfield = {};
			
			var fields = $(this.editor.config.formId);
			var field;
			for (var i=0; i<fields.length; i++) {
				field = fields[i];
				if (!["select", "input", "textarea"].contains(field.tagName.toLowerCase())) {
					continue;
				}
				if (!field.name && !field.id) {
					continue;
				}
				if (field.tagName.toLowerCase() == "select") {
					if (field.selectedIndex > 0) {
						formfield[field.name] = field.options[field.selectedIndex].value;
					}
				} else {
					if (field.type == "radio" && !field.checked) {
						continue;
					} else if (field.type == "checkbox" && !field.checked) {
						continue;
					} else {
						formfield[field.name || field.id] = field.value;
					}
				}
			}
			return formfield;
		},
		setFormField: function(formfield) {
			if(!formfield) {
				return;
			}
			var fields = $(this.editor.config.formId);
			var field;
			var value;
			for (var i = 0; i < fields.length; i++) {
				field = fields[i];
				if (!["select", "input", "textarea"].contains(field.tagName.toLowerCase())) {
					continue;
				}
				if (field.name === null || field.name.length === 0) {
					continue;
				}
				if (!formfield[field.name]) {
					continue;
				}
				value = formfield[field.name];
				if (field.tagName.toLowerCase() == "select") {
					for (var j=0; j<field.options.length; j++) {
						if (field.options[j].value == value) {
							field.options[j].selected = true;
							break;
						}
					}
				} else {
					if(field.type == "radio" || field.type == "checkbox") {
						if(field.value == value) {
							field.checked = true;
						}
						continue;
					} else {
						field.value = value;
					}
				}
			}
		}
	});