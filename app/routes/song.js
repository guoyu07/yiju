import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Ember.Route.extend({
	model: function (params) {
		return Ember.$.getJSON(apis.song + params.sid);
	},
	setupController: function(controller, song) {
		controller.set('song', song);
	}
});
