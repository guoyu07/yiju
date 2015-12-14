import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from 'Yiju/config/environment';
export default Ember.Component.extend(EmberValidations, {
  title: Ember.computed.alias('collection.title'),
  desc: Ember.computed.alias('collection.desc'),
  //binded song list
  songs: Ember.computed.alias('collection.songs'),
  //computed songlist sids
  songIds: Ember.computed.map('collection.songs', function(song, index) {
    return song.sid;
  }),
  //computed songlist _id
  sendIds: Ember.computed.map('collection.songs', function(song, index) {
    return song._id;
  }),
  uploadedThumb: Ember.computed('collection.thumb', function() {
    if (this.get('collection.thumb')) {
      return 'http://localhost:5000' + this.get('collection.thumb');
    } else {
      return '';
    }
  }),
  editMode: Ember.computed('mode', function() {
    if (this.get('mode') === 'edit') {
      return true;
    }
  }),
  loading: false,
  source: null,
  //toggle markdown preview
  preview: false,
  uploadData: Ember.computed('collection.thumb', 'collection.fullsize', function() {
    return {
      'thumbs': this.get('collection.thumb'),
      'fullsize': this.get('collection.fullsize')
    }
  }),
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
  openSSE: function() {
    var source = this.get('source');
    source = new EventSource(config.apiUrls.progress);
    source.onmessage = function (event) {
      // a message without a type was fired
      console.log(event);
    };
  }.on('init'),

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
        this.get('songs').pushObject(data);
        //this.songIds.push(data.sid);
        //this.sendIds.push(data._id);
      }.bind(this), function(data) {
        this.set('songid', '');
        this.set('loading', false);
        alert(data.message);
      }.bind(this));


    },
    createAlbum: function(userid) {
      var postData = {
        title: this.get('title'),
        desc: this.get('desc'),
        thumb: this.get('uploadData').thumbs,
        fullsize: this.get('uploadData').fullsize,
        date: new Date(),
        songs: this.get('sendIds'),
        _creator: userid
      };
      this.sendAction('createCallback', postData);
    }
  }

});
