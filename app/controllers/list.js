import Ember from 'ember';

export default Ember.Controller.extend({
	realTitles: Ember.computed.alias('songs'),

	upperSongs: Ember.computed.map('songs', function (song){
		song.upperTitle = song.title.toUpperCase();
		if (song.title.length > 14) {
			song.longSong = true;
		}
		return song;
	}),
	/*totalSongs: function() {
		return this.songs.length;
	}.property('songs.@each'),*/
	totalSongs: Ember.computed('songs.@each', function() {
		return this.songs.length;
	}),
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
	},

	lowerSongs: function() {
		var songs = this.get('songs');
		var arr = songs.filter(function(song) {
			if (song.title.length > 14) {
				song.longSong = true;
			}
			return song;
		});
		return arr;
	}.property('songs.@each')
});