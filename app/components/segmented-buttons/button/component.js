import Ember from 'ember';

const {
  Component,
  computed,
  get,
  isEqual
} = Ember;

export default Component.extend({
  classNames: ['segmented-button'],
  classNameBindings: ['active:segmented-button--active'],

  click() {
    this.attrs.action(get(this, 'value'));
  },

  active: computed('value', 'selectedValue', function() {
    return isEqual(
      get(this, 'value'),
      get(this, 'selectedValue')
    );
  })
});
