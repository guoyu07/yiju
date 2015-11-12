import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('list',  { path: '/' });
	this.route('song', {path: '/song/:sid'});
  this.route('collection', {path: '/collection/:id'});
  this.route('user', {path: '/user/:username'});
  this.route('create');
	this.route('connect');
  this.resource('login');
  this.resource('signup');
});
