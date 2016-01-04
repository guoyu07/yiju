import Ember from 'ember';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

function htmlspecialchars_decode(str) {
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'');
}
export default Ember.Controller.extend({
  publishTime: Ember.computed('model.date', function() {
    var date = this.get('model.date');
    return date.substr(0, 10);
  }),
  decodeDesc: function() {
		var desc = this.get('model.htmlDesc');
		if (desc) {
			return htmlspecialchars_decode(desc);
		} else {
			return '';
		}
	}.property('model.htmlDesc'),
  isHearted: Ember.computed('model.fans.[]', function() {
    var hearted = false;
    var userid = this.get('session.userid');
    var fansArr = this.get('model.fans');
    fansArr.forEach(function(fan) {
      if (fan._id === userid) {
        hearted =  true;
        return;
      }
    });
    return hearted;
  }),
  actions: {
    favAlbum: function(collection, userid, faved) {
      if (!userid) {
        alert('请先登录再收藏专辑');
        return;
      }
      var postData = {
        userId: userid,
        faved: !faved,
        collectionId: collection._id,
        type: 'collection'
      };
      Ember.RSVP.resolve(
        Ember.$.ajax({
          url: apis.fav,
          method: 'POST',
          data: JSON.stringify(postData)
        })
      ).then(function(data) {
        var fansArr = this.get('model.fans');
        var index = -1;
        if (faved) {
          fansArr.forEach(function(fan, i) {
            if (fan._id === userid) {
              index = i;
            }
          });
          fansArr.removeAt(index);
        } else {
          fansArr.pushObject({'_id': userid});
        }
      }.bind(this)).catch(function(err) {
        console.error(err);
      });

    }
  }
});
