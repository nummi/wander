import Ember from 'ember';

export default Ember.Controller.extend({
  events: Ember.inject.service(),
  selectVenue: false,

  actions: {
    selectVenue(venue) {
      this.set('model.venue', venue);
      this.set('selectVenue', false);
    },

    showSelectVenue() {
      this.set('selectVenue', true);
    },

    hideSelectVenue() {
      this.set('selectVenue', false);
    },

    geoLocationSuccess(data) {
      this.set('model.geolocation', data);
    },

    weatherSuccess(data) {
      this.set('model.weather', data);
    },

    save() {
      this.get('events').add(this.get('model'));
      this.transitionToRoute('events');
    }
  }
});
