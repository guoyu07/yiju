import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from 'Yiju/config/environment';

export default Ember.Controller.extend(EmberValidations, {
  enable: false,
  actions: {
    createAlbum: function(postData) {
      var createUrl =  config.apiUrls.create;
      Ember.RSVP.resolve(Ember.$.ajax({
        url: createUrl,
        method: 'POST',
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
});
