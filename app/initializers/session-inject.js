import Ember from 'ember';

export default {
  name: 'session-inject',
  initialize: function(container, application) {
    application.register('service:session', Ember.Object);
    application.inject('route', 'session', 'service:session');
    application.inject('controller', 'session', 'service:session');
  }
};
