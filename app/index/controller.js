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
    Ember.run.later(function() {
      $('.display-view-list-section').scrollTo($('.event-display--active'), 300);
    }, 100);
  },

  actions: {
    highlightEvent(event) {
      this.set('highlightedEvent', event);
      this.scrollHighlightedEventIntoView();
    }
  }
});
