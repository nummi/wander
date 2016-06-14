import Ember from 'ember';

const {
  Controller,
  get, set,
  run
} = Ember;

export default Controller.extend({
  confirmDelete: false,

  actions: {
    save() {
      get(this, 'model').save().then(() => {
        this.transitionToRoute('trips-show', get(this, 'model'));
      });
    },

    cancel() {
      get(this, 'model').rollbackAttributes();
      this.transitionToRoute('trips-show', get(this, 'model'));
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
        this.transitionToRoute('trips');
      });
    },
  }
});

