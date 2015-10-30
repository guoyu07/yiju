import Ember from 'ember';
import config from 'Yiju/config/environment';
//import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import EmberValidations from 'ember-validations';

var apis = config.apiUrls;

export default Ember.Controller.extend(EmberValidations,{
  validations: {
    identification: {
      presence: true
    },
    password: {
      presence: true,
      length: { minimum: 6 }
    }
  },
  alt: false,
  //authenticator: 'authenticator:custom',
  actions: {
    // display an error when authentication fails
    authenticate: function() {

      var _this = this;
      var valid = _this.get('isValid');
      if (valid) {
        var credentials = this.getProperties('identification', 'password');
        /*this.get('session').authenticate('authenticator:custom', credentials).then(
        function() {
          var username = _this.get('session.secure.data.name');
          _this.get('session').set('username', username);
          //debugger;
        }, function(message) {
          // but the reject callback works fine, the message is the right one
          _this.set('errorMessage', message.msg);
          _this.set('identification', '');
          _this.set('password', '');
        });*/
        Ember.RSVP.resolve(
          Ember.$.ajax({
            type: "POST",
            url: apis.login,
            data: JSON.stringify({
              username: credentials.identification,
              password: credentials.password
            })
          })
        ).then(function(data) {
          _this.session.set('token', data.token);
          _this.session.set('username', data.data.name);
          _this.transitionTo('list');
          console.log(data);
        }, function(error) {
          _this.set('errorMessage', error.msg);
          _this.set('identification', '');
          _this.set('password', '');
        })
      }
    }
  }
});
