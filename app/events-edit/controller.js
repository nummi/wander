import Ember from 'ember';

export default Ember.Controller.extend({
  confirmDelete: false,

  actions: {
    save() {
      this.get('model').save();
      this.transitionToRoute('events');
    },

    cancel() {
      this.get('model').rollbackAttributes();
      this.transitionToRoute('events');
    },

    confirmDelete() {
      this.set('confirmDelete', true);

      Ember.run.later(this, function() {
        this.set('confirmDelete', false);
      }, 5000);
    },

    'delete': function() {
      this.get('model').destroyRecord().then(()=> {
        this.transitionToRoute('events');
      });
    }
  }
});
