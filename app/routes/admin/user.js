import Ember from 'ember';
import config from 'Yiju/config/environment';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.resolve(
        Ember.$.ajax({
            method: 'GET',
            url: config.apiUrls.adduser
        })
    );
  }
});
