import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Ember.Route.extend({
  model: function (params) {
    var userUrl = apis.user;
    return Ember.$.getJSON(userUrl + params.username);
  },
  setupController: function(controller, model) {
      var pubSongs = model.pubSongs;
      if (pubSongs.length > 0) {
        pubSongs[0].firstSong = true;
        pubSongs[0].message = 'publish songs';
      }
      var favSongs = model.favSongs;
      if (favSongs.length > 0) {
        favSongs[0].firstSong = true;
        favSongs[0].message = 'favorite songs';
      }
      var wholeSongs = favSongs.concat(pubSongs);
      controller.set('user', model);
      controller.set('songs', wholeSongs);
  }
});
