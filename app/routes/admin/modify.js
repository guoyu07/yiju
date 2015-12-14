import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Ember.Route.extend({
  model: function(params) {
    this.set('cid', params.id)
    return Ember.RSVP.resolve(
      Ember.$.getJSON(apis.collection + params.id)
    );
  },
  setupController: function(controller, model) {
    controller.set('cid', this.get('cid'));
    this._super(controller, model);
  },
  actions: {
    willTransition: function(transition) {
      this.controller.set('enable', false);
    }
  }
})
