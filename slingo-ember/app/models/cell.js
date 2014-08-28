import Ember from "ember";

export default Ember.Object.extend({
  isCovered: Ember.computed.equal('value', 'X'),
  isJoker: Ember.computed.equal('value', 'joker'),
  isCoin: Ember.computed.equal('value', 'coin'),
  isDevil: Ember.computed.equal('value', 'devil')

  // isJoker: function() {
  //   return (this.get('icon') === 'fa fa-github');
  // }.property('icon'),

  // isCoin: function() {
  //   return (this.get('icon') === 'fa fa-usd');
  // }.property('icon'),

  // isDevil: function() {
  //   return (this.get('icon') === 'fa fa-reddit');
  // }.property('icon')
});
