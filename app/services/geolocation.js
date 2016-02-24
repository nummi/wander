import Ember from 'ember';

const {
  Service,
  RSVP
} = Ember;

export default Service.extend({
  getGeoposition() {
    return new RSVP.Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true
      });
    });
  }
});
