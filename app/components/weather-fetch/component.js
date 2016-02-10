import Ember from 'ember';

export default Ember.Component.extend({
  weather: Ember.inject.service(),

  didReceiveAttrs() {
    const promise = this.get('weather')
                        .current(this.get('latitude'), this.get('longitude'));

    this.set('loadingWeather', promise);

    promise.then(result => {
      this.attrs.success(result);
    });
  }
});
