import Ember from 'ember';

const {
  Controller,
  computed: { sort }
} = Ember;

export default Controller.extend({
  eventsSortingAsc: ['createdAt:asc'],
  sortedEvents: sort('model', 'eventsSortingAsc')
});
