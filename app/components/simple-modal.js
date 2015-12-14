import Ember from 'ember';

export default Ember.Component.extend({
  extraName: Ember.computed('extra', function() {
    var extra = this.get('extra');
    if (extra) {
      return 'extra-height';
    } else {
      return '';
    }
  }),
  actions: {
    close: function() {
      this.set('enable', false);
    }
  }
});
