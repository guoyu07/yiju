import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['player'],
  audioPlayer: null,
  currentSong: '',
  playStatus: false,
  loadingPlayer: true,
  songDuration: 0,
  currentTime: 0,
  songIsMuted: false,
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
    loadSong: function(song) {
      var player = this.get('audioPlayer');
      this.set('currentSong', song.title);
      player.src = song.url;
      player.load();
      this.set('playStatus', true);
      player.play();
    },
    updateProgress: function(event) {
      console.log(event.target);
    }
  },
  setupPlayer: function() {
    //init the player when the component finished
    var defaultTrack = this.get('songs.firstObject');
    this.set('currentSong', defaultTrack.title);
    this.set('audioPlayer', new Audio(defaultTrack.url));
    var player = this.get('audioPlayer');

    player.addEventListener('canplaythrough', function() {
      this.set('loadingPlayer', false);
    }.bind(this), false);

    player.addEventListener('loadedmetadata', function() {
      this.set('songDuration', player.duration);
    }.bind(this), false);

    player.addEventListener('timeupdate', function() {
      var progress = this.$().find('#progress');
      this.set('currentTime', player.currentTime);
      var value = Math.floor((100 / player.duration) * player.currentTime);
      progress.css('width', value + '%');
    }.bind(this), false);
  }.on('init')
});
