import Ember from "ember";

export default Ember.Object.extend({
  isJoker: function() {
    return (this.get('icon') === 'fa fa-github');
  }.property('icon'),

  isCoin: function() {
    return (this.get('icon') === 'fa fa-usd');
  }.property('icon'),

  isDevil: function() {
    return (this.get('icon') === 'fa fa-reddit');
  }.property('icon'),

  isCovered: function() {
    return (this.get('value') === 'X');
  }.property('value')
});
