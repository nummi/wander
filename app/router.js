import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index',       { path: '/' });

  this.route('trips',       { path: '/trips' });
  this.route('trips-new',   { path: '/trips/new' });
  this.route('trips-show',  { path: '/trips/:id' });
  this.route('trips-edit',  { path: '/trips/:id/edit' });

  this.route('events',      { path: '/events' });
  this.route('events-new',  { path: '/events/new' });
  this.route('events-edit', { path: '/events/:id/edit' });
});

export default Router;
