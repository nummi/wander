import Ember from 'ember';

const {
  Component,
  get, set,
  inject: { service },
} = Ember;

export default Component.extend({
  weather: service(),

  didReceiveAttrs() {
    const promise = get(this, 'weather').current(
      this.get('latitude'), this.get('longitude')
    );

    set(this, 'loadingWeather', promise);

    promise.then(result => {
      this.attrs.success(result);
    });
  }
});
