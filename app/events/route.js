import Ember from 'ember';
import eventsPayload from 'wander/events-payload';

export default Ember.Route.extend({
  model() {
    return eventsPayload.events
  }
});
