import Ember from 'ember';

const {
  Controller,
  get,
  inject: { service },
  computed,
  computed: { alias, sort }
}  = Ember;

export default Controller.extend({
  eventsSortingDesc: ['createdAt:asc'],
  sortedEvents: sort('model', 'eventsSortingDesc'),

  highlightedEvent: null,
  scrollHighlightedEventIntoView() {
  },

  actions: {
    highlightEvent(event) {
      this.set('highlightedEvent', event);
      this.scrollHighlightedEventIntoView();
    }
  }
});
