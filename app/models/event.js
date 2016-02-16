import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  description: attr('string'),
  cost: attr('dollars', { defaultValue: 0 }),
  geolocation: attr(),
  venue: attr(),
  weather: attr(),
  createdAt: attr('date')
});
