import Ember from 'ember';

const {
  Controller,
  get, set,
  run
} = Ember;

import { categories } from 'wander/categories';

export default Controller.extend({
  confirmDelete: false,
  categories: categories,

  actions: {
    save() {
      get(this, 'model').save().then(() => {
        this.transitionToRoute('trips-show', get(this, 'model.trip'));
      });
    },

    cancel() {
      get(this, 'model').rollbackAttributes();
      this.transitionToRoute('trips-show', get(this, 'model.trip'));
    },

    confirmDelete() {
      set(this, 'confirmDelete', true);

      run.later(this, function() {
        set(this, 'confirmDelete', false);
      }, 5000);
    },

    'delete': function() {
      const event = get(this, 'model');
      const tripId = event.belongsTo('trip').id();
      set(this, 'confirmDelete', false);

      event.destroyRecord().then(()=> {
        this.transitionToRoute('trips-show', tripId);
      });
    },

    categorySelected(category) {
      set(this, 'model.category', category);
    },

    changeCreatedAt(newDate) {
      set(this, 'model.createdAt', newDate);
    }
  }
});
