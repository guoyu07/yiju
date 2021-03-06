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

  currentSong: null,

  playStatus: false,

  loadingPlayer: true,

  loadingError: false,

  songDuration: 0,

  currentTime: 0,

  songIsMuted: false,

  currentSongIndex: 0,

  totalSongs: Ember.computed('songs.[]', function() {
      return this.get('songs').length;
  }),

  fixedDuration: Ember.computed('songDuration', function() {
    var duration = this.get('songDuration');
    return fixFormat(duration);
  }),

  fixedTime: Ember.computed('currentTime', function() {
    var time = this.get('currentTime');
    return fixFormat(time);
  }),

  clearAllActive: function() {
      var songs = this.get('songs');
      songs.forEach(function(song) {
        Ember.set(song, 'active', false);
        Ember.set(song, 'isPlaying', false);
      });
  },

  playSong: function(song, index) {
    var player = this.get('audioPlayer');
    //when playing a song, first clear all the active and playing state
    this.clearAllActive();
    //set this song active status, and playing status
    Ember.set(song, 'active', true);
    Ember.set(song, 'isPlaying', true);

    //set current song and current index
    this.set('currentSong', song);
    this.set('currentSongIndex', index);

    //load the src and play the song
    player.src = song.url;
    player.load();
    //set the loading status to true
    this.set('loadingError', false);
    this.set('loadingPlayer', true);
    this.set('playStatus', true);
    player.play();
  },

  actions: {
    togglePlay: function() {
      var player = this.get('audioPlayer');
      var currentSong = this.get('currentSong');

      this.toggleProperty('playStatus');
      var status = this.get('playStatus');
      if (status) {
        //watch the playlist
        Ember.set(currentSong, 'isPlaying', true);
        player.play();
      } else {
        Ember.set(currentSong, 'isPlaying', false);
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
      var player = this.get('audioPlayer');
      var isPlaying = song.isPlaying;
      var currentSongIndex = this.get('currentSongIndex');
      if (isPlaying) {
        //pause the song, let the player pasue the song too
        Ember.set(song, 'isPlaying', false);
        this.set('playStatus', false);
        player.pause();
      } else {
        //check if it is the same song
        //the same song here, replay it
        if (currentSongIndex === index) {
          Ember.set(song, 'isPlaying', true);
          this.set('playStatus', true);
          player.play();
        } else {
          this.playSong(song, index);
        }
      }
    },

    favSong: function(song, userid) {
      this.sendAction('favSong', song, userid);
    }
  },

  setupPlayer: function() {
    //init the player when the component finished
    if (this.get('songs.length') === 0) {
      return;
    }
    var defaultTrack = this.get('songs.firstObject');
    this.set('currentSong', defaultTrack);
    this.set('audioPlayer', new Audio(defaultTrack.url));
    Ember.set(defaultTrack, 'active', true);
    var player = this.get('audioPlayer');

    //loading finished, can play
    player.addEventListener('canplaythrough', function() {
      this.set('loadingPlayer', false);
    }.bind(this), false);

    //loading finished, set song duration
    player.addEventListener('loadedmetadata', function() {
      this.set('songDuration', player.duration);
    }.bind(this), false);

    //loading audio error
    player.addEventListener('error', function(error) {
      console.log(error);
      this.set('loadingPlayer', false);
        this.set('loadingError', true);
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
