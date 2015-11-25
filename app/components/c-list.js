import Ember from 'ember';

export default Ember.Component.extend({
  isNotEmpty: Ember.computed('list.[]', function() {
    var length = this.get('list.length');
    if (length > 0) {
      return true;
    } else {
      return false;
    }
  }),
  actions: {
    delete: function(collection) {
      var confirm = window.confirm("确定要删除" + collection.title + '吗?');
      if (confirm) {
        this.sendAction('deleteCol', collection);
      }
    }
  }
});
