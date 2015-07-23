import Ember from 'ember';

export default Ember.Component.extend({
  isNotEmpty: function() {
    var list = this.get('list');
    if (list.length === 0) {
      return false;
    } else {
      return true;
    }
  }.property('list.@each'),

})
