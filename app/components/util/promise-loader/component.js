import Ember from 'ember';

const {
  Component,
  computed,
  computed: { reads },
  ObjectProxy,
  PromiseProxyMixin,
  RSVP
} = Ember;

const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
  promise: null,

  promiseProxy: computed('promise', function() {
    return PromiseObject.create({
      promise: RSVP.resolve(this.get('promise'))
    });
  }),

  isFulfilled: reads('promiseProxy.isFulfilled')
});
