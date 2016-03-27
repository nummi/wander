import Ember from 'ember';
import ENV from 'wander/config/environment';

const {
  run: { debounce },
  Service,
  setProperties
} = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);
    window.addEventListener('resize', ()=> {
      this.get('setSize').perform();
    });

    window.dispatchEvent( (new CustomEvent('resize')) );
  },

  setSize: task(function * () {
    setProperties(this, {
      width: $(window).width(),
      height: $(window).height()
    });
  }).restartable()
});
