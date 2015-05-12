import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addNewSong: function(value) {
			var postUrl =  "http://127.0.0.1:5000/add/" + value;
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
			var deleteUrl = "http://127.0.0.1:5000/delete/" + _id;
			Ember.$.getJSON(deleteUrl).then(function() {
				songs.removeAt(idx);
			});
		}
	}
});
