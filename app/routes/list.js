import Ember from 'ember';
export default Ember.Route.extend({
	model: function() {
		var listUrl = "http://127.0.0.1:5000/list";
		var usersUrl = "http://127.0.0.1:5000/users";
		return Ember.RSVP.hash({
			songs: Ember.$.getJSON(listUrl),
			users: Ember.$.getJSON(usersUrl)
		});
	},
	setupController: function(controller, models) {
		controller.set('songs', models.songs);
		controller.set('users', models.users);
	}
});