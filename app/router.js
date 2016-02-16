import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index',       { path: '/' });
  this.route('events',      { path: '/events' });
  this.route('events-new',  { path: '/events/new' });
  this.route('events-edit', { path: '/events/:id/edit' });
});

export default Router;
