//import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import Ember from 'ember';
import config from '../config/environment';
import {getCookie} from 'Yiju/utils/cookie';
export default Ember.Route.extend({
  restoreLogin : Ember.on('init', function() {
    var cookies = getCookie(document.cookie);
    //find sessionid in cookie, send it to the server to verify
    if (cookies.cid) {
      Ember.RSVP.resolve(Ember.$.ajax({
          url: config.apiUrls.restore,
          method: 'GET'
      })).then(function(data) {
        //if restore passed, reset the client session
        this.session.set('token', cookies.cid);
        this.session.set('username', cookies.uname);
        this.session.set('userid', data._id);
      }.bind(this)).catch(function(error) {
        alert(error);
      });
    }
  }),
  actions: {
    logOut: function() {
      var _this = this;
      Ember.RSVP.resolve(Ember.$.ajax({
        url: config.apiUrls.logout,
        method: 'POST',
        data: JSON.stringify({'token': _this.session.get('token')})
      })).then(function(data) {
        //clear the session data
        _this.session.set('token', '');
        _this.session.set('username', '');        
        _this.transitionTo('list');
      }, function(error) {
        alert(error);
      });
    }
  }
});
