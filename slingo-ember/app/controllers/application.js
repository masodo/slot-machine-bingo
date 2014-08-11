import Ember from 'ember';

export default Ember.ObjectController.extend({
  cells: Ember.computed.alias('content.board.cellMatrix'),
  spinner: Ember.computed.alias('content.board.spinner'),
  score: Ember.computed.alias('content.score'),
  horizontalComplete: Ember.computed.alias('content.board.horizontalComplete'),
  verticalComplete: Ember.computed.alias('content.board.verticalComplete'),

  canCover: function(cell) {
    var spinnerCell = this.get('spinner')[cell.get('col')];
    var canCover = spinnerCell.get('value') === cell.get('value') ||
      (spinnerCell.get('isJoker') && spinnerCell.get('jokerNotUsed'));
    if (canCover && spinnerCell.get('isJoker')) {
      spinnerCell.set('jokerNotUsed', false);
    }
    return canCover;
  },

  rowColCompleteObserver: function() {
    var num = this.get('horizontalComplete');
    this.get('content').addScoreValue(num);
  }.observes('horizontalComplete'),

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
      var spins = this.get('spins');
      if (spins < this.get('maxSpins')) {
        if (spins >= 16) {
          var spinCost = (spins - 15) * 500;
          if (confirm("This spin will cost " + spinCost + " points, ok?")) {
            this.get('content').addScoreValue(-spinCost);
          } else {
            return;
          }
        }

        this.incrementProperty('spins');
        this.get('board').spin();
        this.get('spinner').forEach( function(cell) {
          if(cell.get('isCoin')) {
            this.get('content').addScoreValue(1000);
          }
          if(cell.get('isDevil')) {
            var score = this.get('content.score');
            var penalty = score * -1 / 2;
            this.get('content').addScoreValue(penalty);
          }
        }.bind(this));
      }
    }
  }
});
