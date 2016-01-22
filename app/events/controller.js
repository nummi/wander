import Ember from 'ember';

export default Ember.Controller.extend({
  selectVenue: false,
  selectedVenue: null,

  actions: {
    getVenue(venue) {
      this.set('selectedVenue', venue);
      this.set('selectVenue', false);
    },

    showSelectVenue() {
      this.set('selectVenue', true);
    },

    hideSelectVenue() {
      this.set('selectVenue', false);
    }
  }
});
