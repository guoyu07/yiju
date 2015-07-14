import Ember from 'ember';
function htmlspecialchars_decode(str) {
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'');
}
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
	decodeLyrics: function() {
		var lyrics = this.get('song.lyrics');
		if (lyrics) {
			return htmlspecialchars_decode(lyrics);
		} else {
			return '';
		}
	}.property('song.lyrics'),
	niceComments : Ember.computed.map('comments', function(comment, index) {
		return {title: comment.title.toUpperCase()};
	}),
	newComments: Ember.computed.filter('comments', function(comment, index, array) {
		if (comment.title.length > 15) {
			return {title: comment.title + '!!!'};
		}
	})
});
