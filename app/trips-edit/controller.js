import Ember from 'ember';

const {
  Controller,
  get, set,
  run
} = Ember;

import { task } from 'ember-concurrency';
import slugify from 'wander/lib/slugify';

export default Controller.extend({
  confirmDelete: false,

  save: task(function * () {
    const trip = get(this, 'model');
    const promise = trip.save();

    yield promise;

    promise.then(()=> {
      this.transitionToRoute('trips-show', trip);
    });
  }),

  actions: {
    nameChanged() {
      set(this, 'model.shortName', slugify(get(this, 'model.name')));
    },

    changeStartDate(newDate) {
      set(this, 'model.startDate', newDate);
    },

    changeEndDate(newDate) {
      set(this, 'model.endDate', newDate);
    },

    save() {
      const saveTask = get(this, 'save');

      if(get(saveTask, 'isRunning')) { return; }

      saveTask.perform();
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

