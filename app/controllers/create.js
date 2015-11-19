import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend(EmberValidations, {

  songs: [],
  songIds: [],
  sendIds: [],
  loading: false,
  //toggle markdown preview
  preview: false,
  uploadData: '',
  toggleText: Ember.computed('preview', function() {
    var preview = this.get('preview');
    if (preview) {
      return '关闭预览';
    } else {
      return '开启预览';
    }
  }),
  previewUrl: '',
  validations: {
    title: {
      presence: true
    },
    desc: {
      presence: true
    }
  },
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
    closePreview: function() {
      this.set('preview', false);
    },
    togglePreview: function() {
      var preview = this.get('preview');
      this.set('preview', !preview);
    },
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
      var userid = this.session.get('userid');
      this.getSong(songUrl, userid).then(this.postSong)
      .then(function(data) {
        this.set('songid', '');
        this.set('loading', false);
        this.songs.pushObject(data);
        this.songIds.push(data.sid);
        this.sendIds.push(data._id);
      }.bind(this), function(data) {
        this.set('songid', '');
        this.set('loading', false);
        alert(data.message);
      }.bind(this));


    },
    createAlbum: function(userid) {
      var postData = {
        title: this.title,
        desc: this.desc,
        pic: this.get('uploadData').path,
        date: new Date(),
        songs: this.get('sendIds'),
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
