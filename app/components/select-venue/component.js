import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    close() {
      this.attrs.close();
    },

    selectVenue(venue) {
      this.attrs.selectVenue(venue);
    }
  }
});
