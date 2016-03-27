import EmberUploader from 'ember-uploader';
import ENV from 'wander/config/environment';

export default EmberUploader.FileField.extend({

  filesDidChange(files) {
    const uploader = EmberUploader.S3Uploader.create({
      signingUrl: ENV.host + '/sign',
      url: this.get('url')
    });

    uploader.on('didUpload', response => {
      // S3 will return XML with url
      let uploadedUrl = $(response).find('Location')[0].textContent;
      // http://yourbucket.s3.amazonaws.com/file.png
      uploadedUrl = decodeURIComponent(uploadedUrl);
    });

    this.attrs.fileAdded(files[0], uploader);

    if (!Ember.isEmpty(files)) {
      // Send a sign request then upload to S3
      uploader.upload(files[0]);
    }
  }
});


// import Ember from 'ember';
// import ENV from 'wander/config/environment';
//
// export default Ember.Component.extend({
//   attributeBindings: ['type', 'accept', 'multiple', 'name'],
//   tagName: 'input',
//   type: 'file',
//   name: 'file',
//   multiple: false,
//   autoUpload: false,
//
//   init() {
//     this._super(...arguments);
//     Ember.assert('Please provide filePath property', this.get('filePath'));
//   },
//
//   didInsertElement() {
//     this._super(...arguments);
//     Ember.run.scheduleOnce('afterRender', this, this._setupFileUpload);
//   },
//
//   _setupFileUpload() {
//     this.$().fileupload({
//       autoUpload: this.get('autoUpload'),
//       dataType: 'XML',
//       method: 'POST'
//     });
//
//     this.$().on('fileuploadadd', (e, data) => {
//
//       // call action fileAdded if it's defined
//       if (this.attrs.fileAdded) {
//         this.attrs.fileAdded(data.files[0]);
//       }
//
//       // get keys in order to make a successful request to S3
//       const requestPayload = { file_path: this.get('filePath'),
//                                file_name: data.files[0].name,
//                                content_type: data.files[0].type };
//
//       return $.getJSON(ENV.host + '/sign', requestPayload, (response) => {
//         data.url = response.url;
//         data.formData = response.formData;
//         return data.process().done(() => {
//           return data.submit();
//         });
//       });
//     });
//
//     this.$().on('fileuploadstart', (e, data) => {
//       // call action uploadStarted if it's defined
//       if (this.attrs.uploadStarted) {
//         this.attrs.uploadStarted();
//       }
//     });
//
//     this.$().on('fileuploadprogress', (e, data) => {
//       // call action uploadProgress if it's defined
//       if (this.attrs.uploadProgress) {
//         this.attrs.uploadProgress(data);
//       }
//     });
//
//     this.$().on('fileuploaddone', (e, data) => {
//       // call action uploadFinished if it's defined
//       if (this.attrs.uploadFinished) {
//         // S3 will return XML with url
//         let uploadedS3Url = $(data.result).find('Location')[0].textContent;
//         uploadedS3Url = uploadedS3Url.replace(/%2F/g, '/');
//
//         this.attrs.uploadFinished(uploadedS3Url, data);
//       }
//     });
//
//     this.$().on('fileuploadfail', (e, data) => {
//       // call action uploadFailed if it's defined
//       if (this.attrs.uploadFailed) {
//         this.attrs.uploadFailed(data.errorThrown);
//       }
//     });
//   }
// });
