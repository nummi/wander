import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default Ember.Component.extend({
  promise: null,

  promiseProxy: computed('promise', function() {
    return DS.PromiseObject.create({
      promise: Ember.RSVP.resolve(this.get('promise'))
    });
  }),

  isFulfilled: computed.reads('promiseProxy.isFulfilled')
});
