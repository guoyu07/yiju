import Ember from 'ember';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend({
  enable: false,

  actions: {
    updateAlbum: function(postData) {
      var _id = this.get('cid');
      var oprateUrl  = config.apiUrls.collection;
      Ember.RSVP.resolve(Ember.$.ajax({
        url: oprateUrl + _id,
        method: 'PUT',
        data: JSON.stringify(postData)
      })).then(function(data) {
        this.set('enable', true);
        Ember.run.later(function() {
          this.transitionToRoute('admin');
        }.bind(this), 2000);
        //alert('hahahah nice update');
      }.bind(this)).catch(function(err) {
        alert(err);
      });
    }
  }
})
