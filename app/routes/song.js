import Ember from 'ember';
export default Ember.Route.extend({
	model: function (params) {
		return Ember.$.getJSON('http://127.0.0.1:5000/song/' + params.sid);
	},
	setupController: function(controller, song) {
		controller.set('song', song);
	}
});