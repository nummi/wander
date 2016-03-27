import Ember from 'ember';

const {
  Controller,
  get, set,
  inject: { service },
  computed,
  computed: { alias, sort }
}  = Ember;

export default Controller.extend({
  window: service(),
  eventsSortingDesc: ['createdAt:asc'],
  sortedEvents: sort('model', 'eventsSortingDesc'),

  viewState: 'Events',

  highlightedEvent: null,
  scrollHighlightedEventIntoView() {
    Ember.run.later(function() {
      $('.display-view-list-section').scrollTo($('.event-display--active'), 300);
    }, 100);
  },

  actions: {
    highlightEvent(event) {
      set(this, 'highlightedEvent', event);
      this.scrollHighlightedEventIntoView();
    },

    changeViewState(value) {
      set(this, 'viewState', value);
    }
  }
});
