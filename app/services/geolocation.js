import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Service,
  RSVP
} = Ember;

export default Service.extend({
  getPosition: task(function * () {
    const promise = new RSVP.Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true
      });
    });

    yield promise;
    return promise;
  }).drop()
});
