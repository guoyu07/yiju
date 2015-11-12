import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.resolve(
      Ember.$.getJSON(apis.collection + params.sid)
    );
  }
});
