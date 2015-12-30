import Ember from 'ember';
import config from 'Yiju/config/environment';
//import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import EmberValidations from 'ember-validations';

var apis = config.apiUrls;

export default Ember.Controller.extend(EmberValidations,{
  validations: {
    identification: {
      presence: {message: '用户名不能为空'},
      format: {with: /[a-z|A-Z|_]/, message: '只允许英文字母或者下划线'}
    },
    password: {
      presence: {message: '密码不能为空'},
      length: { minimum: 6, messages: {tooShort: '密码要大于六位'}}
    }
  },
  showErrors: function() {
    this.get('errors.identification').set('show', true);
    this.get('errors.password').set('show', true);
  },
  //authenticator: 'authenticator:custom',
  actions: {
    // display an error when authentication fails
    authenticate: function() {
      var _this = this;
      var valid = _this.get('isValid');
      if (valid) {
        var credentials = this.getProperties('identification', 'password');
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
          _this.session.set('userid', data.data._id);
          _this.transitionTo('list');
          console.log(data);
        }).catch(function(error) {
          _this.set('errorMessage', '登录失败 请填写正确的用户名和密码');
          console.log(_this.get('errorMessage'));
          _this.set('identification', '');
          _this.set('password', '');
          debugger;
        });
      } else {
        this.showErrors();
      }
    }
  }
});
