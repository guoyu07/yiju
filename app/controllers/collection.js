import Ember from 'ember';
function htmlspecialchars_decode(str) {
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'');
}
export default Ember.Controller.extend({
  decodeDesc: function() {
		var desc = this.get('model.htmlDesc');
		if (desc) {
			return htmlspecialchars_decode(desc);
		} else {
			return '';
		}
	}.property('model.htmlDesc')
});
