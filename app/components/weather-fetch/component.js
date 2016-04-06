import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Component,
  get, set,
  inject: { service },
} = Ember;

export default Component.extend({
  weather: service(),
  
  fetch: task(function * () {
    let result = yield get(this, 'weather').current(
      get(this, 'latitude'), get(this, 'longitude')
    );
    
    this.attrs.success(result);
  }).on('init').drop()
});
