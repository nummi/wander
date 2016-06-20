import Ember from 'ember';

const {
  Controller,
  get, set
} = Ember;

import { task } from 'ember-concurrency';
import slugify from 'wander/lib/slugify';

export default Controller.extend({
  save: task(function * () {
    const trip = this.store.createRecord('trip', get(this, 'model'));
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
      this.transitionToRoute('trips');
    }
  }
});

