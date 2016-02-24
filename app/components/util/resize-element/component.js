import Ember from 'ember';
import eventName from 'wander/lib/event-name';

const {
  Component, get
}  = Ember;

export default Component.extend({
  targetClass: '',

  didInsertElement() {
    this._super(...arguments);
    this.handleResizeEvent();
    this._setupWindowResize();
  },

  willDestroyElement() {
    this._super(...arguments);
    this._teardownWindowResize();
  },

  _setupWindowResize() {
    $(window).on(eventName('resize', this.elementId), ()=> {
      this.handleResizeEvent();
    });
  },

  _teardownWindowResize() {
    $(window).off(eventName('resize', this.elementId));
  },

  handleResizeEvent() {
    const newHeight = this.$().height();
    this.$('.' + get(this, 'targetClass')).height(newHeight);
  }
});
