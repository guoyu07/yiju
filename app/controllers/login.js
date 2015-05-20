import Ember from 'ember';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend({
  isLogin: null,
  loginStatus: null,
  actions: {
    login: function(username, password) {
      var data = {
        username: username,
        password: password
      }
      var self = this;
      Ember.$.ajax({
        type: 'POST',
        url: config.apiUrls.login,
        data: data
      }).then(function(data) {
        if (data.status === 'success') {
          self.set('isLogin', true);
          self.set('loginStatus', true);
          self.get('session').set('username', data.data.name);
          Ember.run.later((function() {
            self.transitionTo('list');
          }), 2000);
        } else if (data.status === 'fail') {
          self.set('isLogin', true);
          self.set('loginStatus', false);
        }
      });
    }
  }
});
