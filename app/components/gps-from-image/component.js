import Ember from 'ember';
import {
  dmsToDecimal,
  gpsDirection
} from 'wander/lib/gps';

export default Ember.Component.extend({
  exif: Ember.inject.service(),

  getLatAndLngWithFile(file) {
    const exif = this.get('exif');

    exif.getData(file, function() {
      var lat = gpsDirection(
        exif.getTag(this, 'GPSLatitudeRef'),
        dmsToDecimal.apply(this, exif.getTag(this, 'GPSLatitude'))
      );

      var lng = gpsDirection(
        exif.getTag(this, 'GPSLongitudeRef'),
        dmsToDecimal.apply(this, exif.getTag(this, 'GPSLongitude'))
      );

      return [lat, lng];
    });
  },

  change(e) {
    const coords = this.getLatAndLngWithFile(e.target.files[0]);
    console.log(coords);
  }
});
