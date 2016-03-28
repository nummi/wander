import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  get, set,
  inject: { service },
  isEmpty
} = Ember;

export default Component.extend({
  foursquare: service(),

  classNames: ['venue-list'],

  init() {
    this._super(...arguments);
    get(this, 'fetch').perform(
      get(this, 'latitude'),
      get(this, 'longitude')
    );
  },

  fetch: task(function * (lat, lng, query) {
    let xhr;

    if(isEmpty(query)) {
      xhr = get(this, 'foursquare').venues(lat, lng, query);
    } else {
      xhr = get(this, 'foursquare').venues(lat, lng);
    }

    yield xhr;

    xhr.then((result)=> { this.attrs.success(result); })
  }).drop(),

  actions: {
    searchForVenue(name) {
      get(this, 'fetch').perform(
        get(this, 'latitude'),
        get(this, 'longitude'),
        name
      );
    }
  }
});
