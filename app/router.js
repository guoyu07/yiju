import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('list',  { path: '/' });
	this.route('song', {path: '/song/:sid'});
	this.route('connect');
  this.route('login');
  this.route('signup');
});
