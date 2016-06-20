import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  events: hasMany('event'),

  commentsDisabled: attr('boolean'),
  endDate: attr('date'),
  createdAt: attr('date'),
  name: attr('string'),
  shortName: attr('string'),
  startDate: attr('date')
});
