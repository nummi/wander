import Ember from 'ember';
import {
  dmsToDecimal,
  gpsDirection
} from 'wander/lib/gps';

import { task } from 'ember-concurrency';
import { categories } from 'wander/categories';
import readFile from 'wander/lib/read-file';

const {
  Controller,
  get, set,
  inject,
  inject: { service }
} = Ember;

export default Controller.extend({
  tripsController: inject.controller('trips-show'),
  exif: service(),
  selectVenue: false,

  trip: Ember.computed.alias('tripsController.model'),

  file: null,
  uploader: null,

  categories: categories,

  save: task(function * () {
    const event = this.store.createRecord('event', get(this, 'model'));
    set(event, 'trip', get(this, 'trip'));

    const promise = event.save();

    yield promise;

    promise.then(()=> {
      this.transitionToRoute('trips-show', get(this, 'trip'));
    });
  }).drop(),

  getLatAndLngWithFile(file) {
    const self = this;
    const exif = this.get('exif');

    exif.getData(file, function() {
      const lat = gpsDirection(
        exif.getTag(this, 'GPSLatitudeRef'),
        dmsToDecimal.apply(this, exif.getTag(this, 'GPSLatitude'))
      );

      const lng = gpsDirection(
        exif.getTag(this, 'GPSLongitudeRef'),
        dmsToDecimal.apply(this, exif.getTag(this, 'GPSLongitude'))
      );

      const gpsAltitude = exif.getTag(this, 'GPSAltitude');
      const altitude = gpsAltitude ? gpsAltitude.numerator : null;

      if(lat && lng) {
        self.send('geoLocationSuccess', {
          latitude: lat,
          longitude: lng,
          altitude: altitude
        });
      }
    });
  },

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

    clearGeolocation() {
      set(this, 'model.geolocation', null);
    },

    weatherSuccess(data) {
      set(this, 'model.weather', data);
    },

    clearWeather() {
      set(this, 'model.weather', null);
    },

    save() {
      this.get('save').perform();
    },

    fileLoaded(file) {
      this.getLatAndLngWithFile(file);

      readFile(file, 'readAsDataURL').then((convertedFile) => {
        set(this, 'model.photo', convertedFile);
      });
    },

    categorySelected(category) {
      set(this, 'model.category', category);
    }
  }
});
