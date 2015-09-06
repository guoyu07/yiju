import Ember from 'ember';

function padLeft(num) {
  var str = num + '';
  if (str.length === 1) {
    return '0' + str;
  } else {
    return str;
  }
};

function fixFormat(time) {
  time = parseInt(time, 10);
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return padLeft(minutes) + ':' + padLeft(seconds);
};

export default Ember.Component.extend({
  classNames: ['player'],

  audioPlayer: null,

  currentSong: '',

  playStatus: false,

  loadingPlayer: true,

  songDuration: 0,

  currentTime: 0,

  songIsMuted: false,

  currentSongIndex: 0,

  totalSongs: Ember.computed('songs@each', function() {
      return this.get('songs').length;
  }),

  playText: Ember.computed('playStatus', function() {
    var status = this.get('playStatus');
    if (status) {
      return 'Pause';
    } else {
      return 'Play';
    }
  }),

  muteText: Ember.computed('songIsMuted', function() {
    var muted = this.get('songIsMuted');
    if (muted) {
      return 'Unmute';
    } else {
      return 'Mute';
    }
  }),

  fixedDuration: Ember.computed('songDuration', function() {
    var duration = this.get('songDuration');
    return fixFormat(duration);
  }),

  fixedTime: Ember.computed('currentTime', function() {
    var time = this.get('currentTime');
    return fixFormat(time);
  }),

  playSong: function(song, index) {
    var player = this.get('audioPlayer');
    this.set('currentSong', song.title);
    this.set('currentSongIndex', index);
    player.src = song.url;
    player.load();
    this.set('playStatus', true);
    player.play();
  },

  actions: {
    togglePlay: function() {
      var player = this.get('audioPlayer');
      this.toggleProperty('playStatus');
      var status = this.get('playStatus');
      if (status) {
        player.play();
      } else {
        player.pause();
      }
    },
    toggleMute: function() {
      var player = this.get('audioPlayer');
      this.toggleProperty('songIsMuted');
      var muted = this.get('songIsMuted');
      if (muted) {
        player.muted = true;
      } else {
        player.muted = false;
      }
    },
    loadSong: function(song, index) {
      this.playSong(song, index);
    }
  },

  setupPlayer: function() {
    //init the player when the component finished
    var defaultTrack = this.get('songs.firstObject');
    this.set('currentSong', defaultTrack.title);
    this.set('audioPlayer', new Audio(defaultTrack.url));
    var player = this.get('audioPlayer');

    //loading finished, can play
    player.addEventListener('canplaythrough', function() {
      this.set('loadingPlayer', false);
    }.bind(this), false);

    //loading finished, set song duration
    player.addEventListener('loadedmetadata', function() {
      this.set('songDuration', player.duration);
    }.bind(this), false);

    //audio time updated, set progress bar
    player.addEventListener('timeupdate', function() {
      var progress = this.$().find('#progress');
      this.set('currentTime', player.currentTime);
      var value = Math.floor((100 / player.duration) * player.currentTime);
      progress.css('width', value + '%');
    }.bind(this), false);

    //event when song ended, automaticly play the next song
    player.addEventListener('ended', function() {
      var currentIndex = this.get('currentSongIndex');
      var totalSongs = this.get('totalSongs');
      var songs = this.get('songs');
      currentIndex++;
      if (currentIndex == totalSongs) {
        currentIndex = 0;
      }
      this.playSong(songs.objectAt(currentIndex), currentIndex);
    }.bind(this), false);

  }.on('init'),

  setUpEvents: function() {
    //this._super();
    var progress = this.$().find('#progress');
    var self = this;
    this.$('#audiokit').delegate('#progressBar', 'click', function(e) {
      var parentOffset = $(this).parent().offset();
      var relX = e.pageX - parentOffset.left;
      var percent = Math.floor(relX / $(this).width() * 100);
      var progress = $(this).find('#progress');
      var updateTime = Math.floor(self.get('songDuration') * (percent / 100));
      var audio = self.get('audioPlayer');
      audio.currentTime = updateTime;
      self.set('currentTime', updateTime);
      progress.css('width', percent  + '%');
      e.preventDefault();
    });
  }.on('didInsertElement')
});
