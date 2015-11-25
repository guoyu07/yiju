import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var token = this.session.get('token');
    if (!token) {
      this.transitionTo('list');
    }
  }
})
