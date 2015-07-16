import Ember from 'ember';
//global stuff here

export default Ember.Controller.extend({
	audiojs: audiojs,
	alt: false,
	currentPathChange: function () {
		var currentPath = this.get("currentPath");
		var alt = currentPath ? currentPath.indexOf("login") === 0 : false;
		this.set("alt", alt);
	}.observes('currentPath').on("init")
});
