import Ember from 'ember';
import config from 'Yiju/config/environment';

var collectionUrl =  config.apiUrls.collection;
export default Ember.Controller.extend({
  deleteFromModel: function(collection) {
    var collections = this.get('model');
    var idx = collections.indexOf(collection);
    if (idx != -1) {
      collections.removeAt(idx);
    }
  },

  actions: {
    delete: function(collection) {
      Ember.RSVP.resolve(Ember.$.ajax({
        method: 'DELETE',
        url: collectionUrl + collection._id
      })).then(function(result) {
        if (result) {
          this.deleteFromModel(collection);
        }
      }.bind(this)).catch(function(error) {
        console.error(error);
        alert('删除失败');
      })
    }
  }
})
