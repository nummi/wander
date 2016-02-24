import Ember from 'ember';
import DS from 'ember-data';

const { attr } = DS;
const { computed, get } = Ember;

export default DS.Model.extend({
  cost: attr('dollars', { defaultValue: 0 }),
  createdAt: attr('date'),
  description: attr('string'),
  geolocation: attr(),
  category: attr('string'),
  venue: attr(),
  weather: attr(),

  displayText: computed('venue.name', 'description', function() {
    return get(this, 'venue.name') || get(this, 'description');
  })
});
