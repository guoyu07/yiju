import Ember from 'ember';
var aj = audiojs;
var as = null, audio = null;
export default Ember.Component.extend({

	//set active index for songs
	setSongActive: function(index) {
		var songs = this.get('songs');
		if (songs.length > 0) {
			songs.forEach(function(item) {
				item.active = false;
			});
			songs[index].active = true;
		}
	},

	//get current active index
	getSongActive: function() {
		var index = 0;
		this.songs.forEach(function(item, i) {
			if (item.active) {
				index = i;
			}
		});
		return index;
	},

	//get next index for current active song
	//used for trackended and play the next song
	nextSongIndex: function() {
		var songs = this.get('songs');
		//get active song
		var index = this.getSongActive();

		//the last song
		if (index === songs.length - 1) {
			this.setSongActive(0);
			return 0;
		}
		//set active
		this.setSongActive(index++);
		return index++;
	},

	/*lowerSongs: function() {
		var songs = this.get('songs');
		var arr = songs.filter(function(song) {
			if (song.title.length > 14) {
				song.longSong = true;
			}
			return song;
		});
		return arr;
	}.property('songs.@each'),
	totalSongs: function() {
		return this.songs.length;
	}.property('songs.@each'),*/

	totalSongs: Ember.computed('songs.@each', function() {
		return this.songs.length;
	}),

	//load and play a song
	playSong: function(url) {
		audio.load(url);
		audio.play();
	},

	//set up the audiojs
	setUp: function() {
		as = aj.createAll({
			trackEnded: function() {
				var nextIndex = this.nextSongIndex();
				this.playSong(this.songs[nextIndex].url);
      }.bind(this)
		});
		audio = as[0];
		//play the first song automatic
		this.setSongActive(0);
		//this.playSong(songs[0].url);
	},
	//trigger this when dom is ready
	didInsertElement: function() {
		this.setUp();
	},

	actions: {
		deleteSong: function(song) {
			this.sendAction('deleteSong', song);
		},
		favSong: function(song, userid) {
			this.sendAction('favSong', song, userid);
		},
		loadSong: function(song) {
			var url = song.url;
			var idx = this.songs.indexOf(song);
			this.setSongActive(idx);
			this.playSong(url);
		}
	}
});
