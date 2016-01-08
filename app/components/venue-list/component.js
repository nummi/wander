import Ember from 'ember';

export default Ember.Component.extend({
  foursquare: Ember.inject.service(),

  classNames: ['venue-list'],

  didReceiveAttrs() {
    const promise = this.get('foursquare')
                        .venues(this.get('latitude'), this.get('longitude'));

    this.set('loadingVenues', promise);
  }
});
