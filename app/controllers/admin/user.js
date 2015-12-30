import Ember from 'ember';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend({
  deleteFromModel: function(user) {
    var users = this.get('model');
    var idx = users.indexOf(user);
    if (idx != -1) {
      users.removeAt(idx);
    }
  },
  actions: {
    delete: function(user) {
      var confirm = window.confirm('你真的要删除这名用户吗？ 一旦删除就无法恢复。');
      if (confirm) {
        Ember.RSVP.resolve(
          Ember.$.ajax({
            method: 'DELETE',
            url: config.apiUrls.user + user._id
          })
        ).then(function(result){
          if (result) {
            this.deleteFromModel(user);
          }
        }.bind(this)).catch(function(error) {
          alert('删除失败了');
        });
      }
    },
    promote: function(user) {
      var confirm = window.confirm('你确定要更改这个成员的权限吗?');
      if (confirm) {
        var postData = {admin: !user.admin};
        Ember.RSVP.resolve(
          Ember.$.ajax({
            method: 'PUT',
            url: config.apiUrls.user + user._id,
            data: JSON.stringify(postData)
          })
        ).then(function(result) {
          if (result) {
            Ember.set(user, 'admin', !user.admin);
          }
        })
      }
    }
  }
});
