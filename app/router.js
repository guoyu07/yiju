import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('list',  { path: '/' });
	this.route('song', {path: '/song/:sid'});
  this.route('collections');
  this.route('collection', {path: '/collection/:id'});
  this.route('user', {path: '/user/:username'});
  //this.route('create');
  this.route('admin', function() {
    this.route('create');
    this.route('edit');
    this.route('user');
    this.route('modify', {path: '/:id'});
  });
	this.route('connect');
  this.resource('login');
  this.resource('signup');
});
