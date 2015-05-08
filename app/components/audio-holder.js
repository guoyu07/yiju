import Ember from 'ember';
var aj = audiojs;
export default Ember.Component.extend({
	action: null,
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

	setUp: function() {
		var as = aj.createAll();
	},
	didInsertElement: function() {
		this.setUp();
	}
});