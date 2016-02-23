import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  lat: 36.9471936,
  lng: -88.58287,
  zoom: 5,
  type: 'terrain',

  init() {
    this._super(...arguments);

    const markers = _.map(this.get('events'), (event)=> {
      return {
        lat: event.get('geolocation.latitude'),
        lng: event.get('geolocation.longitude')
      };
    });

    this.set('markers', markers);
  }
});
