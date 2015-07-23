import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend(EmberValidations, {
  songs : [],

  actions: {
    addSong: function() {
      var fake = {'song': 'Reapers', 'artist': 'Muse'};
      var songs = this.get('songs');
      songs.pushObject(fake);
    }
  }
});
