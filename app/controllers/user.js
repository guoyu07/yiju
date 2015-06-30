import Ember from 'ember';
export default Ember.Controller.extend({
  size: 100,
  gravatarUrl: function() {
    var email = this.get('user.avatar'),
        size = this.get('size');

    return 'http://www.gravatar.com/avatar/' + md5(email) + '?s=' + size;
  }.property('user.avatar', 'size')


});
