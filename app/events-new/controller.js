import Ember from 'ember';

export default Ember.Controller.extend({
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
      this.store.createRecord('event', this.get('model'))
                .save().then(()=> {
        this.transitionToRoute('events');
      });
    }
  }
});
