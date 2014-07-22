import Ember from 'ember';
import Game from '../models/game';

export default Ember.Route.extend({
  model: function () {
    return Game.create();
  }
});
