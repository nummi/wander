import Ember from 'ember';

const {
  Controller,
  computed: { sort }
} = Ember;

export default Controller.extend({
  eventsSorting: ['createdAt:desc'],
  sortedEvents: sort('model.events.[]', 'eventsSorting')
});
