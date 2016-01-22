import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('events',     { path: '/' });
  this.route('events-new', { path: '/events/new' });
});

export default Router;
