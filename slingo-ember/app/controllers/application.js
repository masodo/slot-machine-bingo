import Ember from 'ember';

export default Ember.ObjectController.extend({
  cells: Ember.computed.alias('content.board.cells'),
  spinner: Ember.computed.alias('content.board.spinner'),
  actions: {
    newGameClick: function() {
      this.get('content').newGame();
    },
    cellClick: function(cell) {
      if (this.get('spinner').indexOf(cell.get('value')) > -1) {
        cell.set('value', 'X');
        this.get('board').incrementProperty('covered');
      }
    },
    spinClick: function() {
      if (this.get('spins') < this.get('maxSpins')) {
        this.incrementProperty('spins');
        this.get('board').spin();
      }
    }
  }
});
