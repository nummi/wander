import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      category: 'location',
      venue: { name: '' },
      publish: true
    };
  }
});
