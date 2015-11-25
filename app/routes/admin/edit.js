import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.resolve(Ember.$.ajax({
      url: apis.create
    }));
  }
});
