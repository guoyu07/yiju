import Ember from 'ember';
import config from 'Yiju/config/environment';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    username: {
      presence: true
    },
    password: {
      presence: true,
      length: { minimum: 6 }
    },
    repassword: {
      presence: true,
      length: { minimum: 6 }
    },
    avatar: {
      presence: true,
      format: {with: /.+@.+\..{2,4}/, message: 'must be a email address'}
    }
  },
  message: '',
  resetInput: function() {
    this.set('username', '');
  },
  checkUser: function(username, postData, self) {
    return Ember.$.ajax({
      type: 'GET',
      url: config.apiUrls.check + username,
    }).then(function(data){
      if (data.exsitUser) {
        self.set('message', 'username exsits');
        self.resetInput();
        return {check: false};
      } else {
        return {check: true, data: postData, controller: self};
      }
    });
  },
  signupUser: function(result) {
    if (result.check) {
      var self = result.controller;
      return Ember.$.ajax({
        type: 'POST',
        url: config.apiUrls.adduser,
        data: JSON.stringify(result.data)
      }).then(function(data) {
        if (data) {
          self.set('message', 'signup complete, your name is:'
                  + data.name + '2 secs to go to the login page');
          Ember.run.later((function() {
            self.transitionTo('login');
          }), 2000);

        }
      });
    }
  },
  actions: {
    signup: function() {
      if (this.get('isValid')){
        var password = this.get('password');
        var repass = this.get('repassword');
        if (password !== repass) {
          this.set('message', 'two passwords are not the same');
        }
        var username = this.username;
        var data = {
          name: username,
          password: this.password,
          avatar: this.avatar
        };
        var self = this;

        this.checkUser(username, data, self)
            .then(this.signupUser);
      }
    }
  }
});
