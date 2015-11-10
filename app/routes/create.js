import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var token = this.session.get('token');
    if (!token) {
      this.transitionTo('list');
    }
  }

});
