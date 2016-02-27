import Ember from 'ember';

const {
  Component,
  computed,
  computed: { reads },
  get,
  ObjectProxy,
  PromiseProxyMixin,
  RSVP
} = Ember;

const PromiseObject = ObjectProxy.extend(PromiseProxyMixin);

export default Component.extend({
  promise: null,

  promiseProxy: computed('promise', function() {
    return PromiseObject.create({
      promise: RSVP.resolve(get(this, 'promise'))
    });
  }),

  isFulfilled: reads('promiseProxy.isFulfilled')
});
