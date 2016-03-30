import Ember from 'ember';
import DS from 'ember-data';

const { attr } = DS;
const {
  computed,
  get,
  isEmpty
} = Ember;

export default DS.Model.extend({
  cost: attr('dollars', { defaultValue: 0 }),
  createdAt: attr('date'),
  description: attr('string'),
  geolocation: attr(),
  photo: attr('raw'),
  category: attr('string'),
  venue: attr(),
  weather: attr(),

  displayText: computed('venue.name', 'description', function() {
    return get(this, 'venue.name') || get(this, 'description');
  }),

  photoThumbnail: computed(function() {
    return this.get('photo.photo.thumbnail.url');
  }),

  iconPath: computed(function() {
    const BASE = '/images/weather-icons/';
    const urls = this.get('weather.weatherIconUrl');

    if(isEmpty(urls)) {
      return BASE + 'wsymbol_0999_unknown.svg';
    }

    return BASE + urls[0].value.replace('\.png', '.svg').match(/.*\/(.*?)$/)[1];
  })
});
