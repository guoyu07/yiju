import Ember from 'ember';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend({
	actions: {
		addNewSong: function(value) {
			var postUrl =  config.apiUrls.add + value;
			var songs = this.get('songs');
			Ember.$.getJSON(postUrl).then(function(data) {
				this.set('id', '');
				songs.pushObject(data);
			}.bind(this));
		},
		deleteSong: function(song) {
			var songs = this.get('songs');
			var idx = songs.indexOf(song);
			var _id = song._id;
			var deleteUrl = config.apiUrls.delete + _id;
			Ember.$.getJSON(deleteUrl).then(function() {
				songs.removeAt(idx);
			});
		}
	}
});
