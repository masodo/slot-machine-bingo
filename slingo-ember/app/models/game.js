import Ember from "ember";
import Board from "./board";

export default Ember.Object.extend({

  init: function() {
    this.newGame();
    this._super();
  },

  newGame: function() {
    this.set('maxSpins', 20);
    this.set('spins', 0);
    this.set('jokers', 0);
    this.set('coins', 0);
    this.set('devils', 0);
    this.set('board', Board.create());
    this.set('scoreArray', [0]);
  },

  score: function() {
    return this.get('scoreArray').reduce( function(prev, score) {
      return prev + score;
    });
  }.property('scoreArray.@each'),

  addScoreValue: function(value) {
    this.get('scoreArray').pushObject(value);
  },
});
