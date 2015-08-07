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
  actions: {
    delete: function(song) {
      var songs = this.get('list');
      var ids = this.get('ids');
      var id = song.sid;
      var idx = songs.indexOf(song);
      var idxx = ids.indexOf(id);
      songs.removeAt(idx);
      ids.removeAt(idxx);
    }
  }
})
