import Ember from 'ember';

export default Ember.Controller.extend({
  eventsSortingDesc: ['createdAt:desc'],
  sortedEvents: Ember.computed.sort('model', 'eventsSortingDesc')
});
