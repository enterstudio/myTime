
$(function() {
	/// models ///

	window.Course = Backbone.Model.extend({
		urlRoot: "/courses",
		defaults: {
			code: "",
			number: null,
			section: null,
			type: "",
			title: "",
			days: [], 
			time: "",
			start_time: "",
			end_time: "",
			start: "",
			end: "",
			location: "",
			instructor: "(staff)",
			prof_email: "",
			site_link: ""
		},
		initialize: function() {
			if(typeof this.get("days") == "string") {
				var days = window.utils.daysFormat(this.get('days'));
				this.set("days", days);
			}

			if(this.get("time") && typeof this.get("time") != "") {
				var times = window.utils.dateFormat(this.get('time'));
				this.set('start_time', times.start);
				this.set('end_time', times.end);
				this.set("time","");
			}

			console.log(this.get("days"))
		}
	});

	window.Reminder = Backbone.Model.extend({
		urlRoot: "/reminders",
		defaults: {
			id: null,
			type: "",
			title: "",
			completed: false,
			date: "", // switch to timestamp
			time: "",
			time: "",
			course: null,
			note: "",
			highlight: false
		},
		toggle: function() {
			this.save({
				completed: !this.get('completed')
			});
		}
	});

	window.Announcement = Backbone.Model.extend({
		defaults: {
			title: "",
			text: ""
		}
	});

	window.Student = Backbone.Model.extend({
		defaults: {
			user: "",
			name: "",
			major: "",
			advisor_email: ""
		}
	});


	/// collections ///

	window.CourseCollection = Backbone.Collection.extend({
	    model: Course,
	    url: "/courses"
	});

	window.ReminderCollection = Backbone.Collection.extend({
		
	    model: Reminder,
	    url: "/reminders",
	    completed: function() {
			return this.filter(function( reminder ) {
				return reminder.get('completed');
			});
		},
		highlight: function(id) {
			this.each(function(reminder){
				if(reminder.get("course") == id) {
					reminder.set("highlight", true);
				}
			})
		}, 
		offLight: function() {
			this.each(function(reminder){
				reminder.set("highlight", false);
			});
		}
	});

	window.AnnouncementCollection = Backbone.Collection.extend({
		
	    model: Announcement,
	    url: "/announcements"

	});

	/// other API collections ///

	window.APICollection = Backbone.Collection.extend({
	    model: Backbone.Model.extend({
	    	defaults: {
	    		show: true
	    	}
	    }),
	    find: function(key, type) {
	    	key = key.toUpperCase();
	    	for (i in this.models) {
	    		var check = this.models[i].get(type).toString();
	    		if(check.indexOf(key) == -1) {
	    			this.models[i].set({show: false}, {silent: true});
	    		} else {
	    			this.models[i].set({show: true}, {silent: true});
	    		}
	    		
	    	}
	    	this.trigger("change")
	    }
	});


});
