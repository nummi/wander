import Ember from 'ember';

const {
  Controller,
  computed: { sort }
} = Ember;

export default Controller.extend({
  eventsSortingDesc: ['createdAt:desc'],
  sortedEvents: sort('model', 'eventsSortingDesc')
});
