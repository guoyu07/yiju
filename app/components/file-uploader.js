import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: 'uploader dropzone',
  isDragging: false,
  isDisable: false,
  uploadProgress: false,
  uploadPercent: 0,
  uploadDone: false,
  classNameBindings: ['isDragging:dragover:dragoff'],
  uploadFile: null,
  _alreadyBind: false,
  previewUrl: '',
  fileName: '',
  previewPic: function(file) {
    if (typeof FileReader != 'undefined') {
      var reader = new FileReader();
      reader.onload = function(event) {
        var src = event.target.result;
        console.log(src);
        this.set('previewUrl', src);
      }.bind(this);
      reader.readAsDataURL(file);
    } else {
      alert('don\'t support FileReader API');
    }
  },
  dragOver: function(event) {
    // this is needed to avoid the default behaviour from the browser
    event.preventDefault();

  },
  dragEnter: function(event) {
    event.preventDefault();
    this.set('isDragging', true);
  },
  dragLeave: function() {
    event.preventDefault();
    this.set('isDragging', false);
  },
  drop: function(event) {
    event.preventDefault();
    if (!this.get('isDisable')) {
      this.set('isDragging', false);
      var file = event.dataTransfer.files[0];
      this.set('isDisable', true);
      this.set('uploadFile', file);
      this.previewPic(file);
    } else {
      alert('you can only upload one file at the time');
    }

  },

  bindFormEvents: Ember.on('didInsertElement', function() {
    if (!this.get('_alreadyBind')) {
      var input = document.getElementById('hidden-input');
      input.addEventListener('change', function(e) {
        this.set('_alreadyBind', true);
        var input = e.target;
        if (input.files && input.files[0]) {
          var file = input.files[0];
          this.set('isDisable', true);
          this.set('uploadFile', file);
          //debugger;
          this.previewPic(file);
        }
      }.bind(this), false);
    }

    /*Ember.$("#hidden-input").on('change', function(event) {
      var files = $(this).prop('files');
      console.log(files);
    }.bind(this));*/
  }),
  actions: {
    triggerForm: function() {
      Ember.$("#hidden-input").trigger('click');
    },
    uploadPhoto: function() {
      var inputFile = this.get('uploadFile');
      //begin upload
      this.set('uploadProgress', true);
      var formData = new FormData();
      formData.append('photo', inputFile);
      //fuck jquery ajax...
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload', true);
      xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
          var percent = (e.loaded / e.total) * 100;
          this.set('uploadPercent', percent);
        }
      }.bind(this)
      xhr.onload = function() {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          //upload done
          this.set('uploadDone', true);
          //reset uploading
          this.set('uploadProgress', false);
          this.set('uploadData', data);
          var uploadedUrl = 'http://localhost:5000' + data.thumbs
          this.set('uploadUrl', uploadedUrl);
          Ember.run.later(function() {
            //after 2 secs, reset to the start page
            this.set('uploadDone', false);
            this.set('isDisable', false);
          }.bind(this), 1500);
        } else {
          alert('上传失败');
          console.error(xhr.responseText);
        }
      }.bind(this);
      xhr.send(formData);
    },
    cancelPreview: function() {
      this.set('isDisable', false);
    }
  }
});
