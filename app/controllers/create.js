import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend(EmberValidations, {

  songs: [],
  songIds: [],
  loading: false,
  actions: {
    addSong: function() {
      var songs = this.get('songs');
      var songid = this.get('songid');
      var songIds = this.get('songIds');
      var songUrl = config.apiUrls.song + songid;
      if (songIds.indexOf(songid * 1) != -1) {
        alert('Already added');
        this.set('songid', '');
        return;
      }
      this.set('loading', true);
      Ember.$.getJSON(songUrl).then(function (data) {
        this.set('songid', '');
        this.set('loading', false);
        songs.pushObject(data);
        songIds.push(data.sid);
      }.bind(this));
    },
    createAlbum: function(userid) {

      var postData = {
        title: this.title,
        desc: this.desc,
        date: new Date(),
        songs: this.get('songIds'),
        _creator: userid
      }
      
      var createUrl =  config.apiUrls.create;
      Ember.$.ajax({
				url: createUrl,
				method: 'POST',
				data: JSON.stringify(postData)
			}).then(function(data) {
        alert('hahahah nice create');
			}.bind(this));
    }
  }
});
