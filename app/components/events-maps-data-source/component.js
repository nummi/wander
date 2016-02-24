import Ember from 'ember';
import _ from 'lodash/lodash';

const {
  Component,
  get, set
} = Ember;

export default Component.extend({
  lat: 36.9471936,
  lng: -88.58287,
  zoom: 5,
  type: 'terrain',

  init() {
    this._super(...arguments);

    this.setupPolylines();

    const markers = _.map(get(this, 'events'), (event)=> {
      const self = this;

      return {
        animation: google.maps.Animation.DROP,
        lat: get(event, 'geolocation.latitude'),
        lng: get(event, 'geolocation.longitude'),
        infoWindow: { content: '<p>' + get(event, 'displayText') + '</p>' },
        click: function(e) {
          const event = self.findEventByGeolocation(e.lat, e.lng);
          self.attrs.highlightEvent(event);
        },
      };
    });

    set(this, 'markers', markers);
  },

  setupPolylines() {
    const path = _.map(get(this, 'events'), (event)=> {
      return [
        get(event, 'geolocation.latitude'),
        get(event, 'geolocation.longitude')
      ];
    });

    set(this, 'polylines', Ember.A([{
      id: 'unique-id',
      path: path,
      clickable: true,
      editable: false,
      geodesic: true,
      icons: [{
        icon: {
          // BACKWARD_CLOSED_ARROW | BACKWARD_OPEN_ARROW | CIRLCE | FORWARD_OPEN_ARROW
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        },
        offset: '100%'
      }],
      strokeColor: 'red',
      strokeOpacity: 0.75,
      strokeWeight: 3,
      visible: true,
      zIndex: 999
    }]));
  },

  findEventByGeolocation(lat, lng) {
    return _.find(get(this, 'events'), function(event) {
      const eventLat = get(event, 'geolocation.latitude');
      const eventLng = get(event, 'geolocation.longitude');

      return eventLat === lat && eventLng === lng;
    });
  }
});
