import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['segmented-buttons'],

  selectedValue: null,

  actions: {
    valueSelected(value) {
      this.attrs.valueSelected(value);
    }
  }
});
