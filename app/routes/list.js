import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Ember.Route.extend({
	model: function() {
		var listUrl = apis.list;
		var usersUrl = apis.users;
		return Ember.RSVP.hash({
			songs: Ember.$.getJSON(listUrl)
			//users: Ember.$.getJSON(usersUrl)
		});
	},

	setupController: function(controller, model) {
		controller.set('songs', model.songs);
	},

	rederTemplate: function() {
		this._super();
		this.render('list', {
			outlet: 'main',
			into: 'application'
		});

	}
});
