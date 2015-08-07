import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'file',
  change: function(e) {
    var inputFiles = e.target.files;
    var inputFile = inputFiles[0];
    var formData = new FormData();
    formData.append('photo', inputFile);
    Ember.$.ajax({
      type: 'POST',
      url: '/upload',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        console.log(data);
      },
      error: function(err) {
        console.error(err)
      }
    })
  }
});
