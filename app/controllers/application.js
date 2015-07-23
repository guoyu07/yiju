import Ember from 'ember';
//global stuff here

export default Ember.Controller.extend({
	audiojs: audiojs,
	alt: false,
	currentPathChange: function () {
		var currentPath = this.get("currentPath");
		var altPath = ['login', 'create', 'signup'];
		var alt = null;
		if (altPath.indexOf(currentPath) != -1) {
			alt = true;
		} else {
			alt = false;
		}
		//var alt = currentPath ? currentPath.indexOf("login") === 0 : false;
		this.set("alt", alt);
	}.observes('currentPath').on("init")
});
