import Ember from 'ember';
//global stuff here

export default Ember.Controller.extend({
	audiojs: audiojs,
	alt: false,
	currentPathChange: function () {
		var currentPath = this.get("currentPath");
		if (currentPath) {
			currentPath = currentPath.split('.')[0];
			var altPath = ['login', 'create', 'signup', 'song', 'admin'];
			var alt = null;
			if (altPath.indexOf(currentPath) != -1) {
				alt = true;
			} else {
				alt = false;
			}
			this.set("alt", alt);
		}
	}.observes('currentPath').on("init")
});
