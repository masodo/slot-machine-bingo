import Ember from "ember";
import Board from "./board";

export default Ember.Object.extend({

  gameOver: Ember.computed.alias('board.boardComplete'),

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
    this.set('completedCounts', {});

    // hacks to make observer work
    // I think because what is being observed is not in this model
    this.get('board.horizontalComplete');
    this.get('board.verticalComplete');
    this.get('board.diagnalComplete');
    this.get('gameOver');
  },

  score: function() {
    return this.get('scoreArray').reduce( function(prev, score) {
      return prev + score;
    });
  }.property('scoreArray.[]'),

  addScoreValue: function(value) {
    this.get('scoreArray').pushObject(value);
  },

  rowColObserver: function(board, observedProperty) {
    var delta = this.completedCountDelta(observedProperty);
    this.addScoreValue(delta * 1000);
  }.observes('board.horizontalComplete', 'board.verticalComplete', 'board.diagnalComplete'),

  completedCountDelta: function(observedProperty) {
    var num = this.get(observedProperty);
    var old = this.get('completedCounts')[observedProperty] || 0;
    this.get('completedCounts')[observedProperty] = num;
    return num - old;
  },

  boardCompleteObserver: function() {
    if (this.get('gameOver')) {
      var spins = this.get('spins');

      if (spins < 12) {
        this.addScoreValue(11000);
      } else if (spins === 13) {
        this.addScoreValue(10000);
      } else {
        var bonus = 9000 - ((spins - 14) * 500);
        this.addScoreValue(bonus);
      }
    }
  }.observes('gameOver')
});
