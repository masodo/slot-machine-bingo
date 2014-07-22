import Ember from "ember";
import Cell from "./cell"

export default Ember.Object.extend({

  init: function() {
    this.newBoard(5, 5);
    this._super();
  },

  // randomize all cells with correct range
  newBoard: function(rows, cols) {
    this.set('width', cols);
    this.set('height', rows);
    this.set('covered', 0);
    this.set('columnIncrement', 15);

    var columnIncrement = this.get('columnIncrement');
    var cells = new Array(cols);

    for (var i = 0; i < cols; i++) {
      cells[i] = new Array(rows);

      for (var j = 0; j < rows; j++) {
        var min = (j * columnIncrement) + 1;
        var max = (j + 1) * columnIncrement;
        console.log(min, max);

        cells[i][j] = Cell.create({value: this.randomInt(min, max)});
      }
    }

    this.set('cells', cells);
    this.spin();
  },

  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  spin: function() {
    var columnIncrement = this.get('columnIncrement');
    var spinner = new Array(this.get('width'));

    for (var i = 0; i < this.get('width'); i++) {
      var min = (i * columnIncrement) + 1;
      var max = (i + 1) * columnIncrement;
      spinner[i] = this.randomInt(min, max);
    }
    this.set('spinner', spinner);
  }

  // repeats: function repeats( ara, ten_re, one_re ) {
  //   for (var i = 0; i < 10; i += 2) {
  //     if (ara[i+1] === one_re && ara[i] === ten_re)
  //       return true;
  //   }
  //   return false;
  // },

  // range: function range(num, start, last) {
  //   if (num >= start && num <= last)
  //     return true;
  //   else
  //     return false;
  // },

  // rand_array: function rand_array(ara, start, last) {
  //   var count = 0;
  //   while (count < 10) {
  //     var num = Math.round(Math.random()*74)+1;
  //     if (range(num, start, last))   {
  //       var ones = num % 10;
  //       var tens = ( num-ones ) / 10;
  //       if (!repeats(ara, tens, ones)) {
  //         ara[count+1] = ones;
  //         ara[count] = tens;
  //         count += 2;
  //       }
  //     }
  //   }
  // },

  // slot_rand: function slot_rand(s_ara, sc_ara) {
  //   if ( spins < 21 ) { 
  //     inc_spins();
  //     count_it = 0;
  //     for (i = 0; i < 5; i++) {
  //       var num = Math.round(Math.random()*77)+1;
  //       while (!range(num, i*15+1, (i+1)*15) && num < 76) { num = Math.round(Math.random()*77)+1; }
  //       if (num > 75) {
  //         num = Math.round(Math.random()*41)+1;
  //         if (num < 21) {
  //           s_ara[i*2+1] = "rcoin";
  //           s_ara[i*2] = "lcoin";
  //           inc_score (score_array, 1, 1)
  //         } else if (num < 41) {
  //           s_ara[i*2+1] = "rjoker";
  //           s_ara[i*2] = "ljoker";
  //           count_it += 1;
  //         } else if (num < 43) {
  //           s_ara[i*2+1] = "rdevil";
  //           s_ara[i*2] = "ldevil";
  //         }
  //       }
  //       else {
  //         s_ara[i*2+1] = num % 10;
  //         s_ara[i*2] = ( num-s_ara[i*2+1] ) / 10;
  //       }
  //     }
  //     display(slot_array, 56);
  //   }
  // },

  // display: function display(ara, start) {
  //   for (i = 0; i < ara.length; i++) {
  //     document.images[start].src=( ara[i] + ".GIF");
  //     start++;
  //   }
  // },

  // cover: function cover(ara, ind, slot_ten, slot_one, image_num, sca) {
  //   if ( (ara[ind] == slot_ten && ara[ind+1] == slot_one) || (slot_ten == "ljoker" && count_it > 0 && ara[ind] != 100) )  {
  //     document.images[image_num].src="lx.GIF";
  //     document.images[image_num+1].src="rx.GIF";
  //     ara[ind] = 100;
  //     ara[10] += 1;
  //     count_it -= 1;
  //     inc_score (sca, 4, 2);
  //     if (ara[10] == 5) { inc_score(sca, 1, 1); }   //check for full vertical cover
  //     if (s_array[ind] == 100 && l_array[ind] == 100 && i_array[ind] == 100 && n_array[ind] == 100 && g_array[ind] == 100) { inc_score(sca, 1, 1); }
  //     display(score_array, 51);
  //   }
  // },

  // inc_score: function inc_score (sca, points, value) {
  //   sca[value] += points;
  //   for (i = 4; i > 0; i--) {
  //     if (sca[i] >= 10)  {
  //       sca[i] %= 10;
  //       sca[i-1] += 1;
  //     }
  //   }
  // },

  // dec_score: function inc_score (sca, points, value) {
  //   sca[value] += points;
  //   for (i = 4; i > 0; i--) {
  //     if (sca[i] >= 10)  {
  //       sca[i] %= 10;
  //       sca[i-1] += 1;
  //     }
  //   }
  // }
});
