import Ember from 'ember';

const {
  Controller,
  get, set,
  run
} = Ember;

export default Controller.extend({
  selectVenue: false,

  actions: {
    selectVenue(venue) {
      set(this, 'model.venue', venue);
      set(this, 'selectVenue', false);
    },

    showSelectVenue() {
      set(this, 'selectVenue', true);
    },

    hideSelectVenue() {
      set(this, 'selectVenue', false);
    },

    geoLocationSuccess(data) {
      set(this, 'model.geolocation', data);
    },

    weatherSuccess(data) {
      set(this, 'model.weather', data);
    },

    save() {
      this.store.createRecord('event', get(this, 'model'))
                .save().then(()=> {
        this.transitionToRoute('events');
      });
    }
  }
});
