import Ember from 'ember';

import { task } from 'ember-concurrency';

const {
  Controller,
  get
} = Ember;

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
    save() {
      const saveTask = get(this, 'save');

      if(get(saveTask, 'isRunning')) { return; }

      saveTask.perform();
    },

    cancel() {

    }
  }
});

