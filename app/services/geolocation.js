import Ember from 'ember';

export default Ember.Service.extend({
  getGeoposition() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true
      });
    });
  }
});
