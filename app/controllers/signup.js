import Ember from 'ember';
import config from 'Yiju/config/environment';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    username: {
      presence: {message: '用户名不能为空'},
      format: {with: /[a-z|A-Z|_]/, message: '只允许英文字母或者下划线'}
    },
    password: {
      presence: {message: '密码不能为空'},
      length: { minimum: 6, messages: {tooShort: '密码要大于六位'}}
    },
    repassword: {
      presence: {message: '密码不能为空'},
      length: { minimum: 6, messages: {tooShort: '密码要大于六位'}}
    },
    avatar: {
      presence: {message: 'Email地址不能为空'},
      format: {with: /.+@.+\..{2,4}/, message: '请填写正确的Email格式'}
    }
  },
  message: '',
  resetInput: function() {
    this.set('username', '');
  },
  showErrors: function() {
    this.get('errors.username').set('show', true);
    this.get('errors.password').set('show', true);
    this.get('errors.repassword').set('show', true);
    this.get('errors.avatar').set('show', true);
  },
  checkUser: function(username, postData, self) {
    return Ember.$.ajax({
      type: 'GET',
      url: config.apiUrls.check + username,
    }).then(function(data){
      if (data.exsitUser) {
        self.set('message', '该用户名已经存在');
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
      return Ember.RSVP.resolve(Ember.$.ajax({
        type: 'POST',
        url: config.apiUrls.adduser,
        data: JSON.stringify(result.data)
      })).then(function(data) {
        if (data) {
          self.set('message', '注册成功:'
                  + data.name + '2秒后跳转到登录页面');
          Ember.run.later((function() {
            self.transitionTo('login');
          }), 2000);
        }
      }).catch(function(error) {
        self.set('message', '注册失败');
      });
    }
  },
  actions: {
    signup: function() {
      if (this.get('isValid')){
        var password = this.get('password');
        var repass = this.get('repassword');
        if (password !== repass) {
          this.set('message', '两次密码输入必须相同');
          return;
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
      } else {
        this.showErrors();
      }
    }
  }
});
