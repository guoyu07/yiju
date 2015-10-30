//import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import Ember from 'ember';
import config from '../config/environment';
export default Ember.Route.extend({
  actions: {
    logOut: function() {
      var _this = this;
      Ember.RSVP.resolve(Ember.$.ajax({
        url: config.apiUrls.logout,
        method: 'POST',
        data: JSON.stringify({'token': _this.session.get('token')})
      })).then(function(data) {
        //clear token
        _this.session.set('token', '');
        _this.session.set('username', '');
        _this.transitionTo('list');
      }, function(error) {
        alert(error);
      });
    }
  }
});
