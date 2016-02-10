import Ember from 'ember';
import _ from 'lodash/lodash';
import eventsPayload from 'wander/events-payload';

export default Ember.Service.extend({
  data: null,

  init() {
    this._super(...arguments);
    this.set('data', _.cloneDeep(eventsPayload.events));
  },

  all: Ember.computed('data.[]', function() {
    return this.get('data');
  }),

  add(event) {
    this.get('data').pushObject(event);
  }
});
