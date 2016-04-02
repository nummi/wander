import Ember from 'ember';

const {
  Component,
  get, set,
  inject: { service },
  RSVP
} = Ember;

const PERMISSION_DENIED    = 'User denied the request for geolocation.';
const POSITION_UNAVAILABLE = 'Geolocation information is unavailable.';
const TIMEOUT = 'The request to get geolocation timed out.';
const UNKNOWN_ERROR = 'An unknown geolocation error occurred.';

export default Component.extend({
  geolocation: service(),

  init() {
    this._super(...arguments);
    this.fetch();
  },

  fetch() {
    const success = function(position) {
      const payload = {
        accuracy:  position.coords.accuracy,
        altitude:  position.coords.altitude,
        heading:   position.coords.heading,
        latitude:  position.coords.latitude, longitude: position.coords.longitude,
        speed:     position.coords.speed
      };

      if(this.attrs.success) {
        this.attrs.success(payload);
      }

      return payload;
    }.bind(this);

    const error = function(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert(PERMISSION_DENIED);
          break;
        case error.POSITION_UNAVAILABLE:
          alert(POSITION_UNAVAILABLE);
          break;
        case error.TIMEOUT:
          alert(TIMEOUT);
          break;
        case error.UNKNOWN_ERROR:
          alert(UNKNOWN_ERROR);
          break;
      }
    }.bind(this);

    get(this, 'geolocation.getPosition').perform().then(success, error);
  }
});
