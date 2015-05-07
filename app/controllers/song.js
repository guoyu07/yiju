import Ember from 'ember';

export default Ember.Controller.extend({
	comments : [
		{title: 'i love'},
		{title: 'hey man pertty good'},
		{title: 'bye bye lily'}
	],
	titleCount : function() {
		var title = this.get('song.title');
		return title.length;
	}.property('song.title'),
	niceComments : Ember.computed.map('comments', function(comment, index) {
		return {title: comment.title.toUpperCase()};
	}),
	newComments: Ember.computed.filter('comments', function(comment, index, array) {
		if (comment.title.length > 15) {
			return {title: comment.title + '!!!'};
		}
	})
});