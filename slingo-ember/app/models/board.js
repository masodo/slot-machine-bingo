import Ember from "ember";
import Cell from "./cell";

export default Ember.Object.extend({

  init: function() {
    this.newBoard(5, 5);
    this._super();
  },

  // randomize all cells with correct range
  newBoard: function(rows, cols) {
    this.set('height', rows);
    this.set('width', cols);
    this.set('columnIncrement', 15);
    this.set('cells', new Array(cols * rows));

    var columnIncrement = this.get('columnIncrement');
    var seenNumbers = [];

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var min = (j * columnIncrement) + 1;
        var max = (j + 1) * columnIncrement;

        var rand = this.randomInt(min, max);
        while(seenNumbers.indexOf(rand) !== -1) {
          rand = this.randomInt(min, max);
        }

        seenNumbers.push(rand);
        var cell =  Cell.create({value: rand, col: j});
        this.setCell(i, j, cell);
      }
    }

    this.spin();
  },

  getCellIndex: function(x, y) {
    var index = (y * this.get('width')) + x;
    return index;
  },

  getCell: function(x, y) {
    return this.get('cells')[this.getCellIndex(x, y)];
  },

  cellMatrix: function() {
    var rows = this.get('height');
    var cols = this.get('width');
    var cellArray = [];

    for (var i = 0; i < cols; i++) {
      var cellRowArray = [];
      for (var j = 0; j < rows; j++) {
        cellRowArray.push(this.getCell(i, j));
      }
      cellArray.push(cellRowArray);
    }

    return cellArray;
  }.property('cells'),

  setCell: function(x, y, cell) {
    this.get('cells')[this.getCellIndex(x, y)] = cell;
  },

  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  spin: function() {
    var columnIncrement = this.get('columnIncrement');
    var spinner = Ember.A();
    var tile;

    for (var i = 0; i < this.get('width'); i++) {
      if (this.specialRoll()) {
        tile = Cell.create({icon: this.specialCell(), jokerNotUsed: true});
        spinner.pushObject(tile);
      } 
      else {
        var min = (i * columnIncrement) + 1;
        var max = (i + 1) * columnIncrement;
        tile = Cell.create({value: this.randomInt(min, max)});
        spinner.pushObject(tile);
      }
    }
    this.set('spinner', spinner);
  },

  specialRoll: function() {
    return (this.randomInt(1, 10) === 10);
  },

  specialCell: function() {
    var rand = this.randomInt(1, 5);
    if (rand < 2) {
      return 'fa fa-reddit';
    }
    else if (rand < 4 ) {
      return 'fa fa-github';
    }
    else {
      return 'fa fa-usd';
    }
  },

  horizontalComplete: function() {
    var cols = this.get('width');
    var rows = this.get('height');
    var completeCount = 0;
    var count = 0;

    if(this.get('cells')) {
      for (var row = 0; row < rows; row++) {
        count = 0;
        for (var col = 0; col < cols; col++) {
          if (this.getCell(row, col).get('isCovered')) {
            count++;
          }
        }

        if (count === cols) {
          completeCount++;
        }
      }
    }

    return completeCount;
  }.property('cells.@each.isCovered'),

  verticalComplete: function() {
    var cols = this.get('width');
    var rows = this.get('height');
    var completeCount = 0;
    var count = 0;

    if(this.get('cells')) {
      for (var col = 0; col < cols; col++) {
        count = 0;
        for (var row = 0; row < rows; row++) {
          if (this.getCell(row, col).get('isCovered')) {
            count++;
          }
        }

        if (count === rows) {
          completeCount++;
        }
      }
    }

    return completeCount;
  }.property('cells.@each.isCovered'),

  diagnalComplete: function() {
    var cols = this.get('width');
    var rows = this.get('height');
    var completeCount = 0;
    var count = 0;

    if(this.get('cells')) {
      for (var col = 0; col < cols; col++) {
        if (this.getCell(col, col).get('isCovered')) {
          count++;
        }
      }

      if (count === rows) {
        completeCount++;
      }

      count = 0;

      for (col = 0; col < cols; col++) {
        var row = rows - 1 - col;
        if (this.getCell(col, row).get('isCovered')) {
          count++;
        }
      }

      if (count === rows) {
        completeCount++;
      }
    }

    return completeCount;
  }.property('cells.@each.isCovered'),

  boardComplete: function() {
    return this.get('cells').isEvery('isCovered', true);
  }.property('cells.@each.isCovered')
});
