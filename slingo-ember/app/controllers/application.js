import Ember from 'ember';

export default Ember.ObjectController.extend({
  cells: Ember.computed.alias('content.board.cellMatrix'),
  spinner: Ember.computed.alias('content.board.spinner'),
  score: Ember.computed.alias('content.score'),

  canCover: function(cell) {
    var spinnerCell = this.get('spinner')[cell.get('col')];
    var canCover = spinnerCell.get('value') === cell.get('value') ||
      (spinnerCell.get('isJoker') && spinnerCell.get('jokerNotUsed'));
    if (canCover && spinnerCell.get('isJoker')) {
      spinnerCell.set('jokerNotUsed', false);
    }
    return canCover;
  },

  actions: {
    newGameClick: function() {
      this.get('content').newGame();
    },

    cellClick: function(cell) {
      cell.set('value', 'X');
      if ( this.canCover(cell) ) {
        cell.set('value', 'X');
        this.get('content').addScoreValue(200);
      }
    },

    spinClick: function() {
      var _this = this;
      if (this.get('spins') < this.get('maxSpins')) {
        this.incrementProperty('spins');
        this.get('board').spin();
        this.get('spinner').forEach( function(cell) {

          if(cell.get('isCoin')) {
            _this.get('content').addScoreValue(1000);
          }

          if(cell.get('isDevil')) {
            var score = _this.get('content.score');
            var penalty = score * -1 / 2;
            _this.get('content').addScoreValue(penalty);
          }
        });
      }
    }

  }
});
