import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      songs: [],
      thumb: ''
    }
  },
  actions: {
    willTransition: function(transition) {
      this.controller.set('enable', false);
    }
  }
});
