import Ember from 'ember';

export default Ember.Component.extend({
  data: {},

  actions: {
    close() {
      this.attrs.close();
    },

    selectVenue(venue) {
      this.attrs.selectVenue(venue);
    },

    venuesLoaded(result) {
      this.set('data', result);
    }
  }
});
