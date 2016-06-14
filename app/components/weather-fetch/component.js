import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  get,
  inject: { service },
} = Ember;

export default Component.extend({
  weather: service(),

  init() {
    this._super(...arguments);
    get(this, 'fetch').perform();
  },

  fetch: task(function * () {
    const xhr = get(this, 'weather').current(
      get(this, 'latitude'), get(this, 'longitude')
    );

    yield xhr;

    xhr.then((result)=> { this.attrs.success(result); });
  }).drop()
});
