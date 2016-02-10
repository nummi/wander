import Ember from 'ember';

const { computed } = Ember;

const PromiseObject = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

export default Ember.Component.extend({
  promise: null,

  promiseProxy: computed('promise', function() {
    return PromiseObject.create({
      promise: Ember.RSVP.resolve(this.get('promise'))
    });
  }),

  isFulfilled: computed.reads('promiseProxy.isFulfilled')
});
