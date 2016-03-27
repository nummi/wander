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
        this.transitionToRoute('events');
      });
    },

    cancel() {
      get(this, 'model').rollbackAttributes();
      this.transitionToRoute('events');
    },

    confirmDelete() {
      set(this, 'confirmDelete', true);

      run.later(this, function() {
        set(this, 'confirmDelete', false);
      }, 5000);
    },

    'delete': function() {
      set(this, 'confirmDelete', false);
      get(this, 'model').destroyRecord().then(()=> {
        this.transitionToRoute('events');
      });
    },

    categorySelected(category) {
      set(this, 'model.category', category);
    },
  }
});
