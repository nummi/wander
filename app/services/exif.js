import Ember from 'ember';
import EXIF from 'wander/lib/exif';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    EXIF.call(this);
  },

  getData(file, callback) {
    return this.EXIF.getData(file, callback);
  },

  getTag(file, tagName) {
    return this.EXIF.getTag(file, tagName);
  }
});
