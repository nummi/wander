import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  get, set,
  inject: { service }
} = Ember;

export default Component.extend({
  foursquare: service(),

  classNames: ['venue-list'],

  init() {
    this._super(...arguments);
    get(this, 'fetch').perform();
  },

  fetch: task(function * () {
    const xhr = get(this, 'foursquare').venues(
      get(this, 'latitude'), get(this, 'longitude')
    );

    yield xhr;

    xhr.then((result)=> { this.attrs.success(result); })
  }).drop(),

  actions: {
    searchForVenue(name) {
      // const lat     = get(this, 'latitude');
      // const lng     = get(this, 'longitude');
      // const promise = get(this, 'foursquare').venues(lat, lng, name);

      // set(this, 'loadingVenues', promise);
    }
  }
});
