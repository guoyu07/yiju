import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend(EmberValidations, {

  songs: [],
  songIds: [],
  loading: false,
  getSong: function(songUrl, userid) {

    return Promise.resolve(Ember.$.getJSON(songUrl))
            .then(function (data) {
              data.userid = userid;
              return data;
            }.bind(this)
          );
  },
  postSong: function(data) {
    return new Promise(function(resolve, reject) {
      if (data.exsit) {
        return resolve(data);
      } else if(!data.pass) {
        return reject(data);
      } else {
        var postUrl = config.apiUrls.add;
        Ember.$.ajax({
          url: postUrl,
          method: 'POST',
          data: JSON.stringify(data)
        }).then(function(data) {
          resolve(data);
        });

      }
    });

    //return Ember.RSVP.resolve()
  },
  actions: {
    addSong: function() {
      var songid = this.get('songid');
      var songIds = this.get('songIds');
      var songUrl = config.apiUrls.song + songid;
      if (songIds.indexOf(songid * 1) != -1) {
        alert('Already added');
        this.set('songid', '');
        return;
      }
      this.set('loading', true);
      var userid = this.get('session.secure.data')._id;
      this.getSong(songUrl, userid).then(this.postSong)
      .then(function(data) {
        this.set('songid', '');
        this.set('loading', false);
        this.songs.pushObject(data);
        this.songIds.push(data.sid);
      }.bind(this), function(data) {
        this.set('songid', '');
        this.set('loading', false);
        alert(data.message);
      }.bind(this));

      /*Ember.$.getJSON(songUrl).then(function (data) {
        this.set('songid', '');
        this.set('loading', false);
        if (data.pass) {
          songs.pushObject(data);
          songIds.push(data.sid);
        } else {
          alert(data.message);
        }
      }.bind(this));*/
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
