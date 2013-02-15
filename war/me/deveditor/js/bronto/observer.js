
	$B.JobObserver = {
		jobs: {},
		addJob: function(name, fn) {
			if (!this.jobs[name]) {
				this.jobs[name] = [];
			}
			this.jobs[name].push(fn);
		},
		executeJob: function() {
			var args = $A(arguments);
			var name = args.shift();
			if(!this.jobs[name]) {
				console.log("NOT!!!" + name);
				//return;
			}
			this.jobs[name].each(function(fn) {
				fn.apply(this, args);
			});
		}
	};