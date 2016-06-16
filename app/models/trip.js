import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  events: hasMany('event'),

  commentsDisabled: attr('boolean'),
  createdAt: attr('date'),
  name: attr('string'),
  shortName: attr('string')
});
