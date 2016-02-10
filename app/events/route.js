import Ember from 'ember';

export default Ember.Route.extend({
  events: Ember.inject.service(),

  model() {
    return this.get('events').get('all');
  }
});
