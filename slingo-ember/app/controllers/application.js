import Ember from 'ember';

export default Ember.ObjectController.extend({
  cells: Ember.computed.alias('content.board.cellMatrix'),
  spinner: Ember.computed.alias('content.board.spinner'),
  score: Ember.computed.alias('content.score'),
  horizontalComplete: Ember.computed.alias('content.board.horizontalComplete'),
  verticalComplete: Ember.computed.alias('content.board.verticalComplete'),
  actions: {
    newGameClick: function() {
      this.get('content').newGame();
    },
    cellClick: function(cell) {
      if (this.get('spinner')[cell.get('col')].get('value') === cell.get('value') || this.get('spinner')[cell.get('col')].get('isJoker')) {
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
