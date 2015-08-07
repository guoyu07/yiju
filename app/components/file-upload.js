import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  url: '',
  multiple: true,
  filesDidChange: function(files) {
    var uploadUrl = this.get('url');

    var uploader = EmberUploader.Uploader.create({
      url: uploadUrl
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files[0]);
    };
    uploader.on('didUpload', function(e) {
        // Handle finished upload
        alert(123);
        console.log(e);
    });

  }
});
