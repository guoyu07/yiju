import Ember from 'ember';
function htmlspecialchars_decode(str) {
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'');
}
export default Ember.Controller.extend({
	decodeLyrics: function() {
		var lyrics = this.get('song.lyrics');
		if (lyrics) {
			return htmlspecialchars_decode(lyrics);
		} else {
			return '';
		}
	}.property('song.lyrics')
});
