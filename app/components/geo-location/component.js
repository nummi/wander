import Ember from 'ember';

const fakePayload = {
  accuracy: 59,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: 39.968074,
  longitude: -82.99629639999999,
  speed: null
};

export default Ember.Component.extend({
  geolocation: Ember.inject.service(),

  init() {
    this._super(...arguments);

    const success = function(position) {
      const payload = {
        accuracy:  position.coords.accuracy,
        altitude:  position.coords.altitude,
        heading:   position.coords.heading,
        latitude:  position.coords.latitude,
        longitude: position.coords.longitude,
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
          console.log('User denied the request for geolocation.');
          break;
        case error.POSITION_UNAVAILABLE:
          console.log('Geolocation information is unavailable.');
          break;
        case error.TIMEOUT:
          console.log('The request to get geolocation timed out.');
          break;
        case error.UNKNOWN_ERROR:
          console.log('An unknown geolocation error occurred.');
          break;
      }
    }.bind(this);

    if(this.attrs.success) { this.attrs.success(fakePayload); }
    this.set('loadingGeolocation', Ember.RSVP.resolve(fakePayload));

    // this.set(
    //   'loadingGeolocation',
    //   this.get('geolocation').getGeoposition().then(success, error)
    // );
  }
});
