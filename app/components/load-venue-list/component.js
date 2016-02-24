import Ember from 'ember';

const {
  Component,
  get, set,
  inject: { service }
} = Ember;

export default Component.extend({
  foursquare: service(),

  classNames: ['venue-list'],

  didReceiveAttrs() {
    const promise = get(this, 'foursquare').venues(
      this.get('latitude'), this.get('longitude')
    );

    set(this, 'loadingVenues', promise);
  },

  actions: {
    searchForVenue(name) {
      // const lat = get(this, 'latitude');
      // const lng = get(this, 'longitude');
      // const promise = get(this, 'foursquare').venues(lat, lng, name);

      // set(this, 'loadingVenues', promise);
    }
  }
});
