import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.resolve(
      Ember.$.getJSON(apis.collection + params.id)
    );
  },
  setupController: function(controller, model) {
    var userid = this.session.get('userid');
    if (userid) {
      model.songs.forEach(function(song) {
        var fanslist = song.fans;
        if (fanslist.indexOf(userid) != -1) {
          song.hearted = true;
        } else {
          song.hearted = false;
        }
      });
    }
    this._super(controller, model);
  },
  actions: {
    favSong: function(song, userid) {
      if (!userid) {
        alert('请先登录 再收藏歌曲');
      }
      var postData = {
        songId: song._id,
        userId: userid,
        faved: !song.hearted
      };

      Ember.RSVP.resolve(Ember.$.ajax({
        url: apis.fav,
        method: 'POST',
        data: JSON.stringify(postData)
      })).then(function(result) {
        Ember.set(song, 'hearted', !song.hearted);
      }).catch(function(error) {
        console.error(error);
        alert('网路出错 未收藏成功');
      });

    }
  }
});
