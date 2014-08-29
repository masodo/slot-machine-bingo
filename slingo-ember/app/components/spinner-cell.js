import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['col-md-1', 'spinner-col'],
  classNameBindings: ['isSpecial:fa', 'isJoker:fa-reddit', 'isCoin:fa-usd', 'isDevil:fa-github'],
  isJoker: Ember.computed.equal('cell.value', 'joker'),
  isCoin: Ember.computed.equal('cell.value', 'coin'),
  isDevil: Ember.computed.equal('cell.value', 'devil'),
  isSpecial: Ember.computed.any('isJoker', 'isDevil', 'isCoin'),
  isNotSpecial: Ember.computed.not('isSpecial')
});
