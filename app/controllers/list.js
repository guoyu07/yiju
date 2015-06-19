import Ember from 'ember';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend({
	songList: function() {
		var login = this.get('session').get('isAuthenticated');
		var songs = this.get('songs');
		if (login) {
			var uid = this.get('session.secure.data')._id;
			songs.forEach(function(song) {
				var fansList = song.fans;
				var filtered = fansList.filter(function(fan) {
					return fan._id === uid;
				});
				if (filtered.length > 0) {
					song.isStared = true;
				} else {
					song.isStared = false;
				}
			});
			return songs;
		} else {
			return songs
		}

	}.property('songs.@each'),
	actions: {
		addNewSong: function(value, userid) {
			var postUrl =  config.apiUrls.add;
			var postData = {
				songId : value,
				userId : userid
			};
			var songs = this.get('songs');
			Ember.$.ajax({
				url: postUrl,
				method: 'POST',
				data: JSON.stringify(postData)
			}).then(function(data) {
				this.set('id', '');
				songs.pushObject(data);
			}.bind(this));
			/*Ember.$.getJSON(postUrl).then(function(data) {
				this.set('id', '');
				songs.pushObject(data);
			}.bind(this));*/
		},
		deleteSong: function(song) {
			var songs = this.get('songs');
			var idx = songs.indexOf(song);
			var _id = song._id;
			var deleteUrl = config.apiUrls.delete + _id;
			Ember.$.getJSON(deleteUrl).then(function() {
				songs.removeAt(idx);
			});
		},
		favSong: function(songid, userid) {
			var postUrl = config.apiUrls.fav;
			var postData = {
				songId: songid,
				userId: userid,
				faved: true
			};
			Ember.$.ajax({
				url: postUrl,
				method: 'POST',
				data: JSON.stringify(postData)
			}).then(function(data) {
				console.log(data);
			});
		}
	}
});
